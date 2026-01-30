// This file provides access to statically fetched data
// Data is generated at build time by vite-plugin-static-graphql

export interface File {
  __typename?: 'File';
  name: string;
  url: string;
}

export interface Category {
  objectId: string;
  createdAt: string;
  updatedAt?: string;
  label?: string | null;
  title?: string | null;
}

export interface CategoryReference {
  value: string;
}

export interface Image {
  objectId: string;
  createdAt: string;
  updatedAt?: string;
  categories?: CategoryReference[] | null;
  label?: string | null;
  title?: string | null;
  text?: string | null;
  date?: string | null;
  state?: string | null;
  connected_elements?: Array<{
    value: string;
    label: string;
  }> | null;
  file?: File | null;
}

export interface Person {
  objectId: string;
  createdAt: string;
  updatedAt?: string;
  label?: string | null;
  title?: string | null;
  text?: string | null;
  portrait?: File | null;
  image?: string | null;
}

export interface Entry {
  objectId: string;
  createdAt: string;
  updatedAt?: string;
  categories?: CategoryReference[] | null;
  label?: string | null;
  title?: string | null;
  text?: string | null;
  link?: string | null;
  file?: File | null;
  image?: File | null;
  description?: string | null;
  documents?: File[] | null;
}

export interface DownloadedFile {
  objectId: string;
  originalUrl: string;
  localPath: string;
  filename: string;
  type: 'image' | 'document';
}

export interface BuildTimeData {
  images: Image[];
  persons: Person[];
  entries: Entry[];
  categories: Category[];
  downloadedFiles: DownloadedFile[];
}

// Load the static data - this will be populated at build time
let staticDataCache: BuildTimeData | null = null;

async function loadStaticData(): Promise<BuildTimeData> {
  if (staticDataCache) {
    return staticDataCache;
  }

  // In development or if build hasn't run yet, return empty data
  const emptyData: BuildTimeData = {
    images: [],
    persons: [],
    entries: [],
    categories: [],
    downloadedFiles: [],
  };

  try {
    // Try to fetch from the dev server endpoint in development
    if (import.meta.env?.DEV) {
      try {
        const response = await fetch('/api/static-data');
        if (response.ok) {
          const data = await response.json();
          if (data && data !== null) {
            staticDataCache = data;
            console.log('[Static Data] Loaded from dev server:', data);
            return data;
          }
        }
        console.warn('[Static Data] Running in dev mode. Static data may not be available until build plugin runs.');
      } catch (fetchError) {
        console.warn('[Static Data] Failed to fetch from dev server:', fetchError);
      }
    } else {
      // In production, try to import the JSON file
      try {
        const data = await import('../../src/static-data/build-time-data.json');
        staticDataCache = (data.default || data) as BuildTimeData;
        console.log('[Static Data] Loaded from JSON file:', staticDataCache);
        return staticDataCache as BuildTimeData;
      } catch (importError) {
        console.warn('[Static Data] Failed to import JSON file:', importError);
      }
    }
  } catch (error) {
    console.error('[Static Data] Unexpected error loading static data:', error);
  }

  staticDataCache = emptyData;
  return emptyData;
}

// Export async function to load data
export async function loadStaticDataAsync(): Promise<BuildTimeData> {
  return loadStaticData();
}

// Helper functions to access different data types
export async function getImages() {
  const data = await loadStaticData();
  return data.images;
}

export async function getPersons() {
  const data = await loadStaticData();
  return data.persons;
}

export async function getEntries() {
  const data = await loadStaticData();
  return data.entries;
}

export async function getCategories() {
  const data = await loadStaticData();
  return data.categories;
}

export async function getDownloadedFiles() {
  const data = await loadStaticData();
  return data.downloadedFiles;
}

// Helper to find a specific image by objectId
export async function getImageById(objectId: string) {
  const data = await loadStaticData();
  return data.images.find(img => img.objectId === objectId);
}

// Helper to find a specific person by objectId
export async function getPersonById(objectId: string) {
  const data = await loadStaticData();
  return data.persons.find(person => person.objectId === objectId);
}

// Helper to find a specific entry by objectId
export async function getEntryById(objectId: string) {
  const data = await loadStaticData();
  return data.entries.find(entry => entry.objectId === objectId);
}

// Helper to get the local file path for a remote URL
export async function getLocalFilePath(remoteUrl: string) {
  const data = await loadStaticData();
  const file = data.downloadedFiles.find(f => f.originalUrl === remoteUrl);
  return file?.localPath;
}

// Helper to get images by category
export async function getImagesByCategory(categoryId: string) {
  const data = await loadStaticData();
  return data.images.filter(img => 
    img.categories?.some(cat => cat.value === categoryId)
  );
}

// Helper to get a specific category by objectId
export async function getCategoryById(objectId: string) {
  const data = await loadStaticData();
  return data.categories.find(cat => cat.objectId === objectId);
}

// Helper to get entries by category
export async function getEntriesByCategory(categoryId: string) {
  const data = await loadStaticData();
  return data.entries.filter(entry => 
    entry.categories?.some(cat => cat.value === categoryId)
  );
}
