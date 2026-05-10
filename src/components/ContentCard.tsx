"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ContentMetadata } from '@/lib/content';

interface ProjectCardProps {
  slug: string;
  metadata: ContentMetadata;
  type: string;
}

export const ContentCard: React.FC<ProjectCardProps> = ({ slug, metadata, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative border-b border-white/5 py-12 last:border-0"
    >
      <Link href={`/${type}/${slug}`} className="block">
        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
          <div className="w-32 flex-shrink-0 text-[10px] font-mono uppercase tracking-[0.2em] opacity-30">
            {new Date(metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          </div>
          
          <div className="flex-grow">
            <h3 className="text-xl font-mono mb-4 group-hover:translate-x-1 transition-transform duration-300">
              {metadata.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-6">
              {metadata.description}
            </p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {metadata.tags?.map((tag) => (
                <span key={tag} className="text-[10px] font-mono uppercase tracking-widest opacity-20 group-hover:opacity-50 transition-opacity">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="md:text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              View Detail →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
