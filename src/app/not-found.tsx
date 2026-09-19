import React from "react";
import Link from "next/link";
import { ArrowRight, Home, Cpu, Layers, Mail, Compass } from "lucide-react";
import { Badge } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#11110F] text-[#F1EBDD] px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="burgundy" dot>
            404 Error
          </Badge>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F1EBDD] tracking-tight mb-4 leading-tight">
          Page Not Found
        </h1>

        <p className="text-base sm:text-lg text-[#F1EBDD]/70 max-w-lg mx-auto mb-10 leading-relaxed font-sans">
          The requested address is unavailable or may have been moved. Explore our core solution areas or return to the main portal.
        </p>

        {/* Primary Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
          <Link
            href="/"
            className="p-5 rounded-2xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/50 transition-all duration-200 group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#641F2A]/20 border border-[#641F2A]/40 flex items-center justify-center text-[#F1EBDD] shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#F1EBDD] block group-hover:text-[#E8DFCF] transition-colors">
                Home Portal
              </span>
              <span className="text-xs text-[#F1EBDD]/60 block mt-0.5">
                Return to the main overview and company introduction.
              </span>
            </div>
          </Link>

          <Link
            href="/solutions/ai-automation"
            className="p-5 rounded-2xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/50 transition-all duration-200 group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#68704A]/20 border border-[#68704A]/40 flex items-center justify-center text-[#E8DFCF] shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#F1EBDD] block group-hover:text-[#E8DFCF] transition-colors">
                Solutions Architecture
              </span>
              <span className="text-xs text-[#F1EBDD]/60 block mt-0.5">
                AI & Automation, IT Infrastructure & Digital Platforms.
              </span>
            </div>
          </Link>

          <Link
            href="/products"
            className="p-5 rounded-2xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/50 transition-all duration-200 group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[#F1EBDD] shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#F1EBDD] block group-hover:text-[#E8DFCF] transition-colors">
                Technology Products
              </span>
              <span className="text-xs text-[#F1EBDD]/60 block mt-0.5">
                Enterprise systems, hardware, networking & software.
              </span>
            </div>
          </Link>

          <Link
            href="/contact"
            className="p-5 rounded-2xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/50 transition-all duration-200 group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#641F2A]/20 border border-[#641F2A]/40 flex items-center justify-center text-[#F1EBDD] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#F1EBDD] block group-hover:text-[#E8DFCF] transition-colors">
                Contact & Support
              </span>
              <span className="text-xs text-[#F1EBDD]/60 block mt-0.5">
                Connect directly with our engineering and solutions team.
              </span>
            </div>
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#F1EBDD] bg-[#641F2A] hover:bg-[#7D2836] transition-colors"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
