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
  Eye,
  BrainCircuit,
  Bot,
  LineChart,
  MessageSquareCode,
  FileText,
  BarChart3,
  Code2,
  Cpu,
  Database,
  Workflow,
  Zap,
} from "lucide-react";
import { createMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "AI & Automation Solutions | SOMYA INNOVATIONS",
  description:
    "SOMYA INNOVATIONS builds practical AI and automation solutions including machine learning, computer vision, analytics, chatbots and intelligent document processing.",
  path: "/solutions/ai-automation",
});

// ─── 8 Dedicated AI Services ──────────────────────────────────────

interface AiServiceDetail {
  id: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  whatItIs: string;
  businessProblem: string;
  applications: string[];
  ctaText: string;
}

const AI_DETAILED_SERVICES: AiServiceDetail[] = [
  {
    id: "computer-vision",
    title: "Computer Vision",
    badge: "Visual Intelligence",
    icon: Eye,
    whatItIs:
      "Automated optical analysis systems that ingest, process, and interpret high-resolution imagery and continuous video feeds, identifying anomalies, objects, and spatial interactions in real time.",
    businessProblem:
      "Manual visual inspection is slow, cost-prohibitive, and vulnerable to human fatigue. Undetected manufacturing flaws, security vulnerabilities in blind spots, and untracked inventory across facilities lead to costly operational losses.",
    applications: [
      "Industrial assembly line defect detection and quality assurance",
      "Real-time perimeter monitoring and unauthorized intrusion detection",
      "Optical character and barcode verification at warehouse transit speeds",
      "Spatial density analysis and personnel safety compliance monitoring",
    ],
    ctaText: "Discuss Computer Vision",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    badge: "Predictive Modeling",
    icon: BrainCircuit,
    whatItIs:
      "Mathematical and statistical learning architectures trained on structured and unstructured organizational data to discern complex trends, classify inputs, and execute probabilistic calculations without rigid static rules.",
    businessProblem:
      "Static heuristics and manual spreadsheets fail to keep pace with dynamic market variables. Companies struggle to anticipate equipment breakdowns, customer churn, and operational deviations before they negatively impact the balance sheet.",
    applications: [
      "Predictive machinery maintenance and component failure prevention",
      "Customer retention scoring and churn risk early warning systems",
      "Credit risk evaluation and transactional fraud pattern recognition",
      "Dynamic pricing models adjusted for operational cost factors",
    ],
    ctaText: "Discuss Machine Learning",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    badge: "Cognitive Pipelines",
    icon: Bot,
    whatItIs:
      "Autonomous, event-driven pipelines that link existing business software, using cognitive logic to evaluate inputs, make deterministic decisions, and complete multi-step workflows without manual handoffs.",
    businessProblem:
      "Knowledge workers spend significant time on repetitive data transfers between disjointed systems. This creates communication bottlenecks, increases error rates during high volumes, and inflates administrative overhead.",
    applications: [
      "Automated order validation, credit check, and ERP staging",
      "Intelligent customer inquiry classification and agent routing",
      "Cross-departmental data reconciliation and automated audit logs",
      "Dynamic schedule optimization and task dispatching",
    ],
    ctaText: "Discuss AI Automation",
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    badge: "Forecasting & Signals",
    icon: LineChart,
    whatItIs:
      "Advanced computational forecasting that correlates historical operating telemetry, seasonal patterns, and external signals to project forward-looking business metrics with quantifiable confidence levels.",
    businessProblem:
      "Relying solely on historical retrospectives results in reactive management. Organizations often face costly stock-outs during demand surges or tied-up capital in excess inventory during sudden slumps.",
    applications: [
      "Supply chain lead time forecasting and stock replenishment planning",
      "Seasonal demand modeling for product lines and raw materials",
      "Staffing allocation planning aligned with expected customer traffic",
      "Cash flow variance prediction and working capital forecasting",
    ],
    ctaText: "Discuss Predictive Analytics",
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    badge: "Conversational Interfaces",
    icon: MessageSquareCode,
    whatItIs:
      "Domain-contextual conversational agents powered by natural language understanding and Retrieval-Augmented Generation (RAG), delivering accurate, hallucination-resistant dialogue from verified business documents.",
    businessProblem:
      "Traditional rule-based chatbots frustrate users with rigid decision trees, while human support teams face burnout from handling repetitive tier-1 queries around the clock.",
    applications: [
      "24/7 client-facing support for order tracking, FAQs, and product specs",
      "Internal employee knowledge assistants for SOPs, IT policies, and HR guidelines",
      "Conversational lead intake and qualification workflows",
      "Multilingual customer interaction without expanded staffing overhead",
    ],
    ctaText: "Discuss AI Chatbots",
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence",
    badge: "Semantic Ingestion",
    icon: FileText,
    whatItIs:
      "Intelligent document parsing combining optical character recognition (OCR) with contextual language models to extract, validate, and normalize structured data from scanned and digital documents.",
    businessProblem:
      "Enterprises receive thousands of invoices, receipts, contracts, and shipping notes in varying formats. Manual entry is slow, expensive, and inevitably causes transcription discrepancies.",
    applications: [
      "Automated invoice and purchase order reconciliation with accounting systems",
      "Legal contract term extraction and clause compliance scanning",
      "Automated logistics bill-of-lading data capture and shipping verification",
      "Form digitization and unstructured record schema conversion",
    ],
    ctaText: "Discuss Document Intelligence",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    badge: "Telemetry & BI",
    icon: BarChart3,
    whatItIs:
      "End-to-end data engineering that aggregates fragmented database records, builds sanitized data lakes, and exposes interactive, high-density visualization dashboards for executive decision-makers.",
    businessProblem:
      "Data silos across departments make it nearly impossible for leadership to gain a single source of truth. Conflicting reports and manual compilation delay critical commercial responses.",
    applications: [
      "Real-time operational KPI command consoles with anomaly alerting",
      "Multi-channel sales performance and margin attribution modeling",
      "Inventory turnover analytics and warehouse operational tracking",
      "Automated compliance and executive board report generation",
    ],
    ctaText: "Discuss Data Analytics",
  },
  {
    id: "custom-ai-applications",
    title: "Custom AI Applications",
    badge: "Tailored Architecture",
    icon: Code2,
    whatItIs:
      "Full-stack software systems engineered from the ground up around proprietary business requirements, pairing customized frontends with specialized local or cloud-hosted AI inference backbones.",
    businessProblem:
      "Off-the-shelf commercial SaaS tools impose rigid operational constraints, charge steep per-seat fees, and pose security concerns regarding the sharing of sensitive corporate data on public networks.",
    applications: [
      "Proprietary operational co-pilots and workflow assistance systems",
      "Internal decision support tools with role-gated data partitions",
      "Edge-deployed localized AI models running on private hardware",
      "Bespoke algorithmic engines for specialized domain operations",
    ],
    ctaText: "Discuss Custom AI",
  },
];

