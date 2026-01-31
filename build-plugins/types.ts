import { z } from 'zod';

// Base schema for all Patstore objects
export const BaseObjectSchema = z.object({
  objectId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

// File schema
export const FileSchema = z.object({
  __typename: z.string().optional(),  // Can be 'File' or 'FileInfo'
  name: z.string(),
  url: z.string(),
});

// Category schema
export const CategorySchema = z.object({
  objectId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  label: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
});

// Image schema
export const ImageSchema = BaseObjectSchema.extend({
  categories: z.array(z.object({ value: z.string() })).optional().nullable(),
  label: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  connected_elements: z.array(z.object({ value: z.any() })).optional().nullable(),  // value can be string or object
  file: FileSchema.optional().nullable(),
});

// Person schema
export const PersonSchema = BaseObjectSchema.extend({
  label: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

// Entry schema
export const EntrySchema = BaseObjectSchema.extend({
  categories: z.array(z.object({ value: z.string() })).optional().nullable(),
  label: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
  file: FileSchema.optional().nullable(),
  image: z.string().optional().nullable(),  // image is a string, not a File
  description: z.string().optional().nullable(),
  documents: z.array(z.object({ value: z.string() })).optional().nullable(),
});

// Export types
export type ImageClass = z.infer<typeof ImageSchema>;
export type PersonClass = z.infer<typeof PersonSchema>;
export type EntryClass = z.infer<typeof EntrySchema>;
export type FileClass = z.infer<typeof FileSchema>;
export type CategoryClass = z.infer<typeof CategorySchema>;

// Schema mapping
export const schema_map = {
  Image: ImageSchema,
  Person: PersonSchema,
  Entry: EntrySchema,
  Category: CategorySchema,
} as const;

export type SchemaName = keyof typeof schema_map;

// GraphQL query generation types
export interface GenerateQueryParams {
  objectName: string;
  fields: string;
}

export interface GraphQLVariables {
  params?: Record<string, any>;
  limit?: number;
  skip?: number;
  order?: string[];
}

export interface GraphQLResponse<T = any> {
  data: {
    objects: {
      [key: string]: {
        results: T[];
      };
    };
  };
}

// Build-time data structure
export interface BuildTimeData {
  images: ImageClass[];
  persons: PersonClass[];
  entries: EntryClass[];
  categories: CategoryClass[];
  downloadedFiles: DownloadedFile[];
}

export interface DownloadedFile {
  objectId: string;
  originalUrl: string;
  localPath: string;
  filename: string;
  type: 'image' | 'document';
}
