import { getAllContent } from "@/lib/content";
import MDXContentPage from "@/components/MDXContentPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllContent('projects');
  return items.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <MDXContentPage 
      type="projects" 
      slug={slug} 
      backLabel="Projects" 
      backHref="/projects" 
    />
  );
}
