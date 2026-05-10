import { getAllContent } from "@/lib/content";
import MDXContentPage from "@/components/MDXContentPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllContent('experiments');
  return items.map((p) => ({ slug: p.slug }));
}

export default async function ExperimentDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <MDXContentPage 
      type="experiments" 
      slug={slug} 
      backLabel="Experiments" 
      backHref="/experiments" 
    />
  );
}
