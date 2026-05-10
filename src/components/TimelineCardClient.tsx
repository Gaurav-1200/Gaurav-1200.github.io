"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineCardClientProps {
  children: React.ReactNode;
  metadata: {
    title: string;
    subtitle: string;
    description: string;
    timeline: string;
    metric?: string;
    highlights?: string[];
    link?: string;
  };
}

export const TimelineCardClient: React.FC<TimelineCardClientProps> = ({ children, metadata }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative border-b border-white/5 py-12 last:border-0">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Timeline */}
        <div className="w-32 flex-shrink-0 text-[10px] font-mono uppercase tracking-[0.2em] opacity-30 mt-1.5">
          {metadata.timeline}
        </div>
        
        <div className="flex-grow">
          {/* Title & Subtitle */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-mono mb-2 group-hover:translate-x-1 transition-transform duration-300">
              {metadata.title}
            </h3>
            <p className="text-sm text-accent-muted font-mono uppercase tracking-widest mb-1">
              {metadata.subtitle}
            </p>
            {metadata.link && (
              <a 
                href={metadata.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-mono opacity-20 hover:opacity-100 transition-opacity"
              >
                {new URL(metadata.link).hostname} ↗
              </a>
            )}
          </div>

          {/* Description & Metric */}
          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-8">
            <div className="max-w-md">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metadata.description}
              </p>
            </div>
            {metadata.metric && (
              <div>
                <span className="text-sm font-mono text-white/80">{metadata.metric}</span>
              </div>
            )}
          </div>

          {/* Highlights */}
          {metadata.highlights && metadata.highlights.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {metadata.highlights.map((highlight: string, idx: number) => (
                <span key={idx} className="text-[10px] font-mono uppercase tracking-widest opacity-20 group-hover:opacity-40 transition-opacity">
                  + {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all flex items-center gap-2"
          >
            {isOpen ? 'Close Details —' : 'More Details +'}
          </button>

          {/* Expanded Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-12 mt-12 border-t border-white/5 prose-sm prose-invert max-w-none">
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
