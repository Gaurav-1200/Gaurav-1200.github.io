import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface ContentMetadata {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  github?: string;
  demo?: string;
  // Education fields
  Degree?: string;
  College?: string;
  CGPA?: string;
  Highlights?: string[];
  Timeline?: string;
  Website?: string;
  [key: string]: any;
}

export interface ContentItem {
  slug: string;
  metadata: ContentMetadata;
  content: string;
}

export function getAllContent(type: string): ContentItem[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '');
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      return {
        slug,
        metadata: data as ContentMetadata,
        content,
      };
    })
    .sort((a, b) => {
      const dateA = a.metadata.date || (a.metadata.Timeline ? a.metadata.Timeline.split('-')[0].trim() : '0');
      const dateB = b.metadata.date || (b.metadata.Timeline ? b.metadata.Timeline.split('-')[0].trim() : '0');
      
      // If it's just a year or Timeline, convert to a comparable number/date
      const getTime = (d: string) => {
        if (!d || d === '0') return 0;
        const date = new Date(d);
        return isNaN(date.getTime()) ? parseInt(d) || 0 : date.getTime();
      };

      return getTime(dateB) - getTime(dateA);
    });
}

export function getContentBySlug(type: string, slug: string): ContentItem | null {
  const dir = path.join(CONTENT_DIR, type);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);
  
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    metadata: data as ContentMetadata,
    content,
  };
}

export function getSiteConfig() {
  const configPath = path.join(CONTENT_DIR, 'config', 'site.json');
  const configContent = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(configContent);
}

export function getFileContent(filePath: string): { metadata: ContentMetadata, content: string } {
  const fullPath = path.join(CONTENT_DIR, filePath);
  if (!fs.existsSync(fullPath)) return { metadata: {} as ContentMetadata, content: '' };

  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    metadata: data as ContentMetadata,
    content,
  };
}
