import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client/core/index.js';
import 'isomorphic-fetch';

export interface ClientConfig {
  uri: string;
  appId: string;
  restKey: string;
  masterKey: string;
}

export function createClient(config: ClientConfig) {
  return new ApolloClient({
    link: new HttpLink({
      uri: config.uri,
      headers: {
        'X-Parse-Application-Id': config.appId,
        'X-Parse-Rest-Api-Key': config.restKey,
        'X-Parse-Master-Key': config.masterKey,
      },
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}

const stringreplace = (str: string) => {
  return str.replace(
    new RegExp('author', 'g'),
    'author {objectId label portrait}'
  );
};

const getQueryStringFromFields = (fields: string[], schemaShape?: Record<string, any>) => {
  return fields
    .map((field) => {
      // Check if schemaShape provides type information
      let isFileType = false;
      let isElementType = false;
      
      if (schemaShape && schemaShape[field]) {
        const fieldDef = schemaShape[field];
        // Check if it's a Zod object with __typename or specific shape
        if (fieldDef._def) {
          const typeName = fieldDef._def.typeName;
          if (typeName === 'ZodObject') {
            // Check if it has 'name' and 'url' properties (FileInfo)
            const shape = fieldDef._def.shape?.();
            if (shape && shape.name && shape.url) {
              isFileType = true;
            }
            // Check if it has only 'value' property (Element)
            else if (shape && shape.value && Object.keys(shape).length <= 2) {
              isElementType = true;
            }
          } else if (typeName === 'ZodArray') {
            const innerType = fieldDef._def.type;
            if (innerType._def?.shape) {
              const innerShape = innerType._def.shape();
              if (innerShape.value && Object.keys(innerShape).length <= 2) {
                isElementType = true;
              }
            }
          }
        }
      }
      
      // Fallback to field name detection if no schema info
      if (!isFileType && !isElementType) {
        // Handle Element type fields
        if (
          field === 'categories' ||
          field === 'field' ||
          field === 'fields' ||
          field === 'data_fields' ||
          field === 'setting_fields' ||
          field === 'roles' ||
          field === 'gallery' ||
          field === 'persons' ||
          field === 'times' ||
          field === 'dates' ||
          field === 'documents' ||
          field === 'connected_elements' ||
          field === 'form_fields' ||
          field === 'content'
        ) {
          isElementType = true;
        }
        
        // Handle FileInfo type fields (but not 'image' on Entry which is a string)
        if (field === 'file' || field === 'portrait') {
          isFileType = true;
        }
      }
      
      if (isElementType) {
        return `
          ${field} {
            ... on Element {
              value
            }
          }
        `;
      }
      
      if (isFileType) {
        return `
          ${field} {
            name
            url
          }
        `;
      }
      
      return field;
    })
    .join('\n');
};

export interface GenerateQueryOptions {
  type?: string;
  objectName: string;
  queryName?: string;
  fields: string[];
  schemaShape?: Record<string, any>;
}

export function generateQuery(options: GenerateQueryOptions) {
  const { type = 'find', objectName, queryName, fields = [], schemaShape } = options;
  const fieldsString = getQueryStringFromFields(fields, schemaShape);
  const processedFields = stringreplace(fieldsString);
  const finalQueryName = queryName || `${objectName.toLowerCase()}s`;

  return gql`
    query ${type}${objectName}($params: ${objectName}WhereInput, $first: Int, $skip: Int, $order: [${objectName}Order!]) {
      ${finalQueryName}(where: $params, first: $first, skip: $skip, order: $order) {
        count
        edges {
          node {
            id
            ${processedFields}
          }
        }
      }
    }
  `;
}

export function zodToGraphQLFields(schemaShape: Record<string, any>, indent = 4): string {
  const pad = ' '.repeat(indent);
  
  return Object.entries(schemaShape)
    .map(([key]) => {
      // Handle nested objects
      if (key === 'file' || key === 'portrait' || key === 'image') {
        return `${pad}${key} {
${pad}  name
${pad}  url
${pad}}`;
      }
      
      if (key === 'categories' || key === 'connected_elements') {
        return `${pad}${key}`;
      }
      
      if (key === 'documents') {
        return `${pad}${key} {
${pad}  name
${pad}  url
${pad}}`;
      }
      
      return `${pad}${key}`;
    })
    .join('\n');
}
