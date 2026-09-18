import React from "react";
import type { Metadata } from "next";
import {
  Badge,
  DisplayHeading,
  EditorialHeading,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Layout,
  LayoutDashboard,
  Code2,
  Share2,
  Database,
  Cloud,
  Workflow,
  Lightbulb,
  Compass,
  PenTool,
  Code,
  ShieldCheck,
  Rocket,
  LifeBuoy,
  Server,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Digital Solutions | Web Applications, Software & Cloud Systems",
  description:
    "Digital solutions built for modern business. Explore web development, web applications, business dashboards, custom software, API integration, database architectures, and cloud solutions.",
  path: "/digital-solutions",
});

interface DigitalServiceItem {
  id: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  whatWeProvide: string;
  businessUseCases: string[];
  mainDeliverables: string[];
  ctaText: string;
}

const DIGITAL_SERVICES_DATA: DigitalServiceItem[] = [
  {
    id: "website-development",
    title: "Website Development",
    badge: "Web Platforms",
    icon: Globe,
    whatWeProvide:
      "Modern, responsive corporate websites and marketing portals engineered with Next.js and TypeScript, rapid load speeds, semantic SEO, and intuitive brand presentations.",
    businessUseCases: [
      "Corporate brand presence for B2B enterprises and industrial organizations",
      "Product showcase and equipment catalogue websites with quote request forms",
      "Informational portals with integrated content management systems (CMS)",
      "High-converting landing pages tailored to specific service campaigns",
    ],
    mainDeliverables: [
      "Production-ready Next.js/React codebase with full responsive layouts",
      "Semantic HTML5 structure and Core Web Vitals optimization",
      "Headless CMS integration for effortless client content editing",
      "Edge CDN deployment configuration and SSL security enforcement",
    ],
    ctaText: "Discuss Website Project",
  },
  {
    id: "web-applications",
    title: "Web Applications",
    badge: "Full-Stack Platforms",
    icon: Layout,
    whatWeProvide:
      "Scalable single-page and multi-page web applications engineered for high concurrency, robust role-based access control, real-time interactivity, and cross-browser reliability.",
    businessUseCases: [
      "Customer-facing self-service portals and client account managers",
      "Internal departmental administrative and workflow portals",
      "Multi-tenant SaaS products and collaborative operational hubs",
      "Supplier and vendor order tracking extranets",
    ],
    mainDeliverables: [
      "Modular full-stack web application with secure REST/GraphQL backends",
      "Role-Based Access Control (RBAC) and session authentication system",
      "Responsive state-managed frontend UI with real-time feedback",
      "Technical documentation, API schemas, and deployment scripts",
    ],
    ctaText: "Discuss Web Application",
  },
  {
    id: "business-dashboards",
    title: "Business Dashboards",
    badge: "Operational Visibility",
    icon: LayoutDashboard,
    whatWeProvide:
      "Custom business intelligence command centers and operational telemetry dashboards that aggregate complex operational metrics into clear, actionable, real-time visual interfaces.",
    businessUseCases: [
      "Executive overview cockpits tracking departmental KPIs and revenue trends",
      "Warehouse and inventory velocity monitoring displays",
      "Field engineering and customer ticket resolution tracking consoles",
      "Procurement lifecycle and vendor delivery status dashboards",
    ],
    mainDeliverables: [
      "Interactive data visualization interface with custom filters and date pickers",
      "Real-time websocket telemetry or automated scheduled polling feeds",
      "Export engines for automated CSV, Excel, and PDF report generation",
      "Granular permission settings limiting sensitive metric exposure by role",
    ],
    ctaText: "Discuss Business Dashboard",
  },
  {
    id: "custom-software",
    title: "Custom Software",
    badge: "Proprietary Architecture",
    icon: Code2,
    whatWeProvide:
      "Bespoke software systems engineered specifically around your company's proprietary operational rules, eliminating the compromises, bloat, and recurring per-seat fees of generic SaaS.",
    businessUseCases: [
      "Proprietary billing calculation engines and specialized quote estimators",
      "Custom warehouse barcode sorting and inventory management logic",
      "Legacy software modernization and workflow re-platforming",
      "Automated multi-departmental dispatching and task assignment tools",
    ],
    mainDeliverables: [
      "Clean, modular, fully documented source code with 100% intellectual property handover",
      "Secure backend architecture with decoupled microservices or monolith",
      "Comprehensive database schemas and automated data migration routines",
      "Operator user manuals and administrator configuration guidelines",
    ],
    ctaText: "Discuss Custom Software",
  },
  {
    id: "api-integration",
    title: "API Integration",
    badge: "System Interconnect",
    icon: Share2,
    whatWeProvide:
      "Secure middleware and pipeline integrations that connect internal software backbones with payment gateways, logistics carriers, ERP systems, and third-party platforms.",
    businessUseCases: [
      "Connecting digital portals with enterprise ERPs (SAP, Oracle, Tally, Zoho)",
      "Payment gateway integration with automated invoicing reconciliation",
      "Third-party courier and logistics tracking API ingestion",
      "Automated CRM synchronization with customer support ticket pipelines",
    ],
    mainDeliverables: [
      "Standardized API endpoints with token-based authentication and rate limiting",
      "Asynchronous webhook handlers with automated retry and dead-letter queues",
      "Data transformation and payload normalization middleware",
      "Interactive OpenAPI/Swagger documentation and endpoint test suites",
    ],
    ctaText: "Discuss API Integration",
  },
  {
    id: "database-solutions",
    title: "Database Solutions",
    badge: "Data Architecture",
    icon: Database,
    whatWeProvide:
      "Relational and NoSQL database design, schema normalization, query profiling, clustering, high-availability failover architectures, and reliable disaster recovery pipelines.",
    businessUseCases: [
      "High-transaction relational database design (PostgreSQL, MySQL)",
      "Flexible document and cache data stores (MongoDB, Redis)",
      "Database consolidation eliminating duplicate and inconsistent spreadsheets",
      "Zero-downtime database migrations from legacy hosting to cloud clusters",
    ],
    mainDeliverables: [
      "Normalized relational or document database schema blueprints",
      "Optimized query indexing strategies and latency benchmark reports",
      "Automated point-in-time recovery (PITR) and daily backup pipelines",
      "At-rest and in-transit encryption configuration documentation",
    ],
    ctaText: "Discuss Database Solutions",
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    badge: "Cloud Infrastructure",
    icon: Cloud,
    whatWeProvide:
      "Architecture, deployment, and optimization of cloud infrastructure across AWS, Microsoft Azure, and private environments, emphasizing containerization and cost predictability.",
    businessUseCases: [
      "Migrating on-premise servers to scalable cloud virtual machines",
      "Application containerization using Docker and Kubernetes orchestration",
      "Automated CI/CD deployment pipelines for rapid zero-downtime releases",
      "Cloud resource rightsizing to eliminate unneeded infrastructure overhead",
    ],
    mainDeliverables: [
      "Infrastructure-as-Code (IaC) configuration scripts and network topology maps",
      "Multi-environment cloud setup (Development, Staging, Production)",
      "Automated GitHub Actions or CI/CD deployment pipelines",
      "Cloud monitoring, uptime alerting, and disaster recovery runbooks",
    ],
    ctaText: "Discuss Cloud Solutions",
  },
  {
    id: "business-automation",
    title: "Business Automation",
    badge: "Process Optimization",
    icon: Workflow,
    whatWeProvide:
      "End-to-end algorithmic process automation that connects disparate operational silos, orchestrating document routing, data synchronization, and event-driven approvals without human delays.",
    businessUseCases: [
      "Automated client onboarding workflows and digital documentation collection",
      "Multi-step purchase order approvals with automated escalation thresholds",
      "Cross-platform inventory level synchronization across multiple channels",
      "Automated generation and emailing of weekly executive operational digests",
    ],
    mainDeliverables: [
      "Documented process flowcharts comparing baseline vs. automated states",
      "Event-driven automation workflows with error-catching mechanisms",
      "Audit logging consoles showing execution history and system exceptions",
      "Team training sessions and operational handoff documentation",
    ],
    ctaText: "Discuss Business Automation",
  },
];

