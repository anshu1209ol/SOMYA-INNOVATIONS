"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import {
  Brain,
  Server,
  Sparkles,
  ChevronDown,
  ArrowRight,
  X,
  Layers,
  Cpu,
  Workflow,
  Cloud,
  ShieldCheck,
  Building2,
  BookOpen,
  Mail,
  HelpCircle,
  ExternalLink,
  Code2,
} from "lucide-react";

// Mega dropdown data tailored to Somya Innovations
const SOLUTIONS_DROPDOWN = [
  {
    title: "AI Solutions",
    href: "/ai-solutions",
    desc: "Autonomous intelligence, LLM workflows & predictive ML",
    icon: Brain,
    badge: "AI Powered",
    featuredItems: [
      { label: "AI Strategy & Roadmap", href: "/ai-solutions#strategy" },
      { label: "Machine Learning Models", href: "/ai-solutions#ml" },
      { label: "Intelligent Automation", href: "/ai-solutions#automation" },
    ],
  },
  {
    title: "IT Infrastructure",
    href: "/it-solutions",
    desc: "Enterprise cloud architecture, devops & zero-trust security",
    icon: Server,
    badge: "Enterprise",
    featuredItems: [
      { label: "Cloud & Hybrid Systems", href: "/it-solutions#cloud" },
      { label: "Cybersecurity Architecture", href: "/it-solutions#security" },
      { label: "DevOps & SRE", href: "/it-solutions#devops" },
    ],
  },
  {
    title: "Digital Engineering",
    href: "/digital-solutions",
    desc: "High-performance bespoke web, mobile & SaaS platforms",
    icon: Code2,
    badge: "Full-Stack",
    featuredItems: [
      { label: "Bespoke SaaS Platforms", href: "/digital-solutions#saas" },
      { label: "Modern Web & Mobile Apps", href: "/digital-solutions#web-mobile" },
      { label: "API & Microservices", href: "/digital-solutions#microservices" },
    ],
  },
];

