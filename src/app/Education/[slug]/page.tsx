import { getAllContent } from "@/lib/content";
import MDXContentPage from "@/components/MDXContentPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllContent('Education');
  return items.map((p) => ({ slug: p.slug }));
}

export default async function EducationDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <MDXContentPage
      type="Education"
      slug={slug}
      backLabel="Education"
      backHref="/Education"
    />
  );
}
