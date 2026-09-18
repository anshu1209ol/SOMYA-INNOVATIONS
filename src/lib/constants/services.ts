import {
  Brain,
  Server,
  Globe,
  Package,
  Users,
  Shield,
  Layers,
  Cpu,
  Cloud,
  BarChart3,
  Workflow,
  Code,
  Database,
  MonitorSmartphone,
  ShoppingCart,
  Lightbulb,
  Factory,
  Landmark,
  HeartPulse,
  GraduationCap,
  Truck,
  Building2,
  HardDrive,
  Network,
  type LucideIcon,
} from "lucide-react";

// ─── Services ───────────────────────────────────────────────────

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  slug: string;
  category: "ai" | "it" | "digital" | "products";
}

export const SERVICES: ServiceItem[] = [
  // 01 AI & Automation
  {
    title: "AI Strategy & Consulting",
    description:
      "Develop a pragmatic AI roadmap aligned with your business processes. We identify high-impact opportunities for production-grade AI deployment.",
    icon: Brain,
    features: ["AI Readiness Assessment", "Process Automation Discovery", "Solution Architecture", "ROI & Feasibility Modeling"],
    slug: "ai-strategy",
    category: "ai",
  },
  {
    title: "Machine Learning Solutions",
    description:
      "Custom ML models tailored to your proprietary datasets—from predictive intelligence and classification to demand forecasting and anomaly detection.",
    icon: Cpu,
    features: ["Predictive Analytics", "Classification & Clustering", "Forecasting Engines", "Anomaly Detection"],
    slug: "machine-learning",
    category: "ai",
  },
  {
    title: "Data Analytics & Intelligence",
    description:
      "Transform disparate organizational data into decision-ready business intelligence through structured pipelines and executive telemetry.",
    icon: BarChart3,
    features: ["Enterprise Telemetry", "Data Warehousing", "Operational Dashboards", "Data Governance"],
    slug: "data-analytics",
    category: "ai",
  },
  {
    title: "Process & Workflow Automation",
    description:
      "Streamline multi-step manual processes with intelligent event-driven automation, document processing, and system orchestration.",
    icon: Workflow,
    features: ["Workflow Orchestration", "Document Intelligence", "System Integration", "Rule-Based Automation"],
    slug: "process-automation",
    category: "ai",
  },

  // 02 IT Solutions
  {
    title: "IT Infrastructure & Architecture",
    description:
      "End-to-end IT architecture design, server deployment, and facility infrastructure engineered for mission-critical reliability.",
    icon: Server,
    features: ["Structured Cabling & Racks", "Server Infrastructure", "Virtualization Systems", "Workstation Fleets"],
    slug: "infrastructure",
    category: "it",
  },
  {
    title: "Enterprise Networking",
    description:
      "High-throughput, low-latency enterprise network design featuring managed switches, robust VLAN segmentation, and redundant routing.",
    icon: Network,
    features: ["Managed Switching & Routing", "Enterprise Wi-Fi", "Firewall Architecture", "Network Segmentation"],
    slug: "networking",
    category: "it",
  },
  {
    title: "Cybersecurity & Endpoint Defense",
    description:
      "Safeguard company data and endpoints with perimeter defenses, zero-trust access controls, compliance audits, and security monitoring.",
    icon: Shield,
    features: ["Threat Prevention", "Zero-Trust Architecture", "Endpoint Security", "Security Auditing"],
    slug: "cybersecurity",
    category: "it",
  },
  {
    title: "Managed IT Operations & Support",
    description:
      "Proactive systems monitoring, preventive maintenance, and SLA-backed engineering support to keep your operations resilient.",
    icon: Users,
    features: ["Continuous System Health", "Help Desk Escalation", "System Patching", "Lifecycle Management"],
    slug: "managed-services",
    category: "it",
  },

  // 03 Digital Solutions
  {
    title: "Custom Software Engineering",
    description:
      "Bespoke digital platforms, operational software, and internal tools built with modern, secure, and maintainable engineering standards.",
    icon: Code,
    features: ["Bespoke Web Platforms", "Enterprise SaaS", "Microservices Architecture", "API Integration"],
    slug: "software-engineering",
    category: "digital",
  },
  {
    title: "Business Dashboards & Portals",
    description:
      "Operational control centers and executive dashboards providing real-time visibility into business metrics, workflows, and team output.",
    icon: MonitorSmartphone,
    features: ["Executive Portals", "Operations Dashboards", "Role-Based Access Control", "Data Connectors"],
    slug: "business-dashboards",
    category: "digital",
  },
  {
    title: "Database & Cloud Architecture",
    description:
      "Resilient database schemas, cloud migration pipelines, and high-availability topologies that scale alongside business volume.",
    icon: Database,
    features: ["PostgreSQL & Relational Data", "Cloud Infrastructure", "Automated Backups", "Low-Latency Caching"],
    slug: "database-cloud",
    category: "digital",
  },

  // 04 Technology Products
  {
    title: "Enterprise Computing Systems",
    description:
      "Standardized business desktops, CAD engineering workstations, and commercial laptop fleets sourced directly with full manufacturer warranties.",
    icon: HardDrive,
    features: ["Business Desktop Towers", "Fleet Laptops", "High-Performance Workstations", "OEM Warranty Backing"],
    slug: "computing-systems",
    category: "products",
  },
  {
    title: "Network & Infrastructure Hardware",
    description:
      "Commercial PoE switches, enterprise routers, structured patch panels, and server rack assemblies for operational deployments.",
    icon: Layers,
    features: ["Managed PoE Switches", "Server Rack Cabinets", "Structured Patch Rigs", "UPS Power Systems"],
    slug: "network-hardware",
    category: "products",
  },
  {
    title: "Security & Surveillance Tech",
    description:
      "Enterprise IP cameras, network video recorders, biometric access controllers, and perimeter monitoring hardware.",
    icon: Shield,
    features: ["4K IP Security Cameras", "Network Video Recorders", "Biometric Access Units", "Centralized Monitoring"],
    slug: "security-hardware",
    category: "products",
  },
];

