import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Badge,
  DisplayHeading,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Briefcase,
  Rocket,
  GraduationCap,
  Building2,
  ShoppingBag,
  HeartPulse,
  Landmark,
  Users2,
  Truck,
  Factory,
  ShieldCheck,
  Compass,
} from "lucide-react";

import { createMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Technology Solutions for Businesses | SOMYA INNOVATIONS",
  description:
    "Explore technology solutions designed around real business requirements across AI, IT infrastructure and digital products.",
  path: "/industries",
});

// ─── 10 Industry Profiles ────────────────────────────────────────

interface IndustryProfile {
  id: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  environmentOverview: string;
  challenges: string[];
  solutions: string[];
  relevantServices: { name: string; href: string }[];
  ctaLabel: string;
}

const INDUSTRIES_DATA: IndustryProfile[] = [
  {
    id: "businesses",
    title: "Businesses",
    badge: "Commercial Enterprises",
    icon: Briefcase,
    environmentOverview:
      "Mid-sized commercial businesses seeking to modernize operational IT, eliminate departmental software silos, and protect core business continuity.",
    challenges: [
      "Disjointed legacy accounting, CRM, and inventory databases creating duplicate work",
      "Aging workstation fleets causing high employee downtime and productivity lag",
      "Vulnerability to ransomware, data leakage, and unencrypted employee remote access",
    ],
    solutions: [
      "Standardized commercial PC/laptop fleet provisioning with pre-delivery staging",
      "Custom business dashboards unifying financial, sales, and operational metrics",
      "Secure structured office networking with automated daily backup pipelines",
    ],
    relevantServices: [
      { name: "IT Infrastructure", href: "/solutions/it-solutions" },
      { name: "Business Dashboards", href: "/solutions/digital-solutions" },
      { name: "Technology Products", href: "/products" },
      { name: "Technical Support", href: "/solutions/it-solutions" },
    ],
    ctaLabel: "Discuss Business Solutions",
  },
  {
    id: "startups",
    title: "Startups",
    badge: "High-Growth Ventures",
    icon: Rocket,
    environmentOverview:
      "Fast-moving digital ventures needing rapid technical prototyping, cost-efficient cloud architectures, and scalable full-stack web platforms.",
    challenges: [
      "Limited internal engineering bandwidth to build scalable backends alongside product UI",
      "Fragile initial cloud setups that become cost-prohibitive as user volumes increase",
      "Need for intelligent AI capabilities without massive in-house machine learning teams",
    ],
    solutions: [
      "Modern Next.js/React full-stack application development with modular microservices",
      "Docker containerization and automated CI/CD deployment pipelines on AWS/Azure",
      "Pragmatic applied AI integrations (custom LLMs, document parsers, vector search)",
    ],
    relevantServices: [
      { name: "Web Applications", href: "/solutions/digital-solutions" },
      { name: "Cloud Solutions", href: "/solutions/digital-solutions" },
      { name: "AI Automation", href: "/solutions/ai-automation" },
      { name: "API Integration", href: "/solutions/digital-solutions" },
    ],
    ctaLabel: "Discuss Startup Requirements",
  },
  {
    id: "education",
    title: "Education & Institutions",
    badge: "Campuses & Research",
    icon: GraduationCap,
    environmentOverview:
      "Universities, colleges, private schools, and research academies requiring reliable campus-wide connectivity, student portals, and computing labs.",
    challenges: [
      "Campus-wide Wi-Fi dead zones and bandwidth collapse under heavy student device loads",
      "Fragmented student management systems (SMS) with uncoordinated fee and grade tracking",
      "Unmonitored computer labs, asset theft risks, and lack of physical campus perimeter security",
    ],
    solutions: [
      "High-density Wi-Fi 6/7 access points with isolated student and faculty network VLANs",
      "Digital student management portals and automated paper record digitization",
      "Turnkey institutional computer lab hardware deployments, 4K CCTV surveillance, and RFID access gates",
    ],
    relevantServices: [
      { name: "Technology Products", href: "/products" },
      { name: "Networking Solutions", href: "/solutions/it-solutions" },
      { name: "CCTV & Security", href: "/solutions/it-solutions" },
      { name: "Custom Software", href: "/solutions/digital-solutions" },
    ],
    ctaLabel: "Discuss Institutional Solutions",
  },
  {
    id: "corporate",
    title: "Corporate Organizations",
    badge: "Enterprises & Holdings",
    icon: Building2,
    environmentOverview:
      "Large corporations and multi-branch firms needing centralized technology infrastructure governance, automated approvals, and high-availability servers.",
    challenges: [
      "Disparate multi-branch systems creating inconsistent performance and duplicate vendor overhead",
      "Slow, manual multi-departmental approval chains creating administrative bottlenecks",
      "Strict data protection mandates requiring auditable, SLA-governed system reliability",
    ],
    solutions: [
      "Standardized enterprise compute and network configurations with transparent pricing tiers",
      "Algorithmic business process automation orchestrating cross-system ERP workflows",
      "High-availability server rack deployments with failover topologies and multi-WAN connectivity",
    ],
    relevantServices: [
      { name: "Technology Products", href: "/products" },
      { name: "Workflow Automation", href: "/solutions/ai-automation" },
      { name: "IT Infrastructure", href: "/solutions/it-solutions" },
      { name: "Digital Solutions", href: "/solutions/digital-solutions" },
    ],
    ctaLabel: "Discuss Corporate Strategy",
  },
  {
    id: "retail",
    title: "Retail & Multi-Store",
    badge: "Stores & Showrooms",
    icon: ShoppingBag,
    environmentOverview:
      "Commercial retail stores, showrooms, and multi-location retail chains requiring uninterrupted checkout uptime, inventory synchronization, and facility security.",
    challenges: [
      "Offline point-of-sale breakdowns causing customer checkout walkouts during peak hours",
      "Inventory record mismatches between physical retail shelves and central stock warehouses",
      "Unmonitored floor blind spots, product shrinkage, and lack of customer traffic insights",
    ],
    solutions: [
      "Heavy-duty commercial POS hardware setups, receipt printers, and wireless barcode scanners",
      "Real-time multi-store inventory dashboards syncing physical shops with digital orders",
      "Commercial 4K IP security cameras with computer vision for customer density telemetry",
    ],
    relevantServices: [
      { name: "Computer Accessories & POS", href: "/solutions/it-solutions" },
      { name: "Computer Vision", href: "/solutions/ai-automation" },
      { name: "Business Dashboards", href: "/solutions/digital-solutions" },
      { name: "CCTV Technology", href: "/solutions/it-solutions" },
    ],
    ctaLabel: "Discuss Retail Solutions",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    badge: "Hospitals, Clinics & Labs",
    icon: HeartPulse,
    environmentOverview:
      "Medical clinics, hospitals, and diagnostic diagnostic laboratories with zero tolerance for system outages, data loss, or intake delays.",
    challenges: [
      "Strict regulatory mandates for patient health data privacy, encryption, and auditability",
      "Unplanned hardware power cuts during vital procedures or diagnostic imaging capture",
      "Manual paper patient registration causing long lobby wait times and billing entry errors",
    ],
    solutions: [
      "Encrypted, high-availability database architectures with daily automated point-in-time recovery",
      "True online double-conversion rackmount UPS power conditioning with zero transfer latency",
      "Intelligent document processing extracting structured medical records from scanned forms",
    ],
    relevantServices: [
      { name: "Document Intelligence", href: "/solutions/ai-automation" },
      { name: "Electronics & UPS Backup", href: "/products" },
      { name: "Database Solutions", href: "/solutions/digital-solutions" },
      { name: "Technical Support", href: "/solutions/it-solutions" },
    ],
    ctaLabel: "Discuss Healthcare Infrastructure",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    badge: "Developers & Facilities",
    icon: Landmark,
    environmentOverview:
      "Property developers, commercial facility management firms, and real estate brokerages needing digital leasing portals and automated access security.",
    challenges: [
      "Fragmented tenant maintenance tickets, delayed repair dispatch, and manual paper lease agreements",
      "Slow response times to online buyer inquiries leading to lost sales opportunities",
      "Unsecured building entryways and lack of auditable visitor entry/exit tracking logs",
    ],
    solutions: [
      "Custom property management portals with automated tenant ticketing and rent notifications",
      "24/7 conversational AI chatbots for real-time property specification queries and tour booking",
      "Networked biometric access control terminals, RFID card gates, and automated visitor logs",
    ],
    relevantServices: [
      { name: "Custom Software", href: "/solutions/digital-solutions" },
      { name: "AI Chatbots", href: "/solutions/ai-automation" },
      { name: "Access Control Systems", href: "/solutions/it-solutions" },
      { name: "Website Development", href: "/solutions/digital-solutions" },
    ],
    ctaLabel: "Discuss Real Estate Solutions",
  },
  {
    id: "hospitality",
    title: "Hospitality",
    badge: "Hotels, Resorts & Dining",
    icon: Users2,
    environmentOverview:
      "Hotels, luxury resorts, restaurants, and event venues where guest satisfaction depends directly on high-speed internet and seamless digital service.",
    challenges: [
      "Unstable guest room Wi-Fi causing immediate complaints and negative online reviews",
      "Uncoordinated billing between front desk reception, dining kitchens, and room service",
      "Conference and banquet hall audiovisual equipment failing during corporate executive summits",
    ],
    solutions: [
      "High-density Wi-Fi 6 wireless networks with zero-handoff roaming and branded guest portals",
      "Commercial 55\" 4K conference displays, video soundbars, and automated meeting room AV",
      "Customized guest service applications and centralized operational telemetry dashboards",
    ],
    relevantServices: [
      { name: "Wi-Fi Infrastructure", href: "/solutions/it-solutions" },
      { name: "Commercial AV Systems", href: "/products" },
      { name: "Web Applications", href: "/solutions/digital-solutions" },
      { name: "Networking Solutions", href: "/solutions/it-solutions" },
    ],
    ctaLabel: "Discuss Hospitality IT",
  },
  {
    id: "logistics",
    title: "Logistics",
    badge: "Freight, Fleet & Warehouses",
    icon: Truck,
    environmentOverview:
      "Warehouses, distribution hubs, freight operators, and supply chain coordinators moving high volumes of physical goods under tight delivery windows.",
    challenges: [
      "Frequent manual barcode misreads in dusty warehouse docks causing shipping routing errors",
      "Lack of real-time visibility between pallet loading docks and customer tracking portals",
      "Harsh operational environments destroying standard consumer office computers",
    ],
    solutions: [
      "Industrial 2D barcode scanners and ruggedized high-durability workstation deployments",
      "Computer vision camera feeds automatically validating shipping label tags and pallet integrity",
      "Custom dispatch and inventory dashboards integrating third-party carrier APIs and telematics",
    ],
    relevantServices: [
      { name: "Computer Vision", href: "/solutions/ai-automation" },
      { name: "Office Technology & Scanners", href: "/products" },
      { name: "Business Dashboards", href: "/solutions/digital-solutions" },
      { name: "API Integration", href: "/solutions/digital-solutions" },
    ],
    ctaLabel: "Discuss Logistics Systems",
  },
  {
    id: "agriculture",
    title: "Agriculture",
    badge: "Agri-Processing & Cold Chains",
    icon: Factory,
    environmentOverview:
      "Grain processing facilities, cold-storage warehouses, seed distributors, and agribusinesses operating in demanding, remote rural environments.",
    challenges: [
      "Unmonitored temperature or moisture variations in cold storage leading to bulk crop spoilage",
      "Erratic rural power grid fluctuations causing sudden computing equipment burnout",
      "Slow paper record-keeping for farmer crop weigh-ins, batch grading, and payment disbursements",
    ],
    solutions: [
      "IoT sensor telemetry monitoring temperature and humidity with automatic emergency alerts",
      "Heavy-duty online double-conversion UPS units safeguarding critical weighing systems",
      "Custom agri-processing software tracking batch yields, grower payments, and dispatch lots",
    ],
    relevantServices: [
      { name: "Security & Sensor Telemetry", href: "/solutions/it-solutions" },
      { name: "Power Conditioning (UPS)", href: "/products" },
      { name: "Custom Software", href: "/solutions/digital-solutions" },
      { name: "Enterprise Hardware", href: "/solutions/it-solutions" },
    ],
    ctaLabel: "Discuss Agribusiness Systems",
  },
];

