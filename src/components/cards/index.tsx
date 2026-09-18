import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckCircle, ArrowRight, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/buttons";

// ─── Base Card ──────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({
  className,
  hover = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-300 bg-[#1B1B18]/60 border border-white/[0.08]",
        hover && "hover:border-[#641F2A]/50 hover-elevate",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── GlassCard (Quiet Luxury Container) ─────────────────────────

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light";
  interactive?: boolean;
}

export function GlassCard({
  className,
  variant = "dark",
  interactive = true,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl transition-all duration-300",
        variant === "dark"
          ? "bg-[#1B1B18]/70 border border-white/[0.08] text-[#F1EBDD]"
          : "bg-[#E8DFCF]/70 border border-black/[0.08] text-[#11110F]",
        interactive && "hover-elevate cursor-pointer hover:border-[#641F2A]/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Card Sub-components ────────────────────────────────────────

export function CardIcon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#641F2A]/15 text-[#641F2A] border border-[#641F2A]/30 mb-4 transition-colors group-hover:bg-[#641F2A]/25",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className={cn("text-lg font-bold text-current tracking-tight mb-2", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-sm text-current opacity-70 leading-relaxed", className)}>
      {children}
    </p>
  );
}

// ─── ServiceCard ────────────────────────────────────────────────

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  href?: string;
  theme?: "dark" | "light";
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  features,
  href,
  theme = "dark",
  className,
}: ServiceCardProps) {
  const isDark = theme === "dark";

  const cardElement = (
    <div
      className={cn(
        "group relative flex flex-col justify-between h-full p-7 rounded-xl transition-all duration-300 hover-elevate",
        isDark
          ? "bg-[#1B1B18]/70 border border-white/[0.08] hover:border-[#641F2A]/40 text-[#F1EBDD]"
          : "bg-white/70 border border-black/[0.08] hover:border-[#641F2A]/40 text-[#11110F]",
        href && "cursor-pointer",
        className
      )}
    >
      <div>
        <div
          className={cn(
            "inline-flex items-center justify-center w-11 h-11 rounded-lg mb-4 transition-colors",
            isDark
              ? "bg-[#641F2A]/20 text-[#F1EBDD] border border-[#641F2A]/40 group-hover:bg-[#641F2A]/30"
              : "bg-[#641F2A]/10 text-[#641F2A] border border-[#641F2A]/20 group-hover:bg-[#641F2A]/15"
          )}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mb-5">{description}</CardDescription>
        <ul className={cn("space-y-2 mb-6 pt-4 border-t", isDark ? "border-white/[0.08]" : "border-black/[0.08]")}>
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-xs opacity-75">
              <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {href && (
        <div
          className={cn(
            "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors pt-2",
            isDark ? "text-[#E8DFCF] group-hover:text-white" : "text-[#641F2A] group-hover:text-[#45151D]"
          )}
        >
          <span>Explore capabilities</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`${title} - Explore capabilities`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#641F2A] rounded-xl"
      >
        {cardElement}
      </Link>
    );
  }
  return cardElement;
}

// ─── ProductCard ────────────────────────────────────────────────

export interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  href?: string;
  theme?: "dark" | "light";
  className?: string;
}

export function ProductCard({
  title,
  description,
  category,
  icon: Icon,
  href = "/request-quote",
  theme = "dark",
  className,
}: ProductCardProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "group flex flex-col justify-between h-full p-7 rounded-xl transition-all duration-300 hover-elevate",
        isDark
          ? "bg-[#1B1B18]/70 border border-white/[0.08] hover:border-[#68704A]/50 text-[#F1EBDD]"
          : "bg-white/80 border border-black/[0.08] hover:border-[#68704A]/50 text-[#11110F]",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "inline-flex items-center justify-center w-11 h-11 rounded-lg",
              isDark
                ? "bg-[#68704A]/20 text-[#F1EBDD] border border-[#68704A]/30"
                : "bg-[#68704A]/15 text-[#68704A] border border-[#68704A]/25"
            )}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider",
              isDark
                ? "bg-[#68704A]/20 text-[#F1EBDD] border border-[#68704A]/30"
                : "bg-[#68704A]/10 text-[#68704A] border border-[#68704A]/25"
            )}
          >
            {category}
          </span>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mb-6">{description}</CardDescription>
      </div>
      <div className={cn("pt-4 border-t", isDark ? "border-white/[0.08]" : "border-black/[0.08]")}>
        <Link
          href={href}
          aria-label={`Request quote for ${title}`}
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-[#641F2A]",
            isDark ? "text-[#E8DFCF] hover:text-white" : "text-[#641F2A] hover:text-[#45151D]"
          )}
        >
          <span>Request Specifications</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

