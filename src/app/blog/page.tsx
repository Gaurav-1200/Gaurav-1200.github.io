import { getAllContent, getSiteConfig } from "@/lib/content";
import { MainLayout } from "@/components/MainLayout";
import { ContentCard } from "@/components/ContentCard";

export default function BlogPage() {
  const config = getSiteConfig();
  const items = getAllContent('blogs');

  return (
    <MainLayout config={config}>
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-20">
          <h1 className="text-3xl font-mono tracking-tighter mb-4">BLOG</h1>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
            Technical reflections on systems, AI, and the future of computation.
          </p>
        </header>

        <div className="flex flex-col">
          {items.map((item) => (
            <ContentCard 
              key={item.slug} 
              slug={item.slug} 
              metadata={item.metadata} 
              type="blog" 
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
