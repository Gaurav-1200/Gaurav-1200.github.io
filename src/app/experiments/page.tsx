import { getAllContent, getSiteConfig } from "@/lib/content";
import { MainLayout } from "@/components/MainLayout";
import { ContentCard } from "@/components/ContentCard";

export default function ExperimentsPage() {
  const config = getSiteConfig();
  const items = getAllContent('experiments');

  return (
    <MainLayout config={config}>
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-20">
          <h1 className="text-3xl font-mono tracking-tighter mb-4">EXPERIMENTS</h1>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
            Non-deterministic probes into system behavior and agentic workflows.
          </p>
        </header>

        <div className="flex flex-col">
          {items.map((item) => (
            <ContentCard 
              key={item.slug} 
              slug={item.slug} 
              metadata={item.metadata} 
              type="experiments" 
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
