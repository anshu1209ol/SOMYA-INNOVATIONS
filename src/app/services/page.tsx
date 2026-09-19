import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Badge,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import {
  ArrowRight,
  CheckCircle,
  // Section 1: AI
  Sparkles,
  Bot,
  Eye,
  BrainCircuit,
  BarChart3,
  MessageSquareCode,
  FileText,
  Workflow,
  // Section 2: IT
  Laptop,
  Cpu,
  Network,
  Download,
  Server,
  Printer,
  Video,
  Headphones,
  Wrench,
  // Section 3: Digital
  Globe,
  Layout,
  LayoutDashboard,
  Code2,
  Share2,
  Database,
  Cloud,
  // Section 4: Technology Products
  HardDrive,
  Monitor,
  ShieldCheck,
  Package,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Technology Solutions & Capabilities",
  description:
    "Explore comprehensive technology solutions across AI & Automation, IT Solutions, Digital Solutions, and Technology Products engineered with precision.",
  path: "/services",
});

// ─── Service Divisions Data ──────────────────────────────────────

const AI_SERVICES = [
  {
    title: "AI Application Development",
    description:
      "Engineering bespoke web and software applications integrated with generative AI, domain-tuned models, and intelligent automated workflows.",
    icon: Sparkles,
    features: [
      "Custom LLM & Agentic Application Stacks",
      "Retrieval-Augmented Generation (RAG) Systems",
      "Domain-Specific Knowledge Base Integration",
      "Secure Enterprise Model Gateways",
    ],
  },
  {
    title: "Workflow Automation",
    description:
      "Event-driven intelligent automation pipelines that eliminate manual operational bottlenecks and execute complex decision matrices with precision.",
    icon: Bot,
    features: [
      "Autonomous Decision-Making Pipelines",
      "Event-Driven Cognitive Workflows",
      "Intelligent Human-in-the-Loop Escalation",
      "Cross-System Task Orchestration",
    ],
  },
  {
    title: "Computer Vision Systems",
    description:
      "High-precision visual recognition models for manufacturing defect inspection, real-time spatial analytics, and optical scanning.",
    icon: Eye,
    features: [
      "Real-Time Video Stream Analytics",
      "Industrial Automated Defect Detection",
      "Object Tracking & Spatial Counting",
      "Edge Hardware Vision Deployment",
    ],
  },
  {
    title: "Machine Learning Solutions",
    description:
      "Supervised and unsupervised learning models tailored to commercial business challenges, predictive forecasting, and anomaly detection.",
    icon: BrainCircuit,
    features: [
      "Predictive Trend & Demand Forecasting",
      "Anomaly & Deviation Detection",
      "Customer Segmentation & Scoring Engines",
      "Continuous Model Retraining Pipelines",
    ],
  },
  {
    title: "Data Analytics & Telemetry",
    description:
      "Scalable data telemetry pipelines, enterprise data warehousing, KPI extraction, and interactive executive dashboards.",
    icon: BarChart3,
    features: [
      "End-to-End Data Pipeline Architecture",
      "Real-Time Operational Telemetry",
      "Interactive Executive BI Dashboards",
      "Statistical Modeling & Reporting",
    ],
  },
  {
    title: "Intelligent Conversational Agents",
    description:
      "Context-aware 24/7 conversational agents engineered for internal knowledge lookup, technical documentation, and automated customer assistance.",
    icon: MessageSquareCode,
    features: [
      "Multi-Channel Conversational Deployment",
      "Internal SOP & Policy Query Agents",
      "CRM & Ticketing System Interconnect",
      "Deterministic Safety Guardrails",
    ],
  },
];

