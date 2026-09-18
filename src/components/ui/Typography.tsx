import React from "react";
import { cn } from "@/lib/utils";

// ─── Display Heading ──────────────────────────────────────────────
export interface DisplayHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "div";
  gradient?: boolean;
}

export function DisplayHeading({
  as: Component = "h1",
  className,
  children,
  ...props
}: DisplayHeadingProps) {
  return (
    <Component
      className={cn(
        "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-current leading-[1.08]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// ─── Editorial Heading (Serif accent for quiet luxury) ───────────
export interface EditorialHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "span" | "div";
  italic?: boolean;
}

export function EditorialHeading({
  as: Component = "span",
  italic = true,
  className,
  children,
  ...props
}: EditorialHeadingProps) {
  return (
    <Component
      className={cn(
        "font-serif tracking-normal text-current font-normal",
        italic && "italic",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// ─── Semantic Headings ────────────────────────────────────────────
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | "display";
  gradient?: boolean;
}

export function Heading({
  level = 2,
  className,
  children,
  ...props
}: HeadingProps) {
  if (level === "display") {
    return (
      <h1 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight", className)} {...props}>
        {children}
      </h1>
    );
  }

  if (level === 1) {
    return (
      <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight", className)} {...props}>
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2 className={cn("text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight", className)} {...props}>
        {children}
      </h2>
    );
  }

  return (
    <h3 className={cn("text-xl sm:text-2xl font-bold tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

export function H1({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-current", className)} {...props}>
      {children}
    </h1>
  );
}

export function H2({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-current", className)} {...props}>
      {children}
    </h2>
  );
}

export function H3({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl sm:text-2xl font-semibold tracking-tight text-current", className)} {...props}>
      {children}
    </h3>
  );
}

// ─── Body Text ────────────────────────────────────────────────────
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "lead" | "muted" | "small" | "label";
  as?: "p" | "span" | "div";
}

export function Text({
  variant = "default",
  as: Component = "p",
  className,
  children,
  ...props
}: TextProps) {
  const variantStyles = {
    default: "text-base leading-relaxed text-current opacity-85",
    lead: "text-lg sm:text-xl leading-relaxed text-current opacity-90 font-normal",
    muted: "text-sm text-current opacity-60",
    small: "text-xs text-current opacity-70 leading-relaxed",
    label: "text-[11px] font-mono uppercase tracking-wider text-current opacity-75",
  };

  return (
    <Component
      className={cn(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

// ─── Small Text ───────────────────────────────────────────────────
export function SmallText({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-current opacity-70 leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

// ─── Label ────────────────────────────────────────────────────────
export function Label({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("text-[11px] font-mono uppercase tracking-wider text-current opacity-75 inline-block", className)} {...props}>
      {children}
    </span>
  );
}

// ─── Navigation Text ──────────────────────────────────────────────
export function NavText({
  className,
  active = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { active?: boolean }) {
  return (
    <span
      className={cn(
        "text-sm font-medium transition-colors",
        active ? "text-[#F1EBDD] font-semibold" : "text-[#F1EBDD]/70 hover:text-[#F1EBDD]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
