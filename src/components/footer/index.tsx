"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, FOOTER_LINKS } from "@/lib/constants";

// ─── Crisp Brand Social SVGs ──────────────────────────────────────

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Footer() {
  const pathname = usePathname();

  // Do not render marketing Footer on internal management portals or dedicated auth pages
  const isManagementOrAuth =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/ceo') ||
    pathname.startsWith('/tech-lead') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/attendance') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/verify-email') ||
    pathname.startsWith('/unauthorized');

  if (isManagementOrAuth) {
    return null;
  }

  const socialLinks = [
    { label: "LinkedIn", href: COMPANY.social.linkedin, icon: LinkedInIcon },
    { label: "Instagram", href: COMPANY.social.instagram, icon: InstagramIcon },
    { label: "Facebook", href: COMPANY.social.facebook, icon: FacebookIcon },
    { label: "YouTube", href: COMPANY.social.youtube, icon: YouTubeIcon },
    { label: "GitHub", href: COMPANY.social.github, icon: GitHubIcon },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-[#11110F] text-[#F1EBDD] relative overflow-hidden">
      {/* Subtle ambient mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-48 rounded-full bg-[#641F2A]/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-48 rounded-full bg-[#68704A]/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Company Profile (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#641F2A] rounded-lg"
              aria-label="SOMYA INNOVATIONS Home"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F1EBDD] p-0.5 border border-white/20 flex items-center justify-center shadow-[0_2px_14px_rgba(100,31,42,0.4)] group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/branding/logo-mark.png"
                  alt="SOMYA INNOVATIONS Logo"
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <span className="text-xl font-bold text-[#F1EBDD] tracking-tight group-hover:text-white transition-colors">
                {COMPANY.name}
              </span>
            </Link>

            <p className="text-sm font-medium text-[#E8DFCF]/90 tracking-wide font-mono">
              {COMPANY.tagline}
            </p>

            <p className="text-sm text-[#F1EBDD]/70 leading-relaxed max-w-md">
              {COMPANY.description}
            </p>

            {/* Social Links */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F1EBDD]/50 block mb-3 font-mono">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`SOMYA INNOVATIONS on ${social.label}`}
                      className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:border-[#641F2A]/50 hover:bg-white/[0.06] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#641F2A]"
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Solutions (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F1EBDD] font-mono">
              Solutions & Pillars
            </h3>
            <nav aria-label="Footer Solutions Links">
              <ul className="space-y-2.5">
                {FOOTER_LINKS.solutions.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#F1EBDD]/85 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#641F2A] rounded"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Company (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F1EBDD] font-mono">
              Company
            </h3>
            <nav aria-label="Footer Company Links">
              <ul className="space-y-2.5">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#F1EBDD]/85 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#641F2A] rounded"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4: Legal & Portals (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F1EBDD] font-mono">
              Legal & Access
            </h3>
            <nav aria-label="Footer Legal Links">
              <ul className="space-y-2.5">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#F1EBDD]/85 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#641F2A] rounded"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-white/[0.08]">
                  <Link
                    href="/ceo"
                    className="text-xs font-mono text-[#A2AD7B] hover:text-[#F1EBDD] transition-colors"
                  >
                    CEO Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="text-xs font-mono text-[#A2AD7B] hover:text-[#F1EBDD] transition-colors"
                  >
                    Admin Console
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tech-lead"
                    className="text-xs font-mono text-[#A2AD7B] hover:text-[#F1EBDD] transition-colors"
                  >
                    Tech Lead System
                  </Link>
                </li>
                <li>
                  <Link
                    href="/attendance"
                    className="text-xs font-mono text-[#A2AD7B] hover:text-[#F1EBDD] transition-colors"
                  >
                    Workforce Attendance
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/[0.08] py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#F1EBDD]/60 font-mono">
            &copy; 2026 SOMYA INNOVATIONS. All rights reserved.
          </p>
          <p className="text-xs font-medium text-[#F1EBDD]/60 font-mono">
            Technology • AI • IT Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
