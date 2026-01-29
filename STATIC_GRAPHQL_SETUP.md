# Static GraphQL Data Fetching - Implementation Complete ✨

## What Was Implemented

I've created a complete **Vite plugin** that fetches data from your GraphQL endpoint at build time, similar to how Gatsby's `source-nodes` works. The implementation is based on your existing `gatsby-plugin-patstore` approach.

## File Structure

```
bei-lisa/
├── build-plugins/
│   ├── index.ts                         # Main exports
│   ├── types.ts                         # Zod schemas and TypeScript types
│   ├── graphql-client.ts                # Apollo Client setup
│   ├── file-downloader.ts               # Downloads images/files
│   ├── data-fetcher.ts                  # Orchestrates data fetching
│   ├── vite-plugin-static-graphql.ts    # Main Vite plugin
│   └── README.md                        # Detailed documentation
│
├── app/lib/
│   └── static-data.ts                   # Helper functions to access data
│
├── vite.config.ts                       # Plugin configuration
├── .gitignore                           # Excludes generated files
├── STATIC_GRAPHQL_SETUP.md             # This file
└── STATIC_DATA_MIGRATION_EXAMPLE.md    # Migration guide

Generated at build time (gitignored):
├── src/static-data/
│   ├── build-time-data.json            # All fetched data
│   ├── types.ts                        # Generated types
│   └── [files]                         # Downloaded images/documents
```

## How It Works

### 1. Build Process

When you run `npm run build` or `npm run dev`:

1. The Vite plugin starts before the build
2. Connects to your GraphQL endpoint using credentials from `.env.development`
3. Fetches all `Image`, `Person`, and `Entry` objects
4. Downloads all referenced files (images, documents, PDFs)
5. Validates data with Zod schemas
6. Saves everything to `src/static-data/`:
   - `build-time-data.json` - All the data
   - `types.ts` - TypeScript definitions
   - `[objectId]-[hash].ext` - Downloaded files
7. Continues with normal Vite build

### 2. Data Access

In your components, import the helper functions:

```typescript
import { getImages, getPersons, getEntries } from '@/lib/static-data';

const images = getImages();
const persons = getPersons();
const entries = getEntries();
```

### 3. File URLs

Downloaded files are automatically cached in `src/static-data/` and their URLs are mapped:

```typescript
import { getLocalFilePath } from '@/lib/static-data';

const localPath = getLocalFilePath('https://remote-url.com/image.jpg');
// Returns: "/static-data/objectId-hash123.jpg"
```

## Configuration

The plugin is configured in `vite.config.ts`:

```typescript
staticGraphQLPlugin({
  endpoint: env.GATSBY_PATSTORE_GRAPHQL_API_URL,
  appId: env.GATSBY_PATSTORE_APP_ID,
  restKey: env.GATSBY_PATSTORE_REST_KEY,
  masterKey: env.GATSBY_PATSTORE_MASTER_KEY,
  outputDir: 'src/static-data',
  dataFileName: 'build-time-data.json',
  filesDir: 'src/static-data',
}),
```

## Environment Variables

Make sure these are set in `.env.development`:

```
GATSBY_PATSTORE_GRAPHQL_API_URL=https://...
GATSBY_PATSTORE_APP_ID=...
GATSBY_PATSTORE_REST_KEY=...
GATSBY_PATSTORE_MASTER_KEY=...
```

## Features

✅ **Static Data Fetching** - All data fetched at build time  
✅ **File Downloads** - Automatic image/document downloads  
✅ **Type Safety** - Full TypeScript support with Zod validation  
✅ **Caching** - Files are cached to avoid redundant downloads  
✅ **Zero Runtime Overhead** - No Apollo Client in production bundle  
✅ **Development Support** - Works in both dev and production builds  
✅ **Error Handling** - Graceful fallbacks if data isn't available  

## Usage Examples

### Basic Usage

```typescript
import { getImages, getEntries } from '@/lib/static-data';

export function MyComponent() {
  const images = getImages();
  
  return (
    <div>
      {images.map(img => (
        <img key={img.objectId} src={img.file?.url} alt={img.title} />
      ))}
    </div>
  );
}
```

### Filter by Category

```typescript
import { getImagesByCategory } from '@/lib/static-data';

const frisurenImages = getImagesByCategory('frisuren-category-id');
```

### Find by ID

