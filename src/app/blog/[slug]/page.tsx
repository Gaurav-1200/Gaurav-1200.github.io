import { getAllContent } from "@/lib/content";
import MDXContentPage from "@/components/MDXContentPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllContent('blogs');
  return items.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <MDXContentPage 
      type="blogs" 
      slug={slug} 
      backLabel="Blog" 
      backHref="/blog" 
    />
  );
}
