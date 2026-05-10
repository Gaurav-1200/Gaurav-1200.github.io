import { getSiteConfig } from "@/lib/content";
import { MainLayout } from "@/components/MainLayout";
import Link from "next/link";

export default function Home() {
  const config = getSiteConfig();

  return (
    <MainLayout config={config}>
      <section className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-mono tracking-tighter mb-4 opacity-90">
            {config.name}
          </h1>
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-accent-muted mb-8">
            {config.title}
          </p>
          
          <div className="h-px w-12 bg-white/20 mx-auto mb-8" />
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-12 font-light">
            {config.specialization}
          </p>
          
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {config.navigation.map((item: any) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className="text-xs font-mono uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all hover:tracking-[0.4em]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </MainLayout>
  );
}
