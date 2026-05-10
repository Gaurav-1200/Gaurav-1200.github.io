import { getAllContent, getSiteConfig } from "@/lib/content";
import { MainLayout } from "@/components/MainLayout";
import { TimelineCard } from "@/components/TimelineCard";

export default function EducationPage() {
  const config = getSiteConfig();
  const education = getAllContent('Education');

  return (
    <MainLayout config={config}>
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-20">
          <h1 className="text-3xl font-mono tracking-tighter mb-4">EDUCATION</h1>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
            My educational background and achievements
          </p>
        </header>

        <div className="flex flex-col">
          {education.map((item) => (
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
