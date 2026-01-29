import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import 'isomorphic-fetch';
import type { DownloadedFile } from './types';

export class FileDownloader {
  private outputDir: string;
  private downloadedFiles: Map<string, DownloadedFile> = new Map();

  constructor(outputDir: string) {
    this.outputDir = outputDir;
    this.ensureDirectoryExists(outputDir);
  }

  private ensureDirectoryExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private getFileExtension(url: string): string {
    const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
    return match ? match[1] : '';
  }

  private generateFilename(url: string, objectId: string, title: string): string {
    // const hash = createHash('md5').update(url).digest('hex').substring(0, 8);
    const ext = this.getFileExtension(url);
    return `${title}${ext ? `.${ext}` : ''}`;
  }

  private isImageFile(url: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
    const ext = this.getFileExtension(url).toLowerCase();
    return imageExtensions.includes(ext);
  }

  async downloadFile(url: string, objectId: string, title: string): Promise<DownloadedFile | null> {
    try {
      // Check if already downloaded
      const cacheKey = `${objectId}-${url}`;
      if (this.downloadedFiles.has(cacheKey)) {
        return this.downloadedFiles.get(cacheKey)!;
      }

      const filename = this.generateFilename(url, objectId, title);
      const localPath = path.join(this.outputDir, filename);

      // Skip if file already exists
      if (fs.existsSync(localPath)) {
        console.log(`⚡ Using cached file: ${filename}`);
        const downloadedFile: DownloadedFile = {
          objectId,
          originalUrl: url,
          localPath: `/static-data/${filename}`,
          filename,
          type: this.isImageFile(url) ? 'image' : 'document',
        };
        this.downloadedFiles.set(cacheKey, downloadedFile);
        return downloadedFile;
      }

      console.log(`📥 Downloading: ${url}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`❌ Failed to download ${url}: ${response.statusText}`);
        return null;
      }

      const buffer = await response.arrayBuffer();
      fs.writeFileSync(localPath, Buffer.from(buffer));

      console.log(`✅ Downloaded: ${filename}`);

      const downloadedFile: DownloadedFile = {
        objectId,
        originalUrl: url,
        localPath: `/static-data/${filename}`,
        filename,
        type: this.isImageFile(url) ? 'image' : 'document',
      };

      this.downloadedFiles.set(cacheKey, downloadedFile);
      return downloadedFile;
    } catch (error) {
      console.error(`❌ Error downloading ${url}:`, error);
      return null;
    }
  }

  async downloadMultipleFiles(files: Array<{ url: string; objectId: string; title: string }>): Promise<DownloadedFile[]> {
    const results = await Promise.all(
      files.map(({ url, objectId, title }) => this.downloadFile(url, objectId, title))
    );
    return results.filter((file): file is DownloadedFile => file !== null);
  }

  getDownloadedFiles(): DownloadedFile[] {
    return Array.from(this.downloadedFiles.values());
  }

  getAllDownloadedFiles(): Map<string, DownloadedFile> {
    return this.downloadedFiles;
  }
}