// ─── FeatureCard ────────────────────────────────────────────────

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  theme?: "dark" | "light";
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  badge,
  theme = "dark",
  className,
}: FeatureCardProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "group relative p-6 rounded-xl transition-all duration-300 hover-elevate",
        isDark
          ? "bg-[#1B1B18]/70 border border-white/[0.08] hover:border-[#641F2A]/40 text-[#F1EBDD]"
          : "bg-white/70 border border-black/[0.08] hover:border-[#641F2A]/40 text-[#11110F]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
            isDark
              ? "bg-white/[0.05] border border-white/[0.08] text-[#F1EBDD] group-hover:border-[#641F2A]/40"
              : "bg-black/[0.04] border border-black/[0.08] text-[#11110F] group-hover:border-[#641F2A]/40"
          )}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        {badge && (
          <span
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border",
              isDark
                ? "bg-[#11110F] text-[#F1EBDD]/70 border-white/10"
                : "bg-white text-[#11110F]/70 border-black/10"
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-current mb-2">{title}</h3>
      <p className="text-sm text-current opacity-70 leading-relaxed">{description}</p>
    </div>
  );
}

// ─── CtaCard (Dedicated High-Impact CTA Card) ───────────────────

export interface CtaCardProps {
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function CtaCard({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CtaCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#11110F] text-[#F1EBDD] p-8 sm:p-12 shadow-2xl",
        className
      )}
    >
      {/* Subtle ambient luxury mesh */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#641F2A]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#68704A]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-base text-[#F1EBDD]/70 leading-relaxed mb-6">
          {description}
        </p>

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center gap-3">
            {primaryAction && (
              <ButtonLink href={primaryAction.href} variant="primary" size="md">
                {primaryAction.label}
              </ButtonLink>
            )}
            {secondaryAction && (
              <ButtonLink href={secondaryAction.href} variant="secondary" size="md">
                {secondaryAction.label}
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── IndustryCard ───────────────────────────────────────────────

export interface IndustryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function IndustryCard({
  title,
  description,
  icon: Icon,
  className,
}: IndustryCardProps) {
  return (
    <Card className={cn("h-full text-center group", className)}>
      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#F1EBDD] group-hover:border-[#641F2A]/40 transition-all mx-auto mb-4">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <CardTitle className="text-base">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}

// ─── ProcessStepCard ────────────────────────────────────────────

export interface ProcessStepCardProps {
  step: string;
  title: string;
  description: string;
  theme?: "dark" | "light";
  className?: string;
}

export function ProcessStepCard({
  step,
  title,
  description,
  theme = "dark",
  className,
}: ProcessStepCardProps) {
  const isDark = theme === "dark";

  return (
    <div className={cn("relative group", className)}>
      <span
        className={cn(
          "text-5xl font-mono font-bold absolute -top-3 -left-1 select-none transition-colors",
          isDark ? "text-white/[0.08] group-hover:text-[#641F2A]/30" : "text-black/[0.08] group-hover:text-[#641F2A]/30"
        )}
        aria-hidden="true"
      >
        {step}
      </span>
      <div className="relative pt-8">
        <h3 className={cn("text-base font-bold mb-2", isDark ? "text-[#F1EBDD]" : "text-[#11110F]")}>
          {title}
        </h3>
        <p className={cn("text-sm leading-relaxed", isDark ? "text-[#F1EBDD]/70" : "text-[#11110F]/70")}>
          {description}
        </p>
      </div>
    </div>
  );
}