// ─── 4 Primary Business Areas ────────────────────────────────────

export interface ServiceCategory {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  category: "ai" | "it" | "digital" | "products";
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: "AI & Automation",
    slug: "ai-solutions",
    description: "Applied artificial intelligence, predictive machine learning models, and automated business workflows.",
    longDescription:
      "We design and deploy practical artificial intelligence solutions—from computer vision and natural language document processing to automated intelligence pipelines that integrate cleanly into daily business operations.",
    icon: Brain,
    category: "ai",
  },
  {
    title: "IT Solutions",
    slug: "it-solutions",
    description: "Enterprise IT infrastructure, structured networking, zero-trust security, and managed operations.",
    longDescription:
      "Reliable physical and cloud IT systems engineered for stability. We design, deploy, and manage enterprise networks, server environments, and endpoint security tailored to your operational scale.",
    icon: Server,
    category: "it",
  },
  {
    title: "Digital Solutions",
    slug: "digital-solutions",
    description: "Product engineering, bespoke business applications, operational dashboards, and database systems.",
    longDescription:
      "We build robust, modern digital products that solve concrete operational bottlenecks. Our capabilities encompass custom web software, business intelligence consoles, API integrations, and scalable database architectures.",
    icon: Globe,
    category: "digital",
  },
  {
    title: "Technology Products",
    slug: "products",
    description: "Standardized enterprise computing, managed networking rigs, and commercial technology equipment.",
    longDescription:
      "Our technology product catalogue provides verified commercial computing fleets, CAD workstations, managed switching hardware, and security infrastructure backed by direct OEM warranties and transparent B2B quotations.",
    icon: Package,
    category: "products",
  },
];

// ─── Products (Catalogue Categories) ────────────────────────────

