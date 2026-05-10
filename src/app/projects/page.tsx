import { getAllContent, getSiteConfig } from "@/lib/content";
import { MainLayout } from "@/components/MainLayout";
import { ContentCard } from "@/components/ContentCard";

export default function ProjectsPage() {
  const config = getSiteConfig();
  const projects = getAllContent('projects');

  return (
    <MainLayout config={config}>
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-20">
          <h1 className="text-3xl font-mono tracking-tighter mb-4">PROJECTS</h1>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
            Selected engineering systems and research implementations.
          </p>
        </header>

        <div className="flex flex-col">
          {projects.map((project) => (
            <ContentCard 
              key={project.slug} 
              slug={project.slug} 
              metadata={project.metadata} 
              type="projects" 
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
