import { getContentBySlug, getSiteConfig } from "@/lib/content";
import { MainLayout } from "@/components/MainLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/MDXComponents";

interface MDXContentPageProps {
  type: string;
  slug: string;
  backLabel: string;
  backHref: string;
}

export default async function MDXContentPage({ type, slug, backLabel, backHref }: MDXContentPageProps) {
  const item = getContentBySlug(type, slug);
  const config = getSiteConfig();

  if (!item) {
    notFound();
  }

  return (
    <MainLayout config={config}>
      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-16">
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 mb-8">
            <Link href={backHref} className="hover:opacity-100 transition-opacity">{backLabel}</Link>
            <span>/</span>
            <span>{item.metadata.Timeline || new Date(item.metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-mono tracking-tighter mb-6">{item.metadata.Degree || item.metadata.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed italic">{item.metadata.College || item.metadata.description}</p>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10">
            {item.metadata.github && (
              <a href={item.metadata.github} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono uppercase tracking-widest hover:text-white transition-colors border-b border-white/20 pb-1">
                Source Code
              </a>
            )}
            {item.metadata.demo && (
              <a href={item.metadata.demo} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono uppercase tracking-widest hover:text-white transition-colors border-b border-white/20 pb-1">
                Live Demo
              </a>
            )}
            {item.metadata.Website && (
              <a href={item.metadata.Website} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono uppercase tracking-widest hover:text-white transition-colors border-b border-white/20 pb-1">
                Website
              </a>
            )}
          </div>
        </header>

        <div className="prose prose-invert max-w-none">
          <MDXRemote 
            source={item.content} 
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              }
            }}
          />
        </div>
      </article>
    </MainLayout>
  );
}
