"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BoidsBackground } from './BoidsBackground';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MainLayoutProps {
  children: React.ReactNode;
  config: any;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, config }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-white selection:text-black">
      <BoidsBackground />

      {!isHome && (
        <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
          <nav className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center">
            <Link href="/" className="font-mono text-sm tracking-tighter opacity-70 hover:opacity-100 transition-opacity">
              GAURAV
            </Link>

            <ul className="flex gap-8">
              {config.navigation.map((item: any) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      "text-xs font-mono uppercase tracking-widest transition-all",
                      pathname.startsWith(item.path) ? "opacity-100" : "opacity-40 hover:opacity-80"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      )}

      <main className={cn(
        "flex-grow flex flex-col",
        !isHome && "pt-32 pb-20"
      )}>
        {children}
      </main>

      {!isHome && (
        <footer className="py-10 border-t border-white/5 mix-blend-difference">
          <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest opacity-30">
            <span>© {new Date().getFullYear()} {config.name}</span>
            <div className="flex gap-6">
              {Object.entries(config.socials).map(([key, value]: [string, any]) => (
                <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                  {key}
                </a>
              ))}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
