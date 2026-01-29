# Static GraphQL Data Fetcher for Vite

This plugin fetches data from a GraphQL endpoint at build time and makes it available as static JSON in your application.

## Features

- ✅ **Static Data Fetching**: Fetches all GraphQL data during build time
- ✅ **File Downloads**: Automatically downloads and processes images and documents
- ✅ **Type Safety**: Generates TypeScript types from Zod schemas
- ✅ **Zero Runtime Dependencies**: All data is statically bundled
- ✅ **Validation**: Uses Zod to validate data structure
- ✅ **Caching**: Downloaded files are cached to avoid redundant downloads

## How It Works

1. **Build Start**: When Vite starts building, the plugin:
   - Connects to your GraphQL endpoint
   - Fetches all Images, Persons, and Entries
   - Downloads all referenced files (images, documents)
   - Validates data with Zod schemas
   - Saves everything to `src/static-data/`

2. **Generated Files**:
   - `src/static-data/build-time-data.json` - All fetched data
   - `src/static-data/types.ts` - TypeScript type definitions
   - `src/static-data/*.jpg|png|pdf|...` - Downloaded files

3. **Usage in App**: Import and use the static data:
   ```typescript
   import { getImages, getPersons } from '@/lib/static-data';
   
   const images = getImages();
   ```

## Configuration

The plugin is configured in `vite.config.ts`:

```typescript
import { staticGraphQLPlugin } from './build-plugins'

export default defineConfig({
  plugins: [
    staticGraphQLPlugin({
      endpoint: env.GATSBY_PATSTORE_GRAPHQL_API_URL,
      appId: env.GATSBY_PATSTORE_APP_ID,
      restKey: env.GATSBY_PATSTORE_REST_KEY,
      masterKey: env.GATSBY_PATSTORE_MASTER_KEY,
      outputDir: 'src/static-data',
      dataFileName: 'build-time-data.json',
      filesDir: 'src/static-data',
    }),
    // ... other plugins
  ],
})
```

## File Structure

```
build-plugins/
├── index.ts                         # Main exports
├── types.ts                         # Zod schemas and TypeScript types
├── graphql-client.ts                # Apollo Client setup and query generation
├── file-downloader.ts               # File download and caching logic
├── data-fetcher.ts                  # Main data fetching orchestration
├── vite-plugin-static-graphql.ts    # Vite plugin implementation
└── README.md                        # This file

app/lib/
└── static-data.ts                   # Helper functions to access static data

src/static-data/                     # Generated at build time (gitignored)
├── build-time-data.json            # All fetched data
├── types.ts                        # Generated TypeScript types
└── [objectId]-[hash].[ext]        # Downloaded files
```

## Adding New Data Types

To add a new data type:

1. **Define Zod Schema** in `build-plugins/types.ts`:
   ```typescript
   export const NewTypeSchema = BaseObjectSchema.extend({
     title: z.string(),
     // ... other fields
   });
   
   export type NewType = z.infer<typeof NewTypeSchema>;
   ```

2. **Update schema_map**:
   ```typescript
   export const schema_map = {
     Image: ImageSchema,
     Person: PersonSchema,
     Entry: EntrySchema,
     NewType: NewTypeSchema, // Add here
   } as const;
   ```

3. **Update DataFetcher** in `build-plugins/data-fetcher.ts`:
   - Add fetch method
   - Add to `fetchAllData()`

4. **Update BuildTimeData interface**:
   ```typescript
   export interface BuildTimeData {
     images: ImageClass[];
     persons: PersonClass[];
     entries: EntryClass[];
     newTypes: NewType[]; // Add here
     downloadedFiles: DownloadedFile[];
   }
   ```

5. **Generate types** in `vite-plugin-static-graphql.ts`:
   - Add interface to `generateTypes()` method

6. **Add helper functions** in `app/lib/static-data.ts`:
   ```typescript
   export function getNewTypes() {
     return staticData.newTypes;
   }
   ```

## Development vs Production

- **Development**: Data is fetched once when dev server starts
- **Production Build**: Data is fetched during `npm run build`
- **File Caching**: Downloaded files are cached; delete `src/static-data/` to re-fetch

## Troubleshooting

### Data not updating
Delete the `src/static-data/` directory and rebuild:
```bash
rm -rf src/static-data/
npm run build
```

### GraphQL errors
Check your environment variables in `.env.development`:
- `GATSBY_PATSTORE_GRAPHQL_API_URL`
- `GATSBY_PATSTORE_APP_ID`
- `GATSBY_PATSTORE_REST_KEY`
- `GATSBY_PATSTORE_MASTER_KEY`

### Type errors
Re-run the build to regenerate types:
```bash
npm run build
```

## Migration from Apollo Client useQuery

**Before** (runtime query):
```typescript
const { data } = useQuery<PreislistenData>(PREISLISTEN);
```

**After** (static data):
```typescript
import { getImages, getEntries } from '@/lib/static-data';

const images = getImages();
const entries = getEntries();
```

## Performance Benefits

- ⚡ **No Runtime Queries**: All data is bundled at build time
- ⚡ **No Loading States**: Data is immediately available
- ⚡ **Smaller Bundle**: No Apollo Client runtime overhead
- ⚡ **Optimized Images**: Downloaded files are processed and optimized
- ⚡ **Better SEO**: Static data is available for SSG/SSR
