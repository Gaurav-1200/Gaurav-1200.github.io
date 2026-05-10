import React from 'react';
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ContentItem } from '@/lib/content';
import { TimelineCardClient } from './TimelineCardClient';
import { mdxComponents } from './MDXComponents';

interface TimelineCardProps {
  item: ContentItem;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ item }) => {
  return (
    <TimelineCardClient metadata={item.metadata as any}>
      <MDXRemote 
        source={item.content} 
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          }
        }}
      />
    </TimelineCardClient>
  );
};