const IT_SERVICES = [
  {
    title: "Workstation & Fleet Deployment",
    description:
      "Enterprise workstation provisioning, commercial laptop deployments, hardware diagnostics, component upgrades, and comprehensive fleet lifecycle support.",
    icon: Laptop,
    features: [
      "Custom Workstation Configurations",
      "Enterprise Laptop Fleet Deployment",
      "Component Diagnostics & Upgrades",
      "Lifecycle Maintenance & OS Staging",
    ],
  },
  {
    title: "Enterprise Networking",
    description:
      "High-throughput enterprise network design, structured cabling, managed L2/L3 switching, gateway routing, and resilient Wi-Fi coverage.",
    icon: Network,
    features: [
      "Structured Cabling & Server Racks",
      "Managed Switches, Routers & Gateways",
      "High-Density Wi-Fi Deployment",
      "VLAN Segmentation & Traffic Shaping",
    ],
  },
  {
    title: "Infrastructure & Server Solutions",
    description:
      "Bare-metal server deployments, virtualization hypervisors (Proxmox/ESXi), network-attached storage, automated RAID arrays, and localized private clouds.",
    icon: Server,
    features: [
      "On-Premise & Hybrid Server Architecture",
      "Virtualization & Container Clusters",
      "SAN/NAS Storage Arrays & High Availability",
      "Server Room Power & Thermal Planning",
    ],
  },
  {
    title: "Network Security & Firewalls",
    description:
      "Hardware firewall implementation, unified threat management (UTM), intrusion prevention, encrypted site-to-site VPNs, and zero-trust access control.",
    icon: ShieldCheck,
    features: [
      "Next-Gen Firewall (NGFW) Setup",
      "Site-to-Site & Remote Worker VPN Tunnels",
      "Intrusion Detection & Prevention (IDS/IPS)",
      "Zero-Trust Network Access (ZTNA)",
    ],
  },
  {
    title: "Software Deployment & Licensing",
    description:
      "Operating system imaging, commercial software deployment, license lifecycle compliance, identity management, and active directory integration.",
    icon: Download,
    features: [
      "Automated OS Imaging & Provisioning",
      "Commercial Software Licensing Compliance",
      "Active Directory & Single Sign-On (SSO)",
      "Endpoint Security Agent Distribution",
    ],
  },
  {
    title: "Maintenance & SLA Support",
    description:
      "Scheduled preventative hardware maintenance, rapid on-site incident response, hardware replacement dispatch, and continuous health auditing.",
    icon: Wrench,
    features: [
      "Structured Preventative Maintenance",
      "Rapid On-Site Incident Resolution",
      "Firmware & Security Patch Audits",
      "Clear Service Level Agreements (SLAs)",
    ],
  },
];

const DIGITAL_SERVICES = [
  {
    title: "Modern Web Applications",
    description:
      "Architecting lightning-fast, secure, and search-optimized web applications with Next.js, React, TypeScript, and resilient API backends.",
    icon: Globe,
    features: [
      "Server-Side Rendered (SSR) Architecture",
      "Ultra-Fast Core Web Vitals Performance",
      "Responsive Layouts Across All Devices",
      "Headless CMS & Commerce Integration",
    ],
  },
  {
    title: "Executive Business Dashboards",
    description:
      "Custom operational command centers and visual metric dashboards providing leadership teams with real-time insight into performance and operations.",
    icon: LayoutDashboard,
    features: [
      "Live Operational Metrics & Telemetry",
      "Custom Export Engines (CSV, PDF, Excel)",
      "Interactive Charting & Metric Filtering",
      "Role-Specific Data View Permissions",
    ],
  },
  {
    title: "Bespoke Enterprise Software",
    description:
      "Purpose-engineered proprietary software and internal tools developed specifically around your business rules, eliminating off-the-shelf software compromises.",
    icon: Code2,
    features: [
      "Tailored Business Logic & Architectures",
      "Clean, Documented & Scalable Codebases",
      "Frictionless Integration with Legacy Stacks",
      "Complete Ownership & Source Code Handover",
    ],
  },
  {
    title: "System Integration & APIs",
    description:
      "Unifying internal software with third-party payment gateways, logistics aggregators, ERP backbones, and external webhooks through secure middleware.",
    icon: Share2,
    features: [
      "RESTful & GraphQL API Architectures",
      "Automated Webhook Handlers & Consumers",
      "Token-Based Authentication & Rate Limiting",
      "Fault-Tolerant Retry & Dead-Letter Queues",
    ],
  },
  {
    title: "Database Engineering",
    description:
      "Relational and NoSQL database architecture, query optimization, high-availability clusters, database migrations, and automated disaster recovery.",
    icon: Database,
    features: [
      "PostgreSQL, MySQL & NoSQL Clusters",
      "Query Profiling & Index Optimization",
      "Automated Point-in-Time Recovery",
      "At-Rest & In-Transit Data Encryption",
    ],
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Cloud architecture, serverless infrastructure, containerization (Docker/Kubernetes), automated CI/CD deployment pipelines, and cloud cost optimization.",
    icon: Cloud,
    features: [
      "Cloud Architecture on AWS & Azure",
      "Docker Containerization & Microservices",
      "Automated CI/CD Deployment Pipelines",
      "Resource Auditing & Cost Governance",
    ],
  },
];

