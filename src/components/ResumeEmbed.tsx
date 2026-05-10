"use client";

import React from 'react';

interface ResumeEmbedProps {
  fileId?: string;
}

export const ResumeEmbed: React.FC<ResumeEmbedProps> = ({ fileId }) => {
  if (!fileId) {
    return (
      <div className="p-8 border border-white/5 bg-white/[0.02] text-center font-mono text-xs opacity-50">
        Oops! I guess I missed sharing access permissions
      </div>
    );
  }

  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  return (
    <div className="my-12 max-w-5xl mx-auto w-full">
      {/* Download Button Section */}
      <div className="flex justify-end mb-6">
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.08]"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100">
            Download PDF
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-40 group-hover:opacity-100 transition-opacity"
          >
            <path d="M6 1V9M6 9L9 6M6 9L3 6M1 11H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* PDF Viewer Section */}
      <div className="relative w-full aspect-[1/1.2] bg-white/[0.02] border border-white/5 overflow-hidden group">
        {/* Subtle background text for loading/empty state */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-10">
            Initializing Secure PDF Viewer...
          </span>
        </div>

        <iframe
          src={previewUrl}
          className="w-full h-full border-0"
          allow="autoplay"
          loading="lazy"
        />

        {/* Hover overlay border */}
        <div className="absolute inset-0 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      <p className="mt-4 text-[10px] font-mono text-muted-foreground opacity-40 uppercase tracking-widest">
        PDF Viewer powered by Google Drive. Click "Download" for local copy.
      </p>
    </div>
  );
};