const SECONDARY_LINKS = [
  { label: "Products", href: "/products", badge: "Live" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const wasMobileOpen = useRef(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Accessibility focus management for mobile drawer
  useEffect(() => {
    if (isMobileOpen) {
      wasMobileOpen.current = true;
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    } else if (wasMobileOpen.current) {
      wasMobileOpen.current = false;
      hamburgerRef.current?.focus();
    }
  }, [isMobileOpen]);

  // Route change reset
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
    setSolutionsOpen(false);
  }

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMobileOpen) setIsMobileOpen(false);
        if (solutionsOpen) setSolutionsOpen(false);
      }
    },
    [isMobileOpen, solutionsOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Body scroll locking
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isSolutionsActive =
    pathname.startsWith("/ai-solutions") ||
    pathname.startsWith("/it-solutions") ||
    pathname.startsWith("/digital-solutions");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-2.5 bg-[#11110F]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.7)]"
            : "py-3.5 bg-[#11110F]/65 backdrop-blur-md border-b border-white/[0.04]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand / Logo */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-[#641F2A] focus-visible:outline-offset-4 rounded-xl"
              aria-label="SOMYA INNOVATIONS Home"
            >
              {/* Official Luxury Emblem */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F1EBDD] border border-white/20 p-0.5 shadow-[0_4px_20px_rgba(100,31,42,0.45)] group-hover:shadow-[0_4px_25px_rgba(212,175,115,0.4)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <img
                    src="/branding/logo-mark.png"
                    alt="SOMYA INNOVATIONS Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                {/* Status indicator */}
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#68704A] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#68704A] border border-[#11110F]" />
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className="text-base sm:text-lg font-semibold text-[#F1EBDD] tracking-tight uppercase group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    {COMPANY.name}
                  </span>
                  <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold uppercase bg-white/[0.05] text-[#C8C2B3] border border-white/10">
                    Enterprise
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#F1EBDD]/60 font-medium hidden sm:block font-mono">
                  Technology • AI • IT Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center p-1 rounded-full bg-[#161614] border border-white/15 backdrop-blur-md shadow-md"
              aria-label="Primary navigation"
            >
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                  pathname === "/"
                    ? "text-[#F1EBDD] bg-white/[0.12] shadow-sm font-semibold"
                    : "text-[#F1EBDD]/85 hover:text-white hover:bg-white/[0.08]"
                )}
              >
                Home
              </Link>

              {/* Solutions Mega Menu Dropdown */}
              <div
                ref={solutionsRef}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setSolutionsOpen((prev) => !prev)}
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#641F2A]",
                    isSolutionsActive || solutionsOpen
                      ? "text-[#F1EBDD] bg-white/[0.12] shadow-sm font-semibold"
                      : "text-[#F1EBDD]/85 hover:text-white hover:bg-white/[0.08]"
                  )}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200 text-[#F1EBDD]/60",
                      solutionsOpen && "rotate-180 text-[#F1EBDD]"
                    )}
                  />
                </button>

                {/* Dropdown Card */}
                <div
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[560px] transition-all duration-200 z-50",
                    solutionsOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto visible"
                      : "opacity-0 -translate-y-2 pointer-events-none invisible"
                  )}
                >
                  <div className="bg-[#141412] border border-white/[0.1] rounded-2xl p-5 shadow-[0_24px_54px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#641F2A]" />
                        <span className="text-[11px] font-mono tracking-wider uppercase text-[#C8C2B3] font-semibold">
                          Specialized Practice Areas
                        </span>
                      </div>
                      <Link
                        href="/request-quote"
                        className="text-[11px] font-medium text-[#F1EBDD]/70 hover:text-[#F1EBDD] flex items-center gap-1 group"
                      >
                        Custom Architecture
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {SOLUTIONS_DROPDOWN.map((item) => {
                        const Icon = item.icon;
                        const active = pathname.startsWith(item.href);
                        return (
                          <div
                            key={item.title}
                            className={cn(
                              "p-3 rounded-xl transition-all duration-200 border",
                              active
                                ? "bg-white/[0.06] border-white/15"
                                : "bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.06] hover:border-white/10"
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={item.href}
                                className="flex items-start gap-3 group flex-1"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#641F2A]/25 border border-[#641F2A]/50 flex items-center justify-center text-[#F1EBDD] shrink-0 mt-0.5 group-hover:bg-[#641F2A] group-hover:scale-105 transition-all">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-[#F1EBDD] group-hover:text-white transition-colors">
                                      {item.title}
                                    </span>
                                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.05] text-[#C8C2B3] border border-white/10">
                                      {item.badge}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#8E8A80] leading-snug mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            </div>

                            {/* Sub items */}
                            <div className="mt-2.5 pl-11 flex flex-wrap items-center gap-x-3 gap-y-1">
                              {item.featuredItems.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  className="text-[10px] text-[#C8C2B3]/80 hover:text-[#F1EBDD] hover:underline underline-offset-2 transition-colors"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {SECONDARY_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5",
                      active
                        ? "text-[#F1EBDD] bg-white/[0.12] shadow-sm font-semibold"
                        : "text-[#F1EBDD]/85 hover:text-white hover:bg-white/[0.08]"
                    )}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#68704A]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/request-quote"
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#F1EBDD] bg-[#641F2A] hover:bg-[#7D2836] border border-[#641F2A]/60 shadow-[0_2px_14px_rgba(100,31,42,0.4)] hover:shadow-[0_4px_20px_rgba(100,31,42,0.6)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#641F2A]"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[#F1EBDD] hover:bg-white/[0.08] transition-colors focus-visible:outline-2 focus-visible:outline-[#641F2A] focus-visible:outline-offset-2"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span
                  className={cn(
                    "w-full h-0.5 bg-current rounded-full transition-all duration-300 transform origin-center",
                    isMobileOpen && "translate-y-[7px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-current rounded-full transition-all duration-200",
                    isMobileOpen && "opacity-0 scale-x-0"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-current rounded-full transition-all duration-300 transform origin-center",
                    isMobileOpen && "-translate-y-[7px] -rotate-45"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-all duration-300",
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop blur */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer content */}
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className={cn(
            "absolute top-0 right-0 h-full w-full max-w-sm bg-[#11110F] border-l border-white/[0.1] p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out overflow-y-auto",
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="space-y-6 pt-4">
            {/* Header in Drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#F1EBDD] p-0.5 border border-white/20 flex items-center justify-center shadow-[0_2px_10px_rgba(100,31,42,0.4)]">
                  <img
                    src="/branding/logo-mark.png"
                    alt="SOMYA INNOVATIONS Logo"
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <span
                  className="text-sm font-semibold text-[#F1EBDD] tracking-tight uppercase"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  {COMPANY.name}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#F1EBDD]/70 hover:text-[#F1EBDD] border border-white/[0.08] transition-colors focus-visible:outline-2 focus-visible:outline-[#641F2A]"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Primary Navigation">
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === "/"
                    ? "text-[#F1EBDD] bg-[#641F2A]/20 border border-[#641F2A]/40"
                    : "text-[#F1EBDD]/80 hover:text-[#F1EBDD] hover:bg-white/[0.04]"
                )}
              >
                <span>Home</span>
              </Link>

              {/* Solutions Submenu Group */}
              <div className="pt-2 pb-1">
                <span className="px-3.5 text-[10px] font-mono tracking-wider uppercase text-[#C8C2B3]/70 font-semibold">
                  Solutions & Practices
                </span>
              </div>

              {SOLUTIONS_DROPDOWN.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      active
                        ? "text-[#F1EBDD] bg-[#641F2A]/20 border border-[#641F2A]/40"
                        : "text-[#F1EBDD]/80 hover:text-[#F1EBDD] hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#641F2A]" />
                      <span>{item.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F1EBDD]/40" />
                  </Link>
                );
              })}

              <div className="pt-2 pb-1">
                <span className="px-3.5 text-[10px] font-mono tracking-wider uppercase text-[#C8C2B3]/70 font-semibold">
                  Navigation
                </span>
              </div>

              {SECONDARY_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      active
                        ? "text-[#F1EBDD] bg-[#641F2A]/20 border border-[#641F2A]/40"
                        : "text-[#F1EBDD]/80 hover:text-[#F1EBDD] hover:bg-white/[0.04]"
                    )}
                  >
                    <span>{link.label}</span>
                    {active ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#641F2A]" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[#F1EBDD]/40" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Drawer Footer CTA */}
          <div className="pt-6 border-t border-white/[0.08] space-y-3">
            <Link
              href="/request-quote"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-[#F1EBDD] bg-[#641F2A] hover:bg-[#7D2836] border border-[#641F2A]/60 shadow-[0_2px_14px_rgba(100,31,42,0.4)] transition-all"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-[#68704A] animate-pulse" />
              <span className="text-xs text-[#F1EBDD]/60 font-mono">
                System Status: All Services Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