const JOURNEY_STEPS = [
  {
    step: "01",
    phase: "Idea",
    focus: "Discovery & Objectives",
    description:
      "Discovery sessions to unpack the core business challenge, target users, and desired commercial outcomes.",
    icon: Lightbulb,
  },
  {
    step: "02",
    phase: "Strategy",
    focus: "Roadmap & Architecture",
    description:
      "Defining the technical stack, database schemas, integration boundaries, timelines, and security standards.",
    icon: Compass,
  },
  {
    step: "03",
    phase: "Design",
    focus: "UI/UX & Wireframing",
    description:
      "Crafting intuitive user interfaces, clear interaction flows, and ergonomic layouts tested for user adoption.",
    icon: PenTool,
  },
  {
    step: "04",
    phase: "Development",
    focus: "Clean Code & APIs",
    description:
      "Writing modular, documented codebases across frontend, backend APIs, and database structures.",
    icon: Code,
  },
  {
    step: "05",
    phase: "Testing",
    focus: "QA & Performance Audits",
    description:
      "End-to-end testing, responsive audits, load simulation, cross-device compatibility, and vulnerability scans.",
    icon: ShieldCheck,
  },
  {
    step: "06",
    phase: "Deployment",
    focus: "CI/CD Commissioning",
    description:
      "Zero-downtime deployment to production cloud servers, SSL configuration, CDN edge routing, and live monitoring.",
    icon: Rocket,
  },
  {
    step: "07",
    phase: "Support",
    focus: "Maintenance & Evolution",
    description:
      "SLA-governed health monitoring, database backups, performance tuning, and planned feature expansions.",
    icon: LifeBuoy,
  },
];