export interface ProductCategory {
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    title: "Computing",
    description: "Commercial desktop towers, business laptop fleets, and CAD workstations.",
    category: "Computing",
    icon: HardDrive,
  },
  {
    title: "Networking",
    description: "Managed PoE switches, enterprise routers, rack cabinets, and access points.",
    category: "Networking",
    icon: Network,
  },
  {
    title: "Accessories",
    description: "Industrial docking stations, ergonomic peripherals, and certified cables.",
    category: "Accessories",
    icon: Layers,
  },
  {
    title: "Security",
    description: "Enterprise IP surveillance cameras, NVR storage, and biometric access controllers.",
    category: "Security",
    icon: Shield,
  },
  {
    title: "Electronics",
    description: "Commercial 4K display panels, interactive touch screens, and UPS power backups.",
    category: "Electronics",
    icon: Lightbulb,
  },
  {
    title: "Office Technology",
    description: "High-volume network printers, VoIP conference systems, and document digitizers.",
    category: "Office Technology",
    icon: Building2,
  },
];

// ─── Industries ─────────────────────────────────────────────────

export interface Industry {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
}

export const INDUSTRIES: Industry[] = [
  {
    title: "Manufacturing & Industrial",
    description: "Shopfloor telemetry, operational computer vision, equipment monitoring, and enterprise network backbones.",
    icon: Factory,
    slug: "manufacturing",
  },
  {
    title: "Financial & Corporate Services",
    description: "Secure data pipelines, compliance-ready infrastructure, automated document validation, and audit tracking.",
    icon: Landmark,
    slug: "financial-services",
  },
  {
    title: "Healthcare & Diagnostics",
    description: "High-availability local networks, medical imaging workstations, secure records storage, and reliable power backup.",
    icon: HeartPulse,
    slug: "healthcare",
  },
  {
    title: "Education & Institutions",
    description: "Campus-wide structured Wi-Fi, computer lab workstation fleets, administrative portals, and digital classroom displays.",
    icon: GraduationCap,
    slug: "education",
  },
  {
    title: "Logistics & Fleet Operations",
    description: "Warehouse surveillance, inventory scanning terminals, dispatch software, and high-reliability networking.",
    icon: Truck,
    slug: "logistics",
  },
];

// ─── Value Propositions ─────────────────────────────────────────

export interface ValueProp {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "Engineering Precision",
    description: "We architect systems based on rigorous technical specifications, benchmarked performance, and operational fit.",
    icon: Cpu,
  },
  {
    title: "Pragmatic Architecture",
    description: "We deploy proven, maintainable technologies that solve real operational bottlenecks without speculative complexity.",
    icon: Layers,
  },
  {
    title: "Uncompromising Integrity",
    description: "Transparent B2B quotations, honest capability reporting, and verified manufacturer warranty guarantees.",
    icon: Shield,
  },
];

// ─── Process Steps ──────────────────────────────────────────────

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover & Audit",
    description: "We analyze your operating environment, physical infrastructure, and workflows to identify exact technical requirements.",
  },
  {
    step: "02",
    title: "Architect & Specify",
    description: "We design a modular technical blueprint and line-item bill of materials aligned strictly with your operational goals.",
  },
  {
    step: "03",
    title: "Deploy & Implement",
    description: "Our engineering team installs hardware, deploys software stacks, and conducts rigorous end-to-end validation tests.",
  },
  {
    step: "04",
    title: "Maintain & Support",
    description: "Continuous health monitoring, preventive maintenance, and SLA-backed support to guarantee maximum system uptime.",
  },
];

// ─── Enquiry & Form Options (Zero Trading Mentions) ─────────────

export const ENQUIRY_TYPES = [
  "General Consultation",
  "Quotation Request",
  "Technical Architecture Review",
  "Product Specification Enquiry",
  "Other",
] as const;

export const SERVICE_INTERESTS = [
  "AI & Automation",
  "IT Solutions",
  "Digital Solutions",
  "Technology Products",
  "Architecture Consulting",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under ₹1 Lakh",
  "₹1 Lakh – ₹5 Lakh",
  "₹5 Lakh – ₹25 Lakh",
  "₹25 Lakh – ₹1 Crore",
  "Above ₹1 Crore",
  "Not decided / Discuss",
] as const;

export const PROJECT_TIMELINES = [
  "Immediate (< 1 Month)",
  "Short-Term (1–3 Months)",
  "Medium-Term (3–6 Months)",
  "Flexible / Long-Term",
] as const;