// ─── Page Component ──────────────────────────────────────────────

export default function IndustriesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
  ]);

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Industries" }]} />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-6 pb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <h1 className="text-xs font-mono uppercase tracking-[0.2em] text-[#641F2A]">
              <Badge variant="burgundy" dot>
                Technology Solutions for Businesses
              </Badge>
            </h1>
          </div>

          <DisplayHeading as="h2" gradient className="max-w-4xl mx-auto mb-6">
            Technology Solutions Built for Diverse Industry Environments
          </DisplayHeading>

          <Text variant="lead" className="max-w-3xl mx-auto mb-10">
            SOMYA INNOVATIONS delivers practical capabilities across IT infrastructure, applied AI, custom software platforms,
            and enterprise technology products configured around the specific operating realities of your sector.
          </Text>

          {/* Quick-Jump Industry Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-10">
            {INDUSTRIES_DATA.map((ind) => {
              const Icon = ind.icon;
              return (
                <a
                  key={ind.id}
                  href={`#${ind.id}`}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900/60 border border-white/[0.08] hover:border-[#641F2A]/60 hover:text-white hover-elevate transition-all duration-200 flex items-center gap-2"
                >
                  <Icon className="w-3.5 h-3.5 text-[#68704A]" />
                  <span>{ind.title}</span>
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink
              href="/request-quote"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Discuss Your Requirement
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="md">
              Speak with a Solutions Consultant
            </ButtonLink>
          </div>
        </div>

        {/* ─── TRANSPARENT CAPABILITY NOTICE ──────────────────────────── */}
        <div className="mb-14 p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] flex items-start gap-4">
          <Compass className="w-5 h-5 text-[#68704A] mt-0.5 shrink-0" />
          <div className="text-xs text-zinc-400 leading-relaxed">
            <span className="font-semibold text-zinc-200 block mb-1">
              Sector Application Overview
            </span>
            The operational environments detailed below demonstrate how our modular technology disciplines apply to specific sector challenges.
            We evaluate each project based on its unique physical layout, transaction load, and regulatory standards, providing transparent engineering proposals.
          </div>
        </div>

        {/* ─── 10 INDUSTRY SECTIONS ────────────────────────────────────── */}
        <div className="space-y-12">
          {INDUSTRIES_DATA.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <section
                key={ind.id}
                id={ind.id}
                className="p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 hover-elevate scroll-mt-20 group"
              >
                {/* Industry Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#F1EBDD] group-hover:scale-105 group-hover:bg-[#641F2A]/25 transition-all">
                      <Icon className="w-7 h-7 text-[#641F2A]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-[#68704A] font-semibold uppercase tracking-wider">
                          Sector 0{index + 1}
                        </span>
                        <Badge variant="default" size="sm">
                          {ind.badge}
                        </Badge>
                      </div>
                      <H2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {ind.title}
                      </H2>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <ButtonLink
                      href={`/request-quote?industry=${encodeURIComponent(ind.title)}`}
                      variant="secondary"
                      size="sm"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {ind.ctaLabel}
                    </ButtonLink>
                  </div>
                </div>

                {/* Environment Narrative */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-8 max-w-4xl">
                  {ind.environmentOverview}
                </p>

                {/* 3-Column Breakdown: Challenges, Potential Solutions, Relevant Services */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Column 1: Common Technology Challenges */}
                  <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Common Technology Challenges</span>
                    </div>
                    <ul className="space-y-3 pt-2">
                      {ind.challenges.map((chal) => (
                        <li key={chal} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                          <span>{chal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Potential SOMYA Solutions */}
                  <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#68704A] uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4 text-[#68704A] shrink-0" />
                      <span>Potential SOMYA Solutions</span>
                    </div>
                    <ul className="space-y-3 pt-2">
                      {ind.solutions.map((sol) => (
                        <li key={sol} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: Relevant Services & Products */}
                  <div className="lg:col-span-3 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-xs font-semibold text-[#E8DFCF] uppercase tracking-wider block mb-3">
                        Relevant Capabilities
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {ind.relevantServices.map((srv) => (
                          <Link
                            key={srv.name}
                            href={srv.href}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-800/60 border border-zinc-700/60 hover:text-white hover:border-[#641F2A]/60 hover:bg-[#641F2A]/20 transition-all"
                          >
                            {srv.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06]">
                      <Link
                        href={`/request-quote?industry=${encodeURIComponent(ind.title)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#641F2A] hover:text-[#E8DFCF] transition-colors"
                      >
                        <span>Inquire for {ind.title}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ─── FINAL CALL TO ACTION ────────────────────────────────────── */}
        <section className="mt-20 pt-16 border-t border-white/[0.08]">
          <div className="relative rounded-3xl overflow-hidden border border-[#2A2A26] bg-[#161614] p-8 sm:p-14 text-center shadow-2xl">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="burgundy" dot className="mb-4">
                Tailored Engagement
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#F1EBDD] tracking-tight mb-4">
                Discuss Your Requirement
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/70 leading-relaxed mb-8 font-sans">
                Every sector operates under specific workflow constraints, data compliance mandates, and equipment budgets.
                Connect with our solutions engineers to review your operational environment and receive an itemized proposal.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Discuss Your Requirement
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Schedule Technical Discovery
                </ButtonLink>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2A2A26] flex flex-wrap items-center justify-center gap-6 text-xs text-[#F1EBDD]/50 font-mono">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#641F2A]" />
                  Verified Engineering
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#68704A]" />
                  Transparent Pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F1EBDD]/60" />
                  Direct Technical Specialists
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