export default function DigitalSolutionsPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#E8DFCF] text-[#11110F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Digital Solutions" },
          ]}
        />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-6 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Messaging */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="burgundy" dot>
                  Digital Platforms & Custom Software
                </Badge>
              </div>

              <DisplayHeading className="text-left text-[#11110F]">
                Digital solutions built for{" "}
                <EditorialHeading italic className="text-[#641F2A]">
                  commercial velocity.
                </EditorialHeading>
              </DisplayHeading>

              <Text variant="lead" className="text-[#11110F]/80">
                SOMYA INNOVATIONS engineers modern digital platforms, custom software backbones, interactive business dashboards,
                and cloud infrastructure designed around the exact operational rules of your organization.
              </Text>

              <p className="text-sm text-[#11110F]/70 leading-relaxed">
                We combine modern web frameworks, clean modular architectures, and secure API integrations
                to deliver technology that eliminates administrative friction, scales with business growth, and belongs entirely to you.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ButtonLink
                  href="/request-quote?service=Digital+Solutions"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Digital Project
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary-dark"
                  size="md"
                >
                  Consult an Architect
                </ButtonLink>
              </div>
            </div>

            {/* Right Column: Architectural Visual Container */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl p-6 sm:p-8 bg-[#F1EBDD] border border-black/[0.08] shadow-lg overflow-hidden">
                {/* Tech Stack Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] relative z-10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#641F2A] animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#11110F]">
                      Full-Stack Architecture
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#11110F]/60 bg-white px-2 py-0.5 rounded border border-black/[0.08]">
                    MODULAR / SCALABLE
                  </span>
                </div>

                {/* Architectural Diagram Visual */}
                <div className="space-y-3 relative z-10">
                  {/* Layer 1: Client & Frontend */}
                  <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#641F2A]/10 text-[#641F2A] flex items-center justify-center border border-[#641F2A]/20">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#11110F] block">Frontend Presentation Layer</span>
                        <span className="text-[11px] text-[#11110F]/60">Next.js • React • Responsive UI • PWA</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#641F2A] bg-[#641F2A]/10 px-2 py-0.5 rounded border border-[#641F2A]/20">
                      EDGE CDN
                    </span>
                  </div>

                  <div className="flex justify-center text-[#641F2A] font-bold text-xs">↓</div>

                  {/* Layer 2: API & Application Logic */}
                  <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#68704A]/15 text-[#68704A] flex items-center justify-center border border-[#68704A]/25">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#11110F] block">Application & API Gateway</span>
                        <span className="text-[11px] text-[#11110F]/60">REST • GraphQL • Business Rules • Auth</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#68704A] bg-[#68704A]/10 px-2 py-0.5 rounded border border-[#68704A]/20">
                      SECURE
                    </span>
                  </div>

                  <div className="flex justify-center text-[#68704A] font-bold text-xs">↓</div>

                  {/* Layer 3: Data & Cloud Backbone */}
                  <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#641F2A]/10 text-[#641F2A] flex items-center justify-center border border-[#641F2A]/20">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#11110F] block">Data & Cloud Persistence</span>
                        <span className="text-[11px] text-[#11110F]/60">PostgreSQL • Redis • Automated Backups</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#641F2A] bg-[#641F2A]/10 px-2 py-0.5 rounded border border-[#641F2A]/20">
                      ENCRYPTED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-5 mt-5 border-t border-black/[0.08] text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white border border-black/[0.06]">
                    <span className="text-[#11110F]/50 block text-[10px]">SOURCE CODE</span>
                    <span className="text-[#11110F] font-bold">100% Client Ownership</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-black/[0.06]">
                    <span className="text-[#11110F]/50 block text-[10px]">DEPLOYMENT</span>
                    <span className="text-[#641F2A] font-bold">Automated CI/CD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── VISUAL JOURNEY SECTION ─────────────────────────────────── */}
        <section id="visual-journey" className="py-16 sm:py-24 border-t border-black/[0.1] scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="burgundy" dot className="mb-3">
              Delivery Methodology
            </Badge>
            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#11110F] tracking-tight">
              Our 7-Step Digital Journey
            </H2>
            <Text className="mt-3 text-base text-[#11110F]/70">
              A disciplined, transparent progression from your initial business concept to a scalable, production-ready system.
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JOURNEY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate transition-all duration-300 relative flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-mono font-bold text-black/20 group-hover:text-[#641F2A] transition-colors">
                        {step.step}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-[#641F2A]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#11110F] mb-1">{step.phase}</h3>
                    <p className="text-xs font-semibold text-[#641F2A] mb-2.5">{step.focus}</p>
                    <p className="text-xs text-[#11110F]/70 leading-relaxed">{step.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/[0.08] text-[11px] text-[#11110F]/50 font-mono">
                    Phase 0{idx + 1} of 07
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] text-center text-xs text-[#11110F]/70 font-mono overflow-x-auto">
            <div className="inline-flex items-center gap-2 whitespace-nowrap">
              <span>IDEA</span>
              <span className="text-[#641F2A]">→</span>
              <span>STRATEGY</span>
              <span className="text-[#641F2A]">→</span>
              <span>DESIGN</span>
              <span className="text-[#641F2A]">→</span>
              <span>DEVELOPMENT</span>
              <span className="text-[#641F2A]">→</span>
              <span>TESTING</span>
              <span className="text-[#641F2A]">→</span>
              <span>DEPLOYMENT</span>
              <span className="text-[#641F2A]">→</span>
              <span className="text-[#11110F] font-bold">SUPPORT</span>
            </div>
          </div>
        </section>

        {/* ─── DETAILED SERVICE SECTIONS (8 SERVICES) ──────────────────── */}
        <section id="digital-services-list" className="py-16 sm:py-24 border-t border-black/[0.1]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="olive" dot className="mb-3">
              Comprehensive Service Capabilities
            </Badge>
            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#11110F] tracking-tight">
              Detailed Digital Solutions
            </H2>
            <Text className="mt-3 text-base text-[#11110F]/70">
              Each service is engineered around solving concrete operational requirements, delivering clear deliverables and long-term ownership.
            </Text>
          </div>

          <div className="space-y-8">
            {DIGITAL_SERVICES_DATA.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="p-8 sm:p-10 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate transition-all duration-300 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Column 1: Identification & What We Provide */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-[#641F2A] group-hover:scale-105 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#641F2A] font-bold uppercase tracking-wider block">
                            Service 0{index + 1}
                          </span>
                          <span className="text-xs text-[#11110F]/60 font-medium">
                            {service.badge}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-[#11110F] tracking-tight">
                        {service.title}
                      </h3>

                      <div className="pt-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#11110F]/60 block mb-1.5">
                          What SOMYA Can Provide
                        </span>
                        <p className="text-sm text-[#11110F]/80 leading-relaxed">
                          {service.whatWeProvide}
                        </p>
                      </div>

                      <div className="pt-4">
                        <ButtonLink
                          href={`/request-quote?service=${encodeURIComponent(service.title)}`}
                          variant="secondary-dark"
                          size="sm"
                          icon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          {service.ctaText}
                        </ButtonLink>
                      </div>
                    </div>

                    {/* Column 2: Typical Business Use Cases */}
                    <div className="lg:col-span-4 p-6 rounded-xl bg-white border border-black/[0.08] space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#641F2A]">
                        <span className="w-2 h-2 rounded-full bg-[#641F2A]" />
                        <span>Typical Business Use Cases</span>
                      </div>
                      <ul className="space-y-2.5">
                        {service.businessUseCases.map((useCase) => (
                          <li key={useCase} className="flex items-start gap-2.5 text-xs text-[#11110F]/80 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#641F2A] shrink-0 mt-1.5" />
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3: Main Deliverables */}
                    <div className="lg:col-span-4 p-6 rounded-xl bg-white border border-black/[0.08] space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#68704A]">
                        <span className="w-2 h-2 rounded-full bg-[#68704A]" />
                        <span>Main Deliverables</span>
                      </div>
                      <ul className="space-y-2.5">
                        {service.mainDeliverables.map((deliv) => (
                          <li key={deliv} className="flex items-start gap-2.5 text-xs text-[#11110F]/80 leading-relaxed">
                            <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── FINAL CALL TO ACTION ────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-t border-black/[0.1]">
          <div className="relative rounded-3xl overflow-hidden bg-[#11110F] text-[#F1EBDD] p-8 sm:p-14 text-center shadow-2xl border border-white/[0.08]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="burgundy" dot className="mb-4">
                Digital Engineering Partnership
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F1EBDD] tracking-tight mb-4">
                Ready to Build Your Digital Platform?
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/70 leading-relaxed mb-8">
                Connect with our software architects to review requirements, outline technical specifications,
                and receive a transparent, milestone-based implementation roadmap.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote?service=Digital+Solutions"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Digital Project
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="md"
                >
                  Consult an Architect
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