```typescript
import { getImageById } from '@/lib/static-data';

const image = getImageById('abc123');
```

## Running the Build

```bash
# Development (fetches data once on start)
npm run dev

# Production build (fetches data during build)
npm run build

# Force refresh data (delete cache and rebuild)
rm -rf src/static-data/
npm run build
```

## Next Steps

### 1. Test the Build

Run the build to fetch data:

```bash
npm run dev
```

You should see output like:

```
╔═══════════════════════════════════════════════╗
║   Static GraphQL Data Fetcher Starting...   ║
╚═══════════════════════════════════════════════╝

🚀 Starting data fetch...

🔍 Fetching Image...
✅ Fetched 15 Image(s)
🔍 Fetching Person...
✅ Fetched 5 Person(s)
🔍 Fetching Entry...
✅ Fetched 20 Entry(s)

📸 Processing 15 images...
📥 Downloading: https://...
✅ Downloaded: objectId-hash.jpg
...

✨ Data fetch complete!
   - Images: 15
   - Persons: 5
   - Entries: 20
   - Downloaded files: 25

💾 Data saved to: C:\...\src\static-data\build-time-data.json
📁 Files saved to: C:\...\src\static-data
📝 Types generated: C:\...\src\static-data\types.ts

╔═══════════════════════════════════════════════╗
║   Static GraphQL Data Fetch Complete! ✨     ║
╚═══════════════════════════════════════════════╝
```

### 2. Migrate Components

See `STATIC_DATA_MIGRATION_EXAMPLE.md` for detailed migration examples.

The main change is replacing:

```typescript
// OLD: Runtime GraphQL query
const { data } = useQuery<PreislistenData>(PREISLISTEN);
```

With:

```typescript
// NEW: Static data
import { getImages, getEntries } from '@/lib/static-data';

const images = getImages();
const entries = getEntries();
```

### 3. Remove Apollo Client (Optional)

Once all components are migrated, you can remove Apollo Client:

```bash
npm uninstall @apollo/client
```

## Troubleshooting

### Data not showing up

Delete the cache and rebuild:

```bash
rm -rf src/static-data/
npm run build
```

### GraphQL connection errors

Check your `.env.development` file has correct credentials:

```
GATSBY_PATSTORE_GRAPHQL_API_URL=https://...
GATSBY_PATSTORE_APP_ID=...
GATSBY_PATSTORE_REST_KEY=...
GATSBY_PATSTORE_MASTER_KEY=...
```

### TypeScript errors about missing types

The types are generated during build. Run:

```bash
npm run build
```

### Files not downloading

Check network permissions and that file URLs are accessible. The plugin will log errors for failed downloads.

## Benefits vs Runtime Queries

| Feature | Runtime (Apollo Client) | Static (This Plugin) |
|---------|------------------------|----------------------|
| Initial Load Time | Slower (network request) | Instant (bundled) |
| Bundle Size | Larger (+Apollo Client) | Smaller (no runtime) |
| SEO | Poor (client-side) | Excellent (static) |
| Offline Support | No | Yes |
| Data Freshness | Always current | Build-time snapshot |
| Type Safety | Manual | Automatic |

## Technical Details

### Zod Schemas

Data is validated using Zod schemas defined in `build-plugins/types.ts`. This ensures type safety and catches data issues at build time.

### File Downloads

Files are downloaded with:
- MD5 hash-based caching
- Automatic extension detection
- Retry logic for failed downloads
- Progress logging

### GraphQL Queries

Queries are dynamically generated from Zod schemas using the `zodToGraphQLFields` function, similar to your Gatsby plugin.

## Architecture

The plugin follows the same pattern as `gatsby-plugin-patstore`:

1. **Schema Definition** (`types.ts`) - Defines data structures with Zod
2. **GraphQL Client** (`graphql-client.ts`) - Creates Apollo client
3. **Data Fetcher** (`data-fetcher.ts`) - Orchestrates fetching
4. **File Downloader** (`file-downloader.ts`) - Downloads files
5. **Vite Plugin** (`vite-plugin-static-graphql.ts`) - Integrates with build

## Support

For questions or issues:
1. Check `build-plugins/README.md` for detailed documentation
2. Review `STATIC_DATA_MIGRATION_EXAMPLE.md` for usage examples
3. Check the console output during build for error messages

---

**Status**: ✅ Implementation complete and ready to use!

**Last Updated**: January 29, 2026
