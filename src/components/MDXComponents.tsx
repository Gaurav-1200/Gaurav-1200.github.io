import React from 'react';
import { ResumeEmbed } from './ResumeEmbed';

export const mdxComponents = {
  h1: (props: any) => <h1 className="text-2xl font-mono tracking-tighter mt-12 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-lg font-mono tracking-tighter mt-12 mb-4 border-l-2 border-white/20 pl-4" {...props} />,
  h3: (props: any) => <h3 className="text-base font-mono tracking-tighter mt-8 mb-2" {...props} />,
  p: (props: any) => <p className="text-muted-foreground leading-relaxed mb-6" {...props} />,
  ul: (props: any) => <ul className="list-none mb-6 space-y-2" {...props} />,
  li: (props: any) => (
    <li className="flex gap-4 items-start text-sm text-muted-foreground" {...props}>
      <span className="text-white/20 font-mono mt-1">/</span>
      <span>{props.children}</span>
    </li>
  ),
  code: (props: any) => (
    <code className="bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono text-white/80" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-[#0a0a0a] border border-white/5 p-6 rounded-sm overflow-x-auto mb-8 font-mono text-xs leading-relaxed" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-left border-collapse font-mono text-[10px]" {...props} />
    </div>
  ),
  th: (props: any) => <th className="border-b border-white/10 pb-4 pt-2 opacity-50 font-normal uppercase tracking-widest" {...props} />,
  td: (props: any) => <td className="border-b border-white/5 py-4" {...props} />,
  hr: () => <hr className="border-white/5 my-12" />,
  ResumeEmbed: ResumeEmbed,
};
