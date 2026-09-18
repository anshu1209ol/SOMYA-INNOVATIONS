import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Badge ──────────────────────────────────────────────────────

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "burgundy"
    | "olive"
    | "beige"
    | "dark"
    | "outline"
    | "default"
    | "accent"
    | "violet"
    | "cyan"
    | "success";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "burgundy",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variants: Record<string, string> = {
    burgundy: "bg-[#641F2A]/15 text-[#641F2A] border-[#641F2A]/30",
    olive: "bg-[#68704A]/15 text-[#68704A] border-[#68704A]/30",
    beige: "bg-[#F1EBDD]/15 text-[#F1EBDD] border-[#F1EBDD]/25",
    dark: "bg-[#11110F] text-[#F1EBDD] border-white/15",
    outline: "bg-transparent text-current border-current/30",
    // Backwards-compatibility aliases with luxury quiet tones
    default: "bg-[#1B1B18] text-[#E8DFCF] border-white/10",
    accent: "bg-[#641F2A]/20 text-[#F1EBDD] border-[#641F2A]/40",
    violet: "bg-[#641F2A]/20 text-[#F1EBDD] border-[#641F2A]/40",
    cyan: "bg-[#68704A]/20 text-[#F1EBDD] border-[#68704A]/40",
    success: "bg-[#68704A]/20 text-[#F1EBDD] border-[#68704A]/40",
  };

  const dotColors: Record<string, string> = {
    burgundy: "bg-[#641F2A]",
    olive: "bg-[#68704A]",
    beige: "bg-[#F1EBDD]",
    dark: "bg-[#F1EBDD]",
    outline: "bg-current",
    default: "bg-[#E8DFCF]",
    accent: "bg-[#641F2A]",
    violet: "bg-[#641F2A]",
    cyan: "bg-[#68704A]",
    success: "bg-[#68704A]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px] gap-1.5",
    md: "px-3 py-1 text-xs gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border transition-colors select-none tracking-wide",
        variants[variant] || variants.burgundy,
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotColors[variant] || dotColors.burgundy
          )}
        />
      )}
      <span>{children}</span>
    </span>
  );
}

// ─── SectionHeading ─────────────────────────────────────────────

export interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: BadgeProps["variant"];
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "burgundy",
  title,
  subtitle,
  align = "center",
  theme = "dark",
  className,
}: SectionHeadingProps) {
  const isLight = theme === "light";

  return (
    <div
      className={cn("mb-14 sm:mb-16", align === "center" && "text-center", className)}
    >
      {badge && (
        <div className="mb-3">
          <Badge variant={badgeVariant} dot>
            {badge}
          </Badge>
        </div>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight",
          isLight ? "text-[#11110F]" : "text-[#F1EBDD]",
          badge && "mt-2"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            isLight ? "text-[#11110F]/70" : "text-[#F1EBDD]/70",
            align === "center" && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Breadcrumbs ────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex items-center gap-2 text-xs font-medium text-[#F1EBDD]/50">
        <li>
          <Link href="/" className="hover:text-[#F1EBDD] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <span className="text-[#F1EBDD]/30">/</span>
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-[#F1EBDD] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#F1EBDD]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── BackgroundPattern ──────────────────────────────────────────

export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-arch-grid-dark opacity-40" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#641F2A]/[0.03] blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#68704A]/[0.03] blur-[120px]" />
    </div>
  );
}

// Re-export ScrollRevealClient and Typography components
export { ScrollRevealClient } from "./ScrollReveal";
export * from "./Typography";
