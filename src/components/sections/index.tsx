import React from "react";
import { ButtonLink } from "@/components/buttons";
import { ArrowRight } from "lucide-react";

// ─── CTA Banner ─────────────────────────────────────────────────

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CTABanner({
  title = "Ready to Transform Your Business?",
  subtitle = "Let's discuss how SOMYA INNOVATIONS can help you leverage technology, AI, and digital solutions to achieve your business objectives.",
  primaryHref = "/request-quote",
  primaryLabel = "Request a Quotation",
  secondaryHref = "/services",
  secondaryLabel = "Explore Services",
}: CTABannerProps) {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#641F2A]/15 via-[#11110F] to-[#68704A]/15" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-[1px] rounded-3xl border border-zinc-700/50" />
          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonLink href={primaryHref} size="lg">
                {primaryLabel}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={secondaryHref} variant="outline" size="lg">
                {secondaryLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section Wrapper ────────────────────────────────────────────

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  id?: string;
}

export function Section({
  children,
  className,
  gradient = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-24 lg:py-32 relative ${gradient ? "section-gradient" : ""} ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
