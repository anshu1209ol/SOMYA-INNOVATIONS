import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Badge,
  SectionHeading,
  DisplayHeading,
  EditorialHeading,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import {
  Cpu,
  Server,
  Globe,
  Terminal,
  Lightbulb,
  ShieldCheck,
  Maximize2,
  ArrowRight,
  ClipboardList,
  Search,
  PenTool,
  Truck,
  LifeBuoy,
  Briefcase,
  Rocket,
  Landmark,
  Users2,
  Compass,
} from "lucide-react";
import { createMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About SOMYA INNOVATIONS | Technology Solutions Company",
  description:
    "Learn about SOMYA INNOVATIONS, a technology solutions company focused on practical AI, IT infrastructure and digital solutions for businesses.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#E8DFCF] text-[#11110F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "About" }]} />

        {/* ─── 1. HERO SECTION ────────────────────────────────────────── */}
        <div className="relative pt-6 pb-20 lg:pb-28 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <h1 className="text-xs font-mono uppercase tracking-[0.2em] text-[#641F2A]">
              <Badge variant="burgundy" dot>
                About SOMYA INNOVATIONS
              </Badge>
            </h1>
          </div>

          <DisplayHeading as="h2" className="max-w-4xl mx-auto mb-6 text-[#11110F]">
            Technology with a{" "}
            <EditorialHeading italic className="text-[#641F2A]">
              business-first approach.
            </EditorialHeading>
          </DisplayHeading>

          <Text variant="lead" className="max-w-3xl mx-auto mb-8 text-[#11110F]/80">
            SOMYA INNOVATIONS is an emerging technology and business solutions enterprise established
            to deliver practical, scalable, and commercially grounded technical capabilities.
          </Text>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/ai-solutions" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Explore Capabilities
            </ButtonLink>
            <ButtonLink href="/request-quote" variant="secondary-dark" size="md">
              Request a Quote
            </ButtonLink>
          </div>
        </div>

        {/* ─── 2. COMPANY OVERVIEW ────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-t border-black/[0.1]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="olive" dot>
                Company Overview
              </Badge>
              <H2 className="text-3xl sm:text-4xl font-bold text-[#11110F] tracking-tight">
                An Emerging Technology & Enterprise Solutions Enterprise
              </H2>
              <Text className="text-base text-[#11110F]/80 leading-relaxed">
                SOMYA INNOVATIONS was established to address a persistent gap in the enterprise market:
                the divide between sophisticated technological capabilities and pragmatic commercial execution.
              </Text>
              <Text className="text-base text-[#11110F]/80 leading-relaxed">
                We organize our engineering and operational practices into four dedicated pillars:
              </Text>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "01 AI & Automation",
                  "02 IT Solutions & Infrastructure",
                  "03 Digital Platforms & Custom Software",
                  "04 Technology Products & Hardware",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-[#11110F]/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#641F2A] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Text className="text-sm text-[#11110F]/70 leading-relaxed pt-2">
                We measure our success not by the volume of abstract code or vanity complexity, but by the tangible efficiency,
                operational resilience, and commercial return our systems bring to modern business operations.
              </Text>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] shadow-lg relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#11110F]">Our Foundational Principle</h4>
                      <p className="text-xs text-[#11110F]/60 font-mono">Pragmatic engineering over vanity technology</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#11110F]/80 leading-relaxed">
                    Modern businesses require technology partners that understand budget constraints, operational timelines,
                    and user adoption friction. SOMYA INNOVATIONS designs systems that solve immediate operational needs while
                    remaining architecturally sound as corporate operations expand.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/[0.08] text-xs font-mono">
                    <div>
                      <span className="text-[#11110F]/50 block">DELIVERY FOCUS</span>
                      <span className="text-[#11110F] font-bold">B2B & Enterprise</span>
                    </div>
                    <div>
                      <span className="text-[#11110F]/50 block">ARCHITECTURE TYPE</span>
                      <span className="text-[#11110F] font-bold">Modular & Resilient</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. FOUR BUSINESS DIVISIONS ─────────────────────────────── */}
        <section className="py-20 sm:py-28 border-t border-black/[0.1]">
          <SectionHeading
            badge="Four Business Areas"
            badgeVariant="burgundy"
            theme="light"
            title="Our Dedicated Divisions"
            subtitle="Four synchronized capabilities engineered to support each tier of enterprise computing."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Division 1: AI & Automation */}
            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] group-hover:scale-105 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#641F2A] bg-white px-2.5 py-1 rounded border border-black/[0.06]">
                  Division 01
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                AI & Automation
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                Developing applied artificial intelligence, computer vision applications, and autonomous process
                automation pipelines. We transform high-friction manual routines into streamlined, event-driven data workflows.
              </p>
              <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-[#11110F]/60">Machine Learning • Vision • Automation</span>
                <Link
                  href="/ai-solutions"
                  className="text-xs font-bold uppercase tracking-wider text-[#641F2A] hover:text-[#45151D] inline-flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Division 2: IT Solutions */}
            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#68704A]/15 border border-[#68704A]/25 flex items-center justify-center text-[#68704A] group-hover:scale-105 transition-transform">
                  <Server className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#68704A] bg-white px-2.5 py-1 rounded border border-black/[0.06]">
                  Division 02
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                IT Solutions
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                Designing, deploying, and managing mission-critical IT infrastructure. Our capabilities encompass
                structured networking, cybersecurity defenses, server hardware, and SLA-governed technical support.
              </p>
              <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-[#11110F]/60">Hardware • Networks • Cyber Defense</span>
                <Link
                  href="/it-solutions"
                  className="text-xs font-bold uppercase tracking-wider text-[#68704A] hover:text-[#4D5437] inline-flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Division 3: Digital Solutions */}
            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#641F2A] bg-white px-2.5 py-1 rounded border border-black/[0.06]">
                  Division 03
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                Digital Solutions
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                Engineering bespoke web applications, enterprise portals, API backends, and customized software systems
                that provide intuitive user interfaces and reliable data synchronization across departments.
              </p>
              <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-[#11110F]/60">Web Platforms • ERP • Cloud Apps</span>
                <Link
                  href="/digital-solutions"
                  className="text-xs font-bold uppercase tracking-wider text-[#641F2A] hover:text-[#45151D] inline-flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Division 4: Technology Products */}
            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#68704A]/15 border border-[#68704A]/25 flex items-center justify-center text-[#68704A] group-hover:scale-105 transition-transform">
                  <Terminal className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#68704A] bg-white px-2.5 py-1 rounded border border-black/[0.06]">
                  Division 04
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                Technology Products
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                Curated enterprise product catalogue supporting full deployment lifecycles: verified workstations,
                rack servers, high-throughput network switches, and security surveillance kits.
              </p>
              <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-[#11110F]/60">Workstations • Servers • Networking</span>
                <Link
                  href="/products"
                  className="text-xs font-bold uppercase tracking-wider text-[#68704A] hover:text-[#4D5437] inline-flex items-center gap-1"
                >
                  <span>Browse catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. THREE CORE PRINCIPLES ───────────────────────────────── */}
        <section className="py-20 sm:py-28 border-t border-black/[0.1]">
          <SectionHeading
            badge="Values & Principles"
            badgeVariant="burgundy"
            theme="light"
            title="Business Philosophy"
            subtitle="The three non-negotiable standards that govern how we engineer systems and manage business relationships."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate">
              <div className="w-12 h-12 rounded-xl bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#641F2A] font-bold block mb-2">01 / DISCIPLINE</span>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                Pragmatic Engineering
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed">
                Modern technology and practical ideas. We adopt state-of-the-art advances — such as applied neural models
                and containerized microservices — only when they solve tangible business challenges.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate">
              <div className="w-12 h-12 rounded-xl bg-[#68704A]/15 border border-[#68704A]/25 flex items-center justify-center text-[#68704A] mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#68704A] font-bold block mb-2">02 / ACCOUNTABILITY</span>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                Commercial Alignment
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed">
                Solutions designed around real commercial requirements. We prioritize system uptime, dependable component provenance,
                uncompromising security protocols, and predictable financial return.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate">
              <div className="w-12 h-12 rounded-xl bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] mb-6">
                <Maximize2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#641F2A] font-bold block mb-2">03 / LONGEVITY</span>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                Operational Longevity
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed">
                Built to grow alongside changing customer needs. We architect infrastructure and software with modular elasticity,
                preventing costly rewrites or vendor lock-in as transaction volumes increase.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. METHODOLOGY ─────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 border-t border-black/[0.1]">
          <SectionHeading
            badge="Methodology"
            badgeVariant="olive"
            theme="light"
            title="How We Approach Problems"
            subtitle="A disciplined five-step progression from initial discovery to long-term lifecycle support."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                step: "01",
                phase: "Requirement",
                desc: "Active listening to understand operational constraints, performance bottlenecks, and business outcomes.",
                icon: ClipboardList,
              },
              {
                step: "02",
                phase: "Analysis",
                desc: "Rigorous technical assessment, feasibility evaluation, hardware compatibility, and risk auditing.",
                icon: Search,
              },
              {
                step: "03",
                phase: "Solution Design",
                desc: "Architectural blueprinting, security specifications, component selection, and deployment roadmapping.",
                icon: PenTool,
              },
              {
                step: "04",
                phase: "Implementation",
                desc: "Precision engineering, hardware delivery, automated configuration testing, and controlled rollout.",
                icon: Truck,
              },
              {
                step: "05",
                phase: "Support",
                desc: "Lifecycle maintenance, incident response, proactive health monitoring, and system optimization.",
                icon: LifeBuoy,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate transition-all duration-300 relative flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-mono font-bold text-black/20 group-hover:text-[#641F2A]/40 transition-colors">
                        {item.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white border border-black/[0.08] flex items-center justify-center text-[#11110F]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-[#11110F] mb-2">{item.phase}</h4>
                    <p className="text-xs text-[#11110F]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 6. WHO WE SERVE ────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 border-t border-black/[0.1]">
          <SectionHeading
            badge="Client Profiles"
            badgeVariant="burgundy"
            theme="light"
            title="Who We Serve"
            subtitle="Providing technology infrastructure, software solutions, and product catalogues across key segments."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Enterprises",
                desc: "Established companies seeking to modernize IT infrastructure, implement AI automation, and ensure operational continuity.",
                icon: Briefcase,
              },
              {
                title: "Growth Companies",
                desc: "Agile ventures requiring scalable cloud setups, rapid technical prototyping, and cost-effective digital foundations.",
                icon: Rocket,
              },
              {
                title: "Institutions",
                desc: "Healthcare, educational, and administrative entities requiring robust local networks, computing labs, and compliance.",
                icon: Landmark,
              },
              {
                title: "Organizations",
                desc: "Commercial associations and professional practices needing customized digital platforms, database systems, and managed IT.",
                icon: Users2,
              },
            ].map((segment) => {
              const Icon = segment.icon;
              return (
                <div
                  key={segment.title}
                  className="p-7 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-[#641F2A] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#11110F] mb-2">{segment.title}</h4>
                  <p className="text-xs text-[#11110F]/70 leading-relaxed">{segment.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 7. FINAL CTA ───────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-t border-black/[0.1]">
          <div className="relative rounded-3xl overflow-hidden bg-[#11110F] text-[#F1EBDD] p-8 sm:p-14 text-center shadow-2xl border border-white/[0.08]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="burgundy" dot className="mb-4">
                Collaborate with SOMYA
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F1EBDD] tracking-tight mb-4">
                Ready to Discuss Your Technology Objectives?
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/75 leading-relaxed mb-8">
                Connect with our solutions team to explore custom IT infrastructure, AI automation, digital applications,
                or technology products tailored to your business.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request a Quote
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="md"
                >
                  Contact Us
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
