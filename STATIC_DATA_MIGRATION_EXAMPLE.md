# Migration Example: Using Static Data Instead of Apollo Client

## Current Implementation (Preislisten.tsx)

The current implementation uses Apollo Client's `useQuery` to fetch data at runtime:

```typescript
const { data } = useQuery<PreislistenData>(PREISLISTEN);
```

## New Implementation with Static Data

### Option 1: Direct Import (Simplest)

```typescript
import { staticData } from '@/lib/static-data';

export const Preisliste: React.FC = () => {
    // Replace this:
    // const { data } = useQuery<PreislistenData>(PREISLISTEN);
    
    // With this:
    const data = {
        kategorien: [], // You'll need to derive categories from images/entries
        frisuren: staticData.images.filter(img => /* filter logic */),
        preiseFuT: staticData.entries.filter(entry => /* filter logic */),
        preisePuMU: staticData.entries.filter(entry => /* filter logic */),
    };
    
    const [open, setOpen] = useState(false);
    const [sliderState, setSliderState] = useState("Frisuren");
    
    // Rest of component stays the same...
}
```

### Option 2: Using Helper Functions

```typescript
import { getImages, getEntries } from '@/lib/static-data';

export const Preisliste: React.FC = () => {
    const allImages = getImages();
    const allEntries = getEntries();
    
    // Transform data to match expected structure
    const data = {
        kategorien: extractCategories(allImages, allEntries),
        frisuren: filterFrisuren(allImages),
        preiseFuT: filterPreiseFuT(allEntries),
        preisePuMU: filterPreisePuMU(allEntries),
    };
    
    // Rest remains the same...
}

// Helper functions
function extractCategories(images, entries) {
    const categoryMap = new Map();
    [...images, ...entries].forEach(item => {
        item.categories?.forEach(cat => {
            if (!categoryMap.has(cat.objectId)) {
                categoryMap.set(cat.objectId, {
                    id: cat.objectId,
                    ueberschrift: cat.title,
                    kategorie: cat.label,
                });
            }
        });
    });
    return Array.from(categoryMap.values());
}
```

### Option 3: Create Preislisten-Specific Data Hook

Create a new file `app/lib/use-preislisten-data.ts`:

```typescript
import { useMemo } from 'react';
import { getImages, getEntries } from './static-data';

export interface Kategorie {
    id: string;
    ueberschrift: string;
    kategorie: string;
}

export interface Preis {
    id: string;
    titel: string;
    reihenfolge: number;
    preis?: string;
    kategorie?: Kategorie;
    absatz?: boolean;
    information?: string;
}

export interface PreislistenData {
    kategorien: Kategorie[];
    frisuren: Preis[];
    preiseFuT: Preis[];
    preisePuMU: Preis[];
}

export function usePreislistenData(): PreislistenData {
    return useMemo(() => {
        const images = getImages();
        const entries = getEntries();
        
        // Transform static data to match the expected structure
        const kategorien = extractKategorien(images, entries);
        
        const frisuren = images
            .filter(img => img.categories?.some(cat => cat.label === 'Frisuren'))
            .map(transformToPreis);
        
        const preiseFuT = entries
            .filter(entry => entry.categories?.some(cat => cat.label === 'FuT'))
            .map(transformToPreis);
        
        const preisePuMU = entries
            .filter(entry => entry.categories?.some(cat => cat.label === 'PuMU'))
            .map(transformToPreis);
        
        return {
            kategorien,
            frisuren,
            preiseFuT,
            preisePuMU,
        };
    }, []);
}

function extractKategorien(images, entries): Kategorie[] {
    const categoryMap = new Map<string, Kategorie>();
    
    const allItems = [...images, ...entries];
    
    allItems.forEach(item => {
        item.categories?.forEach(cat => {
            if (!categoryMap.has(cat.objectId)) {
                categoryMap.set(cat.objectId, {
                    id: cat.objectId,
                    ueberschrift: cat.title || '',
                    kategorie: cat.label || '',
                });
            }
        });
    });
    
    return Array.from(categoryMap.values());
}

function transformToPreis(item: any): Preis {
    return {
        id: item.objectId,
        titel: item.title || '',
        reihenfolge: 0, // You may need to add this field to your schema
        preis: item.preis || '',
        kategorie: item.categories?.[0] ? {
            id: item.categories[0].objectId,
            ueberschrift: item.categories[0].title || '',
            kategorie: item.categories[0].label || '',
        } : undefined,
        absatz: false, // You may need to add this field
        information: item.text || '',
    };
}
```

Then in your component:

```typescript
import { usePreislistenData } from '@/lib/use-preislisten-data';

export const Preisliste: React.FC = () => {
    const data = usePreislistenData();
    
    // Everything else stays the same!
    const [open, setOpen] = useState(false);
    const [sliderState, setSliderState] = useState("Frisuren");
    
    const { kategorienArray, kategorieObjects, preisArray } = useMemo(() => {
        // ... existing logic
    }, [data]);
    
    // ... rest of component
}
```

## Benefits of Static Data Approach

1. **No Loading States**: Data is immediately available
2. **No Network Requests**: Faster page loads
3. **Type Safety**: Full TypeScript support
4. **SEO Friendly**: Data is available at build time
5. **Offline Support**: App works without network
6. **Smaller Bundle**: No Apollo Client runtime

## Running the Build

```bash
# Development
npm run dev

# Production build
npm run build

# Force refresh static data (delete cached data)
rm -rf src/static-data/
npm run build
```

## Next Steps

1. Choose which migration option works best for your use case
2. Test with `npm run dev` to fetch data
3. Update your components to use the static data
4. Remove Apollo Client dependencies if no longer needed
