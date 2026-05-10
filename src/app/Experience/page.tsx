import { getAllContent, getSiteConfig } from "@/lib/content";
import { MainLayout } from "@/components/MainLayout";
import { TimelineCard } from "@/components/TimelineCard";

export default function ExperiencePage() {
  const config = getSiteConfig();
  const experience = getAllContent('Experience');

  return (
    <MainLayout config={config}>
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-20">
          <h1 className="text-3xl font-mono tracking-tighter mb-4">EXPERIENCE</h1>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
            My professional experience and achievements
          </p>
        </header>

        <div className="flex flex-col">
          {experience.map((item) => (
            <TimelineCard
              key={item.slug}
              item={item}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