const TECHNOLOGY_PRODUCTS = [
  {
    title: "Enterprise Computing Systems",
    description:
      "High-availability rackmount servers, compute clusters, precision workstations, and storage solutions tailored for continuous production workloads.",
    icon: Server,
    features: [
      "Custom Rackmount Server Configurations",
      "High-Memory Compute & Virtualization Hosts",
      "Enterprise NVMe Storage Arrays",
      "OEM Factory Support & Hardware Validation",
    ],
  },
  {
    title: "Network Infrastructure Hardware",
    description:
      "Managed L2/L3 core switches, high-density optical routing hardware, wireless controllers, and structured interconnect patch equipment.",
    icon: Network,
    features: [
      "Enterprise Managed Switches & Routers",
      "Optical Fiber Transceivers & SFP Modules",
      "High-Throughput Wireless Access Points",
      "Rack Enclosures & Thermal Management",
    ],
  },
  {
    title: "Commercial Workstations & Displays",
    description:
      "Commercial-grade multi-display workstations, color-calibrated monitors, ergonomic conference room setups, and high-duty office computing units.",
    icon: Monitor,
    features: [
      "Multi-Monitor Engineering Workstations",
      "High-Reliability Small-Form-Factor Desktops",
      "Commercial Presentation & Meeting Displays",
      "Docking Stations & Power Redundancy Units",
    ],
  },
  {
    title: "Software Platforms & Licensing",
    description:
      "Enterprise operating systems, virtualization licenses, database engines, endpoint protection software, and productivity suite licensing.",
    icon: Package,
    features: [
      "Enterprise Operating System Licenses",
      "Virtualization & Hypervisor Software",
      "Centralized Endpoint Security Solutions",
      "License Lifecycle Tracking & Compliance",
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="bg-[#11110F] text-[#F1EBDD] min-h-screen py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Services" }]} />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-8 pb-16 lg:pb-24 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="burgundy" dot>
              Engineering & Solutions
            </Badge>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F1EBDD] tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
            Technology Solutions Built Around Your Needs
          </h1>

          <p className="text-base sm:text-lg text-[#F1EBDD]/70 max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
            SOMYA INNOVATIONS delivers practical, business-first technical capabilities across four dedicated pillars:
            applied AI automation, enterprise IT infrastructure, modern digital platforms, and verified technology product solutions.
          </p>

          {/* Quick-Jump Pillar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10 text-left">
            <a
              href="#ai-services"
              className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all duration-300 group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#F1EBDD] group-hover:scale-105 transition-transform">
                  <Bot className="w-5 h-5 text-[#641F2A]" />
                </div>
                <span className="text-[11px] font-mono text-[#641F2A] font-semibold uppercase tracking-wider">
                  01
                </span>
              </div>
              <h3 className="text-base font-serif text-[#F1EBDD] group-hover:text-[#E8DFCF] transition-colors mb-1">
                AI & Automation
              </h3>
              <p className="text-xs text-[#F1EBDD]/60 line-clamp-2 font-sans">
                Applied AI models, computer vision, conversational systems & automated pipelines.
              </p>
            </a>

            <a
              href="#it-services"
              className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#68704A]/60 transition-all duration-300 group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#68704A]/15 border border-[#68704A]/30 flex items-center justify-center text-[#F1EBDD] group-hover:scale-105 transition-transform">
                  <Server className="w-5 h-5 text-[#68704A]" />
                </div>
                <span className="text-[11px] font-mono text-[#68704A] font-semibold uppercase tracking-wider">
                  02
                </span>
              </div>
              <h3 className="text-base font-serif text-[#F1EBDD] group-hover:text-[#E8DFCF] transition-colors mb-1">
                IT Solutions
              </h3>
              <p className="text-xs text-[#F1EBDD]/60 line-clamp-2 font-sans">
                Infrastructure, hardware setup, networking, security & technical maintenance.
              </p>
            </a>

            <a
              href="#digital-services"
              className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all duration-300 group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#F1EBDD] group-hover:scale-105 transition-transform">
                  <Globe className="w-5 h-5 text-[#641F2A]" />
                </div>
                <span className="text-[11px] font-mono text-[#641F2A] font-semibold uppercase tracking-wider">
                  03
                </span>
              </div>
              <h3 className="text-base font-serif text-[#F1EBDD] group-hover:text-[#E8DFCF] transition-colors mb-1">
                Digital Solutions
              </h3>
              <p className="text-xs text-[#F1EBDD]/60 line-clamp-2 font-sans">
                Websites, web apps, business dashboards, custom software & cloud architecture.
              </p>
            </a>

            <a
              href="#technology-products"
              className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#68704A]/60 transition-all duration-300 group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#68704A]/15 border border-[#68704A]/30 flex items-center justify-center text-[#F1EBDD] group-hover:scale-105 transition-transform">
                  <HardDrive className="w-5 h-5 text-[#68704A]" />
                </div>
                <span className="text-[11px] font-mono text-[#68704A] font-semibold uppercase tracking-wider">
                  04
                </span>
              </div>
              <h3 className="text-base font-serif text-[#F1EBDD] group-hover:text-[#E8DFCF] transition-colors mb-1">
                Technology Products
              </h3>
              <p className="text-xs text-[#F1EBDD]/60 line-clamp-2 font-sans">
                Enterprise servers, networking hardware, workstations & commercial licensing.
              </p>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/request-quote" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Request a Quote
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="md">
              Speak with a Specialist
            </ButtonLink>
          </div>
        </div>

        {/* ─── SECTION 1: AI & AUTOMATION ──────────────────────────────── */}
        <section id="ai-services" className="py-16 sm:py-24 border-t border-[#2A2A26] scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="burgundy" dot>
                  Section 01 • AI & Automation
                </Badge>
              </div>
              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F1EBDD] tracking-tight">
                AI & Automation Solutions
              </H2>
              <Text className="mt-3 max-w-2xl text-base text-[#F1EBDD]/70 font-sans">
                Pragmatic machine intelligence, computer vision, conversational systems, and workflow automation
                built to deliver measurable business efficiency.
              </Text>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href="/solutions/ai-automation"
                variant="secondary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Explore AI Division
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/50 transition-all duration-300"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#641F2A]/15 text-[#F1EBDD] border border-[#641F2A]/30 mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-[#641F2A]" />
                    </div>
                    <h3 className="text-lg font-serif text-[#F1EBDD] tracking-tight mb-2.5 group-hover:text-[#E8DFCF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#F1EBDD]/60 leading-relaxed mb-6 font-sans">
                      {service.description}
                    </p>
                    <ul className="space-y-2.5 mb-6 border-t border-[#2A2A26] pt-4 font-sans">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#F1EBDD]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#641F2A] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#2A2A26]">
                    <Link
                      href={`/request-quote?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#641F2A] hover:text-[#E8DFCF] transition-colors font-sans"
                    >
                      <span>Inquire about this capability</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 2: IT SOLUTIONS ─────────────────────────────────── */}
        <section id="it-services" className="py-16 sm:py-24 border-t border-[#2A2A26] scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="olive" dot>
                  Section 02 • IT Solutions
                </Badge>
              </div>
              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F1EBDD] tracking-tight">
                IT Solutions & Infrastructure
              </H2>
              <Text className="mt-3 max-w-2xl text-base text-[#F1EBDD]/70 font-sans">
                Turnkey workplace compute platforms, structured networks, server infrastructure,
                network defense, and maintenance agreements engineered for high uptime.
              </Text>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href="/solutions/it-solutions"
                variant="secondary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Explore IT Division
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IT_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#68704A]/50 transition-all duration-300"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#68704A]/15 text-[#F1EBDD] border border-[#68704A]/30 mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-[#68704A]" />
                    </div>
                    <h3 className="text-lg font-serif text-[#F1EBDD] tracking-tight mb-2.5 group-hover:text-[#E8DFCF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#F1EBDD]/60 leading-relaxed mb-6 font-sans">
                      {service.description}
                    </p>
                    <ul className="space-y-2.5 mb-6 border-t border-[#2A2A26] pt-4 font-sans">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#F1EBDD]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#2A2A26]">
                    <Link
                      href={`/request-quote?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#68704A] hover:text-[#E8DFCF] transition-colors font-sans"
                    >
                      <span>Inquire about this capability</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 3: DIGITAL SOLUTIONS ────────────────────────────── */}
        <section id="digital-services" className="py-16 sm:py-24 border-t border-[#2A2A26] scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="burgundy" dot>
                  Section 03 • Digital Solutions
                </Badge>
              </div>
              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F1EBDD] tracking-tight">
                Digital Solutions & Web Systems
              </H2>
              <Text className="mt-3 max-w-2xl text-base text-[#F1EBDD]/70 font-sans">
                Full-stack web engineering, custom operational dashboards, robust APIs,
                database architectures, and scalable cloud deployments.
              </Text>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href="/solutions/digital-solutions"
                variant="secondary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Explore Digital Division
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIGITAL_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/50 transition-all duration-300"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#641F2A]/15 text-[#F1EBDD] border border-[#641F2A]/30 mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-[#641F2A]" />
                    </div>
                    <h3 className="text-lg font-serif text-[#F1EBDD] tracking-tight mb-2.5 group-hover:text-[#E8DFCF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#F1EBDD]/60 leading-relaxed mb-6 font-sans">
                      {service.description}
                    </p>
                    <ul className="space-y-2.5 mb-6 border-t border-[#2A2A26] pt-4 font-sans">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#F1EBDD]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#641F2A] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#2A2A26]">
                    <Link
                      href={`/request-quote?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#641F2A] hover:text-[#E8DFCF] transition-colors font-sans"
                    >
                      <span>Inquire about this capability</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 4: TECHNOLOGY PRODUCTS ──────────────────────────── */}
        <section id="technology-products" className="py-16 sm:py-24 border-t border-[#2A2A26] scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="olive" dot>
                  Section 04 • Technology Products
                </Badge>
              </div>
              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F1EBDD] tracking-tight">
                Technology Products Catalogue
              </H2>
              <Text className="mt-3 max-w-2xl text-base text-[#F1EBDD]/70 font-sans">
                Supporting hardware capabilities, enterprise computing nodes, network infrastructure,
                workstation systems, and authorized commercial software licensing.
              </Text>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href="/products"
                variant="secondary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View Product Catalogue
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {TECHNOLOGY_PRODUCTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#68704A]/50 transition-all duration-300"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#68704A]/15 text-[#F1EBDD] border border-[#68704A]/30 mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-[#68704A]" />
                    </div>
                    <h3 className="text-lg font-serif text-[#F1EBDD] tracking-tight mb-2.5 group-hover:text-[#E8DFCF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#F1EBDD]/60 leading-relaxed mb-6 font-sans">
                      {item.description}
                    </p>
                    <ul className="space-y-2.5 mb-6 border-t border-[#2A2A26] pt-4 font-sans">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#F1EBDD]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#2A2A26]">
                    <Link
                      href={`/request-quote?category=Technology+Products&item=${encodeURIComponent(item.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#68704A] hover:text-[#E8DFCF] transition-colors font-sans"
                    >
                      <span>Inquire regarding specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── FINAL CALL TO ACTION ────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-t border-[#2A2A26]">
          <div className="relative rounded-3xl overflow-hidden border border-[#2A2A26] bg-[#161614] p-8 sm:p-14 text-center shadow-2xl">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="burgundy" dot className="mb-4">
                Let&apos;s Build Together
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#F1EBDD] tracking-tight mb-4">
                Ready to Discuss Your Technology Objectives?
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/70 leading-relaxed mb-8 font-sans">
                Connect with our solutions team to receive an itemized proposal, schedule technical discovery,
                or discuss custom systems engineered to your exact operational requirements.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request a Quote
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Contact Solutions Team
                </ButtonLink>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2A2A26] flex flex-wrap items-center justify-center gap-6 text-xs text-[#F1EBDD]/50 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#641F2A]" />
                  Transparent Proposals
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#68704A]" />
                  Verified Engineering
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
