import { getAllContent } from "@/lib/content";
import MDXContentPage from "@/components/MDXContentPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllContent('research');
  return items.map((p) => ({ slug: p.slug }));
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <MDXContentPage 
      type="research" 
      slug={slug} 
      backLabel="Research" 
      backHref="/research" 
    />
  );
}