// ─── 5-Step Workflow Progression ───────────────────────────────────

const WORKFLOW_STEPS = [
  {
    number: "01",
    phase: "Business Problem",
    summary: "Identify friction & map commercial ROI",
    description:
      "We begin with the business outcome—analyzing operational bottlenecks, quantifying cost of friction, and defining measurable KPIs.",
    icon: LineChart,
    accent: "text-[#641F2A] border-[#641F2A]/30 bg-[#641F2A]/10",
  },
  {
    number: "02",
    phase: "Data",
    summary: "Audit, clean & structure knowledge",
    description:
      "Raw operational data, documents, and historical logs are structured, validated, and normalized to ensure reliable foundation inputs.",
    icon: Database,
    accent: "text-[#68704A] border-[#68704A]/30 bg-[#68704A]/10",
  },
  {
    number: "03",
    phase: "AI Model",
    summary: "Select, tune & validate models",
    description:
      "We select and configure suitable models—whether vision networks, supervised classifiers, or contextual LLMs—tailored to the task.",
    icon: Cpu,
    accent: "text-[#E8DFCF] border-white/20 bg-white/[0.05]",
  },
  {
    number: "04",
    phase: "Automation",
    summary: "Deploy resilient production pipelines",
    description:
      "Models are integrated into secure API backbones, event triggers, and daily workflows with automated monitoring and safeguards.",
    icon: Workflow,
    accent: "text-[#641F2A] border-[#641F2A]/30 bg-[#641F2A]/10",
  },
  {
    number: "05",
    phase: "Business Result",
    summary: "Measurable ROI & operational speed",
    description:
      "The deployment delivers documented cycle-time reduction, lower administrative costs, zero-error consistency, and scalable capacity.",
    icon: Zap,
    accent: "text-[#68704A] border-[#68704A]/30 bg-[#68704A]/10",
  },
];

