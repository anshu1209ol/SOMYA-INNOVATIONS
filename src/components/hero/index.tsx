import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";

// ─── PageHero ───────────────────────────────────────────────────
// Reusable hero section for all pages

interface HeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  children?: React.ReactNode; // for CTA buttons
  className?: string;
}

export function Hero({
  badge,
  title,
  titleHighlight,
  subtitle,
  children,
  className,
}: HeroProps) {
  return (
    <section className={cn("pt-32 pb-16 hero-gradient relative", className)}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <Badge variant="accent" className="mb-4">
            {badge}
          </Badge>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight mb-4">
          {title}
          {titleHighlight && (
            <>
              <br />
              <span className="gradient-text">{titleHighlight}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
