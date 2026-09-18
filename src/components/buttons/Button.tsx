import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Button Shared Styles ─────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "secondary-dark" | "olive" | "dark" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

const baseButtonStyles =
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#641F2A] focus-visible:outline-offset-2";

const buttonVariants: Record<ButtonVariant, string> = {
  // Primary CTA: Burgundy (#641F2A) with Dark Burgundy hover (#45151D)
  primary:
    "bg-[#641F2A] hover:bg-[#45151D] text-[#F1EBDD] border border-[#641F2A] shadow-sm hover:shadow-md",
  
  // Secondary CTA for dark sections: Transparent with thin beige border
  secondary:
    "bg-transparent hover:bg-[#F1EBDD]/10 text-[#F1EBDD] border border-[#F1EBDD]/30 hover:border-[#F1EBDD]/60",

  // Secondary CTA for light sections: Transparent with warm black border
  "secondary-dark":
    "bg-transparent hover:bg-[#11110F]/5 text-[#11110F] border border-[#11110F]/30 hover:border-[#11110F]/60",

  // Olive Green accent variant (#68704A)
  olive:
    "bg-[#68704A] hover:bg-[#4D5437] text-[#F1EBDD] border border-[#68704A]",

  // Solid dark surface
  dark:
    "bg-[#11110F] hover:bg-[#1B1B18] text-[#F1EBDD] border border-[#F1EBDD]/15",

  // Ghost variant
  ghost:
    "bg-transparent hover:bg-current/10 border border-transparent",

  // Outline variant
  outline:
    "border border-[#641F2A] text-[#641F2A] hover:bg-[#641F2A]/10 bg-transparent",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs gap-1.5 tracking-wide",
  md: "px-5 py-2.5 text-sm gap-2 tracking-normal",
  lg: "px-7 py-3.5 text-base gap-2.5 tracking-normal",
};

// ─── Button Component ─────────────────────────────────────────────

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseButtonStyles, buttonVariants[variant], buttonSizes[size], className)}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}

// ─── ButtonLink Component ─────────────────────────────────────────

export interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "right" | "left";
}

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  children,
  ...props
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  const combinedClasses = cn(baseButtonStyles, buttonVariants[variant], buttonSizes[size], className);

  if (isExternal) {
    const defaultRel = href.startsWith("http") || props.target === "_blank" ? "noopener noreferrer" : undefined;
    return (
      <a
        href={href}
        className={combinedClasses}
        rel={props.rel || defaultRel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} {...props}>
      {content}
    </Link>
  );
}
