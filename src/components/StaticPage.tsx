import { getFileContent, getSiteConfig } from "@/lib/content";
import { MainLayout } from "@/components/MainLayout";
import { ResumeEmbed } from "@/components/ResumeEmbed";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

interface StaticPageProps {
  contentPath: string;
  title: string;
}

export default function StaticPage({ contentPath, title }: StaticPageProps) {
  const { content } = getFileContent(contentPath);
  const config = getSiteConfig();

  const components = {
    h1: (props: any) => <h1 className="text-3xl font-mono tracking-tighter mt-12 mb-6 uppercase" {...props} />,
    h2: (props: any) => <h2 className="text-xl font-mono tracking-tighter mt-12 mb-4 border-l-2 border-white/20 pl-4 uppercase" {...props} />,
    h3: (props: any) => <h3 className="text-lg font-mono tracking-tighter mt-8 mb-2 uppercase" {...props} />,
    p: (props: any) => <p className="text-muted-foreground leading-relaxed mb-6" {...props} />,
    ul: (props: any) => <ul className="list-none mb-6 space-y-2" {...props} />,
    li: (props: any) => (
      <li className="flex gap-4 items-start text-sm text-muted-foreground" {...props}>
        <span className="text-white/20 font-mono mt-1">/</span>
        <span>{props.children}</span>
      </li>
    ),
    a: (props: any) => <a className="text-white border-b border-white/20 hover:border-white transition-colors" {...props} />,
    ResumeEmbed: (props: any) => <ResumeEmbed fileId={config.resumeId} {...props} />,
  };

  return (
    <MainLayout config={config}>
      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-mono tracking-tighter uppercase">{title}</h1>
        </header>

        <div className="prose prose-invert max-w-none">
          <MDXRemote 
            source={content} 
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              }
            }}
          />
        </div>
      </article>
    </MainLayout>
  );
}