export default function AiSolutionsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions/ai-automation" },
    { name: "AI & Automation", url: "/solutions/ai-automation" },
  ]);

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#11110F] text-[#F1EBDD]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Solutions" },
            { label: "AI & Automation" },
          ]}
        />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-6 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Messaging */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2">
                <h1 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8C2B3]">
                  <Badge variant="burgundy" dot>
                    AI & Automation Solutions
                  </Badge>
                </h1>
              </div>

              <DisplayHeading as="h2" className="text-left text-[#F1EBDD]">
                AI that works for{" "}
                <EditorialHeading italic className="text-[#E8DFCF]">
                  your business.
                </EditorialHeading>
              </DisplayHeading>

              <Text variant="lead" className="text-[#F1EBDD]/80">
                At SOMYA INNOVATIONS, we avoid speculative novelty and focus exclusively on practical,
                commercially grounded AI solutions. We help organizations eliminate manual bottlenecks,
                extract value from unstructured data, and automate repetitive operational workflows.
              </Text>

              <p className="text-sm text-[#F1EBDD]/60 leading-relaxed">
                Whether deploying computer vision to inspect manufacturing quality, training predictive models on operational telemetry,
                or configuring document intelligence for your procurement team, our solutions are engineered around measurable business returns.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ButtonLink
                  href="/request-quote?service=AI+%26+Automation"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Discuss an AI Project
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="md"
                >
                  Schedule Discovery Call
                </ButtonLink>
              </div>
            </div>

            {/* Right Column: Architectural Telemetry Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl p-6 sm:p-8 bg-[#1B1B18] border border-white/[0.1] shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-arch-grid-dark opacity-20 pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] relative z-10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#68704A] animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#E8DFCF]">
                      Inference Engine Core
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#F1EBDD]/50 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                    TELEMETRY ACTIVE
                  </span>
                </div>

                {/* Architectural Diagram */}
                <div className="relative h-60 w-full flex items-center justify-center my-2 font-mono text-xs">
                  <div className="w-full space-y-3 relative z-10">
                    <div className="p-3 rounded-lg bg-[#11110F] border border-white/[0.08] flex items-center justify-between">
                      <span className="text-[#F1EBDD]/70">DATA INGESTION</span>
                      <span className="text-[#68704A]">STREAMING // 120 msg/s</span>
                    </div>
                    <div className="flex justify-center text-[#641F2A] font-bold">↓</div>
                    <div className="p-3 rounded-lg bg-[#641F2A]/20 border border-[#641F2A]/40 flex items-center justify-between">
                      <span className="text-[#F1EBDD] font-bold">NEURAL PIPELINE</span>
                      <span className="text-[#F1EBDD]/80">99.4% ACCURACY</span>
                    </div>
                    <div className="flex justify-center text-[#641F2A] font-bold">↓</div>
                    <div className="p-3 rounded-lg bg-[#11110F] border border-white/[0.08] flex items-center justify-between">
                      <span className="text-[#F1EBDD]/70">AUTOMATION OUTPUT</span>
                      <span className="text-[#68704A]">REST API // DISPATCHED</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08] text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[#11110F] border border-white/[0.06]">
                    <span className="text-[#F1EBDD]/50 block text-[10px]">ARCHITECTURE</span>
                    <span className="text-[#F1EBDD] font-semibold">Modular Edge/Cloud</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#11110F] border border-white/[0.06]">
                    <span className="text-[#F1EBDD]/50 block text-[10px]">INTEGRATION</span>
                    <span className="text-[#E8DFCF] font-semibold">Zero Vendor Lock-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── VISUAL WORKFLOW SECTION ─────────────────────────────────── */}
        <section id="workflow-section" className="py-16 sm:py-24 border-t border-white/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="olive" dot className="mb-3">
              Delivery Methodology
            </Badge>
            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F1EBDD] tracking-tight">
              Our 5-Step AI Workflow
            </H2>
            <Text className="mt-3 text-base text-[#F1EBDD]/70">
              How we take an operational challenge from raw problem statement to measurable business result
              through a structured, predictable five-stage progression.
            </Text>
          </div>

          {/* 5-Step Workflow Cards Progression */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {WORKFLOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.phase}
                  className="p-6 rounded-2xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/50 transition-all duration-300 hover-elevate relative flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-mono font-bold text-white/20 group-hover:text-[#641F2A] transition-colors">
                        {step.number}
                      </span>
                      <div className={`w-9 h-9 rounded-xl ${step.accent} flex items-center justify-center border`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#F1EBDD] mb-1.5">{step.phase}</h3>
                    <p className="text-xs font-semibold text-[#E8DFCF]/90 mb-3">{step.summary}</p>
                    <p className="text-xs text-[#F1EBDD]/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-[#1B1B18] border border-white/[0.06] text-center text-xs text-[#F1EBDD]/70 font-mono">
            <span>BUSINESS PROBLEM</span>
            <span className="mx-2 text-[#641F2A]">→</span>
            <span>DATA</span>
            <span className="mx-2 text-[#641F2A]">→</span>
            <span>AI MODEL</span>
            <span className="mx-2 text-[#641F2A]">→</span>
            <span>AUTOMATION</span>
            <span className="mx-2 text-[#641F2A]">→</span>
            <span className="text-[#F1EBDD] font-bold">MEASURABLE ROI</span>
          </div>
        </section>

        {/* ─── DETAILED SERVICE SECTIONS (8 SERVICES) ──────────────────── */}
        <section id="ai-services-list" className="py-16 sm:py-24 border-t border-white/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="burgundy" dot className="mb-3">
              Detailed Service Breakdown
            </Badge>
            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F1EBDD] tracking-tight">
              Applied AI Services
            </H2>
            <Text className="mt-3 text-base text-[#F1EBDD]/70">
              Each AI capability is structured around solving specific business challenges with concrete applications.
            </Text>
          </div>

          <div className="space-y-8">
            {AI_DETAILED_SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="p-8 sm:p-10 rounded-2xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/40 transition-all duration-300 hover-elevate group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Identification & Definition */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#641F2A]/20 border border-[#641F2A]/40 flex items-center justify-center text-[#F1EBDD] group-hover:scale-105 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#E8DFCF] font-semibold uppercase tracking-wider block">
                            Service 0{index + 1}
                          </span>
                          <span className="text-xs text-[#F1EBDD]/60 font-medium">
                            {service.badge}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-[#F1EBDD] tracking-tight">
                        {service.title}
                      </h3>

                      <div className="pt-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#F1EBDD]/60 block mb-1.5">
                          What It Is
                        </span>
                        <p className="text-sm text-[#F1EBDD]/80 leading-relaxed">
                          {service.whatItIs}
                        </p>
                      </div>

                      <div className="pt-4">
                        <ButtonLink
                          href={`/request-quote?service=${encodeURIComponent(service.title)}`}
                          variant="primary"
                          size="sm"
                          icon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          {service.ctaText}
                        </ButtonLink>
                      </div>
                    </div>

                    {/* Right Column: Business Problem & Applications */}
                    <div className="lg:col-span-8 space-y-6 lg:border-l lg:border-white/[0.08] lg:pl-8">
                      {/* Business Problem */}
                      <div className="p-5 rounded-xl bg-[#11110F]/60 border border-white/[0.06]">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#E8DFCF] font-semibold block mb-2">
                          Operational Friction Solved
                        </span>
                        <p className="text-sm text-[#F1EBDD]/70 leading-relaxed">
                          {service.businessProblem}
                        </p>
                      </div>

                      {/* Practical Applications */}
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#F1EBDD]/60 block mb-3">
                          Practical Commercial Applications
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.applications.map((app, appIdx) => (
                            <div
                              key={appIdx}
                              className="p-3.5 rounded-xl bg-[#11110F] border border-white/[0.04] flex items-start gap-2.5 text-xs text-[#F1EBDD]/80 leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#641F2A] mt-1.5 shrink-0" />
                              <span>{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── FINAL CALL TO ACTION ────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-t border-white/[0.08]">
          <div className="relative rounded-3xl overflow-hidden bg-[#641F2A] text-[#F1EBDD] p-8 sm:p-14 text-center shadow-2xl border border-white/[0.1]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="beige" dot className="mb-4">
                Practical Business AI
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F1EBDD] tracking-tight mb-4">
                Discuss an AI Project
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/80 leading-relaxed mb-8">
                Connect with our technical team to evaluate operational feasibility, scope out data requirements,
                and architect a practical AI deployment tailored to your business outcomes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote?service=AI+%26+Automation"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto bg-[#F1EBDD] text-[#11110F] hover:bg-white border-transparent"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Discuss an AI Project
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto border-white/40 text-[#F1EBDD] hover:bg-white/10"
                >
                  Schedule Discovery Call
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
