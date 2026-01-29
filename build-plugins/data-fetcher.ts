import type { ApolloClient } from '@apollo/client/core/index.js';
import lodash from 'lodash';
import type {
  BuildTimeData,
  ImageClass,
  PersonClass,
  EntryClass,
  GraphQLVariables,
  GraphQLResponse,
} from './types';
import {
  ImageSchema,
  PersonSchema,
  EntrySchema,
} from './types';
import { generateQuery, zodToGraphQLFields } from './graphql-client';
import { FileDownloader } from './file-downloader';

export class DataFetcher {
  private client: ApolloClient<any>;
  private fileDownloader: FileDownloader;
  private projectId?: string;

  constructor(client: ApolloClient<any>, fileDownloader: FileDownloader, projectId?: string) {
    this.client = client;
    this.fileDownloader = fileDownloader;
    this.projectId = projectId;
  }

  // Map object names to their correct GraphQL query names
  private getQueryName(objectName: string): string {
    const queryNameMap: Record<string, string> = {
      'Image': 'images',
      'Person': 'people', 
      'Entry': 'entries',
    };
    
    return queryNameMap[objectName] || `${objectName.toLowerCase()}s`;
  }

  private async fetchObjects<T>(
    objectName: string,
    schemaShape: Record<string, any>,
    variables?: GraphQLVariables
  ): Promise<T[]> {
    try {
      const fieldNames = Object.keys(schemaShape);
      const queryName = this.getQueryName(objectName);
      
      const query = generateQuery({
        objectName,
        queryName,
        fields: fieldNames,
        schemaShape,  // Pass the schema so we can determine field types
      });

      console.log(`🔍 Fetching ${objectName}...`);
      
      // Implement pagination to fetch all items
      let allResults: T[] = [];
      let hasMore = true;
      let skip = 0;
      const pageSize = 100;  // Fetch 100 items at a time
      
      // Build where clause with project filter
      let whereClause: any = variables?.params || {};
      
      // TODO: Uncomment and adjust the filter syntax based on your GraphQL schema
      // For now, let's fetch without project filter to test pagination
      if (this.projectId) {
        whereClause.project = {
          have: {
            objectId: {
              equalTo: this.projectId
            }
          }
        };
        console.log(`   🔍 Filtering by project: ${this.projectId}`);
      }
      
      // Set whereClause to undefined if empty to avoid sending empty object
      if (Object.keys(whereClause).length === 0) {
        whereClause = undefined;
      }
      
      while (hasMore) {
        const response = await this.client.query({
          query,
          variables: {
            ...variables,
            params: whereClause,
            first: pageSize,
            skip,
          },
        });

        // Handle new GraphQL response structure with edges/node
        const data = lodash.get(response, `data.${queryName}`, {});
        const edges = data.edges || [];
        const count = data.count || 0;
        const results = edges.map((edge: any) => edge.node);
        
        allResults = allResults.concat(results);
        skip += pageSize;
        
        // Check if we've fetched all items
        hasMore = results.length === pageSize && allResults.length < count;
        
        if (hasMore) {
          console.log(`   📦 Fetched ${allResults.length}/${count} ${objectName}(s)...`);
        }
      }
      
      console.log(`✅ Fetched ${allResults.length} ${objectName}(s) total`);
      
      return allResults;
    } catch (error: any) {
      console.error(`❌ Error fetching ${objectName}:`);
      
      // Log detailed GraphQL errors
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        console.error('GraphQL Errors:');
        error.graphQLErrors.forEach((gqlError: any, index: number) => {
          console.error(`  Error ${index + 1}:`, JSON.stringify(gqlError, null, 2));
        });
      }
      
      // Log network error details
      if (error.networkError) {
        console.error('Network Error:', error.networkError.message);
        if (error.networkError.result && error.networkError.result.errors) {
          console.error('Detailed errors:', JSON.stringify(error.networkError.result.errors, null, 2));
        }
      }
      
      // Log the full error object for debugging
      console.error('Full error:', error);
      
      return [];
    }
  }

  private async downloadFilesFromObject(
    obj: any,
    objectId: string,
    fileKeys: string[]
  ): Promise<void> {
    const filesToDownload: Array<{ url: string; objectId: string; title: string }> = [];

    for (const key of fileKeys) {
      const fileData = obj[key];
      
      if (fileData && typeof fileData === 'object') {
        if ('url' in fileData && fileData.url) {
          filesToDownload.push({
            url: fileData.url,
            objectId: `${objectId}`,
            title: obj.title
          });
        }
      } else if (Array.isArray(fileData)) {
        fileData.forEach((file, index) => {
          if (file && file.url) {
            filesToDownload.push({
              url: file.url,
              objectId: `${objectId}`,
              title: obj.title
            });
          }
        });
      }
    }

    if (filesToDownload.length > 0) {
      await this.fileDownloader.downloadMultipleFiles(filesToDownload);
    }
  }

  private async processImagesWithFiles(images: ImageClass[]): Promise<ImageClass[]> {
    console.log(`📸 Processing ${images.length} images...`);
    
    for (const image of images) {
      if (image.objectId) {
        await this.downloadFilesFromObject(image, image.objectId, ['file']);
      }
    }

    return images;
  }

  private async processPersonsWithFiles(persons: PersonClass[]): Promise<PersonClass[]> {
    console.log(`👤 Processing ${persons.length} persons...`);
    
    for (const person of persons) {
      if (person.objectId) {
        await this.downloadFilesFromObject(person, person.objectId, ['portrait']);
      }
    }

    return persons;
  }

  private async processEntriesWithFiles(entries: EntryClass[]): Promise<EntryClass[]> {
    console.log(`📄 Processing ${entries.length} entries...`);
    
    for (const entry of entries) {
      if (entry.objectId) {
        await this.downloadFilesFromObject(entry, entry.objectId, [
          'file',
          'image',
          'documents',
        ]);
      }
    }

    return entries;
  }

  async fetchAllData(): Promise<BuildTimeData> {
    console.log('\n🚀 Starting data fetch...\n');

    // Fetch all data
    // Note: Person query is commented out because the GraphQL schema doesn't have a list query for Person
    // The 'person' field requires an ID parameter and returns a single object
    const [rawImages, rawPersons, rawEntries] = await Promise.all([
      this.fetchObjects<ImageClass>('Image', ImageSchema.shape),
      this.fetchObjects<PersonClass>('Person', PersonSchema.shape),
      this.fetchObjects<EntryClass>('Entry', EntrySchema.shape),
    ]);

    // Validate and process data
    const images = await this.processImagesWithFiles(
      rawImages.map((img) => ImageSchema.parse(img))
    );

    const persons = await this.processPersonsWithFiles(
      rawPersons.map((person) => PersonSchema.parse(person))
    );

    const entries = await this.processEntriesWithFiles(
      rawEntries.map((entry) => EntrySchema.parse(entry))
    );

    const downloadedFiles = this.fileDownloader.getDownloadedFiles();

    console.log(`\n✨ Data fetch complete!`);
    console.log(`   - Images: ${images.length}`);
    console.log(`   - Persons: ${persons.length}`);
    console.log(`   - Entries: ${entries.length}`);
    console.log(`   - Downloaded files: ${downloadedFiles.length}\n`);

    return {
      images,
      persons,
      entries,
      downloadedFiles,
    };
  }
}
