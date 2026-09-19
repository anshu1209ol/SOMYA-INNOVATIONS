export type ProductCategory =
  | "AI Solutions"
  | "SaaS Dashboards"
  | "Enterprise Automation"
  | "Analytics & Intelligence"
  | "Security & Governance"
  | "Developer Platforms";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ProductCategory;
  sku: string;
  badge?: string;
  availability: "Ready for Deployment" | "Custom Enterprise Setup" | "Private Cloud / On-Premise";
  specs: Record<string, string>;
  features: string[];
  isDemoPlaceholder: boolean;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "AI Solutions",
  "SaaS Dashboards",
  "Enterprise Automation",
  "Analytics & Intelligence",
  "Security & Governance",
  "Developer Platforms",
];

export const PRODUCTS: Product[] = [
  // ─── 1. AI Solutions ──────────────────────────────────────────────
  {
    id: "ai-01",
    slug: "somya-enterprise-ai-copilot",
    name: "Somya Enterprise AI Copilot & Knowledge Engine",
    shortDescription:
      "Context-aware conversational intelligence platform with enterprise RAG, vector search, and strict role-based corporate data isolation.",
    longDescription:
      "Empower employees and customers with an enterprise-grade AI Copilot integrated directly into your internal documentation, knowledge bases, and transactional databases. Features deterministic source attribution, zero model data training leaks, real-time embeddings indexing, and custom prompt workflows tailored for regulatory and high-compliance enterprise sectors.",
    category: "AI Solutions",
    sku: "SOMYA-SFT-AIC01",
    badge: "Flagship AI Platform",
    availability: "Ready for Deployment",
    specs: {
      "Architecture": "Hybrid RAG + Multi-Model Orchestration (OpenAI / Claude / Self-Hosted)",
      "Context Engine": "Vector Embeddings with pgvector & Hybrid Sparse Reranking",
      "Data Isolation": "Tenant-Level Cryptographic Partitioning & Zero-Retention SLA",
      "Integrations": "PostgreSQL, Supabase, Notion, Slack, Jira, REST & GraphQL APIs",
      "Deployment Model": "Dedicated Managed Cloud, Private VPC, or On-Premises Kubernetes",
      "Security Standard": "SOC2 Type II Ready, End-to-End TLS 1.3, Audit Trail Vault",
    },
    features: [
      "Deterministic source citations and paragraph-level hallucination guards",
      "Role-based document access control matching organizational hierarchy",
      "Sub-second inference responses powered by streaming token protocols",
      "Custom system instructions and prompt tuning for industry domain rules",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "ai-02",
    slug: "somya-vision-inspection-ai",
    name: "Somya Multimodal Vision AI & Document Engine",
    shortDescription:
      "High-precision computer vision and document intelligence engine for automated invoice extraction, form OCR, and defect inspection.",
    longDescription:
      "Automate manual visual audits and document digitization with Somya Vision AI. Combines deep learning OCR, layout analysis, and multimodal vision models to extract complex tabular data from invoices, shipping manifests, identity proofs, and manufacturing defect inspection feeds with 99.4% accuracy.",
    category: "AI Solutions",
    sku: "SOMYA-SFT-VIS02",
    badge: "Multimodal AI",
    availability: "Ready for Deployment",
    specs: {
      "Model Backbone": "Custom Fine-Tuned Vision Transformers & Document LLMs",
      "Processing Speed": "Up to 5,000 documents per minute with auto-scaling workers",
      "Input Formats": "PDF, TIFF, JPEG, PNG, Multi-page Scans, RTSP Video Streams",
      "Extraction Accuracy": "99.4% field-level accuracy on complex tabular layouts",
      "Integration Type": "REST Webhook, S3 / Supabase Storage Bucket Trigger, Kafka Queue",
      "Export Targets": "ERP systems (SAP, Oracle, Tally), PostgreSQL, JSON Payloads",
    },
    features: [
      "Automated 3-way matching of invoices, purchase orders, and receiving notes",
      "Zero-shot extraction for novel document layouts without template re-training",
      "Confidence scoring with human-in-the-loop exception verification queue",
      "PII redacting and compliance masking before downstream database storage",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "ai-03",
    slug: "somya-autonomous-agent-hub",
    name: "Somya Autonomous Agent Orchestration Hub",
    shortDescription:
      "Multi-agent framework enabling asynchronous planning, web research, automated tool calling, and workflow execution with human oversight.",
    longDescription:
      "Deploy proactive autonomous agents that execute multi-step operational tasks across disparate corporate systems. Designed with deterministic planning loops, loop guards, self-healing retries, and comprehensive audit logs for mission-critical enterprise workflows.",
    category: "AI Solutions",
    sku: "SOMYA-SFT-AGT03",
    badge: "Autonomous Agents",
    availability: "Custom Enterprise Setup",
    specs: {
      "Agent Topology": "Hierarchical Planner-Worker Multi-Agent Swarms",
      "Execution Engine": "State Machine with Event-Driven Step Resumption",
      "Tool Ecosystem": "Database Queries, HTTP Clients, Python/Sandbox Exec, Browser Subagents",
      "Concurrency Model": "Scalable async worker pools with Redis-backed state coordination",
      "Guardrails": "Policy enforcement layers, spend caps, and privilege sandboxing",
      "Observability": "Full step-by-step trajectory replay with latency and token telemetry",
    },
    features: [
      "Human-in-the-loop approval gates for financial and write-heavy operations",
      "Dynamic error recovery and fallback prompt strategies",
      "Persistent session state across long-running background tasks",
      "Zero credential leakage with ephemeral scoped secret injection",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "ai-04",
    slug: "somya-predictive-forecasting-engine",
    name: "Somya Predictive Intelligence & Demand Engine",
    shortDescription:
      "Time-series machine learning system for enterprise demand forecasting, churn risk scoring, and dynamic margin optimization.",
    longDescription:
      "Transform raw historical operational and financial data into accurate forward-looking forecasts. Leverages gradient boosted trees and deep time-series neural networks to predict inventory requirements, customer churn risks, and cash flow volatility with statistical confidence intervals.",
    category: "AI Solutions",
    sku: "SOMYA-SFT-PRD04",
    badge: "Predictive Analytics",
    availability: "Ready for Deployment",
    specs: {
      "Algorithm Suite": "DeepAR, Prophet, XGBoost, and Transformer-based Forecasters",
      "Forecasting Horizon": "Multi-horizon (Daily, Weekly, Monthly, Quarterly)",
      "Data Ingestion": "Automated ETL connectors for PostgreSQL, Snowflake, BigQuery",
      "Output Formats": "Dynamic dashboard feeds, automated webhook alerts, scheduled PDF reports",
      "Scalability": "Processes multi-million record historical time series in seconds",
      "Validation Method": "Automated backtesting and rolling walk-forward cross-validation",
    },
    features: [
      "Actionable churn alert scoring with recommended retention interventions",
      "Inventory reorder point calculation incorporating supply chain lead time jitter",
      "What-if scenario modeling for price elasticity and seasonal shifts",
      "Real-time anomaly detection flagging unexpected demand surges or drops",
    ],
    isDemoPlaceholder: false,
  },

  // ─── 2. SaaS Dashboards ───────────────────────────────────────────
  {
    id: "saas-01",
    slug: "somya-executive-bi-dashboard",
    name: "Somya Executive Operations & BI SaaS Dashboard",
    shortDescription:
      "Unified enterprise command center offering real-time KPI visualization, multi-branch tracking, and executive decision intelligence.",
    longDescription:
      "A comprehensive SaaS dashboard tailored for CEOs, COOs, and division leaders. Consolidates multi-entity financial metrics, sales pipeline velocity, customer retention, and workforce productivity into clean, high-performance dashboards with zero fake metrics and sub-second query latency.",
    category: "SaaS Dashboards",
    sku: "SOMYA-SFT-DSH01",
    badge: "Executive Suite",
    availability: "Ready for Deployment",
    specs: {
      "Frontend Framework": "Next.js 16, React 19, Tailwind CSS, High-Speed Canvas Charts",
      "Database Integration": "Direct Supabase / PostgreSQL analytical query connection",
      "Refresh Cadence": "Real-time WebSocket streaming with configurable auto-polling",
      "Access Control": "Multi-tenant role-based permissions with drill-down audit trails",
      "Export Capabilities": "Executive PDF summaries, CSV raw dumps, scheduled Slack/Email digests",
      "Mobile Readiness": "Fully responsive, optimized for tablet and mobile executive access",
    },
    features: [
      "Live revenue, pipeline conversion, and operational burn tracking",
      "Customizable metric widgets and modular drag-and-drop report builders",
      "Granular branch and regional office segmentation with consolidated rollups",
      "Built-in threshold alerts with automated notifications via SMS, Slack, or Email",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "saas-02",
    slug: "somya-fleet-operations-portal",
    name: "Somya Fleet & IoT Operations SaaS Platform",
    shortDescription:
      "Real-time IoT telemetry monitoring, asset lifecycle tracking, maintenance dispatching, and route optimization portal.",
    longDescription:
      "Engineered for logistics, industrial fleets, and field asset operators. Tracks vehicle and equipment sensor feeds, alerts dispatchers to mechanical faults before breakdowns occur, logs fuel efficiency, and enforces preventive maintenance schedules.",
    category: "SaaS Dashboards",
    sku: "SOMYA-SFT-FLT02",
    badge: "IoT Telemetry",
    availability: "Ready for Deployment",
    specs: {
      "Protocol Support": "MQTT, CoAP, HTTPS, WebSockets for IoT edge device streaming",
      "Mapping Engine": "High-density vector mapping with live GPS coordinate tracking",
      "Telemetry Ingestion": "Handles 50,000+ sensor ticks per second with zero dropouts",
      "Maintenance Automation": "Trigger-based work order generation based on mileage or engine hours",
      "Database Storage": "Supabase + PostgreSQL with Timescale time-bucket aggregations",
      "Compliance Standard": "ELD mandate compliant, driver duty hour logging and inspection logs",
    },
    features: [
      "Live asset geofencing with instant breach notifications",
      "Predictive engine diagnostic codes translation into plain-English alerts",
      "Driver safety scoring and eco-driving fuel optimization reports",
      "Digital pre-trip and post-trip vehicle inspection checklist records",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "saas-03",
    slug: "somya-client-collaboration-portal",
    name: "Somya Client Hub & B2B Customer Portal",
    shortDescription:
      "White-label client portal featuring real-time project milestone tracking, quotation approvals, invoice review, and secure messaging.",
    longDescription:
      "Eliminate messy email threads and status chasing with a branded B2B client portal. Clients securely sign in to view project delivery progress, review and accept commercial quotations, download tax invoices, and communicate directly with their dedicated delivery leads.",
    category: "SaaS Dashboards",
    sku: "SOMYA-SFT-CLP03",
    badge: "Customer Portal",
    availability: "Ready for Deployment",
    specs: {
      "Branding System": "Custom domain, white-label company branding, custom accent colors",
      "Authentication": "Passwordless Magic Links, OAuth 2.0, SAML SSO, Multi-Factor Auth",
      "Security Model": "Row Level Security (RLS) ensuring strict tenant and client data isolation",
      "Document Storage": "Presigned expiring download URLs via private Supabase Storage",
      "Payments & Billing": "Stripe & Razorpay integrated invoice payments and receipts",
      "Notification Engine": "In-app notifications, browser pushes, automated email alerts",
    },
    features: [
      "Interactive quotation viewer with digital sign-off and instant PDF generation",
      "Milestone completion progress bars with client acceptance workflows",
      "Secure encrypted file dropzone for sensitive client documents and credentials",
      "Real-time task activity feed keeping clients continuously updated",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "saas-04",
    slug: "somya-hr-talent-suite",
    name: "Somya PeopleOps & Workforce Management SaaS",
    shortDescription:
      "All-in-one workforce suite for talent acquisition, candidate screening, employee onboarding, attendance, and performance reviews.",
    longDescription:
      "Streamline human capital management from job posting to annual appraisal. Features a modern applicant tracking system (ATS), automated interview scheduling, digital document onboarding, leave management, and employee pulse surveys in an intuitive dark-themed interface.",
    category: "SaaS Dashboards",
    sku: "SOMYA-SFT-HRP04",
    badge: "HR & PeopleOps",
    availability: "Ready for Deployment",
    specs: {
      "Core Modules": "ATS, Onboarding, Leave Management, Performance, Employee Directory",
      "Applicant Pipeline": "Kanban-style candidate stage progression with resume viewer",
      "Calendar Integration": "Bi-directional Google & Outlook Calendar scheduling",
      "Compliance Handling": "Labor law compliance, digital signature acknowledgement tracking",
      "Role Hierarchy": "Employee self-service, manager approvals, HR admin, Executive oversight",
      "Reporting Metrics": "Headcount growth, retention rates, hiring velocity, time-to-hire",
    },
    features: [
      "AI resume parsing with automated job requirement matching scores",
      "One-click job publishing to company careers page and external job boards",
      "Automated welcome workflows with task checklists for new hires and IT teams",
      "Self-service leave balance requests with multi-tier managerial approval",
    ],
    isDemoPlaceholder: false,
  },

  // ─── 3. Enterprise Automation ─────────────────────────────────────
  {
    id: "auto-01",
    slug: "somya-workflow-orchestrator",
    name: "Somya Event-Driven Workflow Orchestrator",
    shortDescription:
      "Distributed low-code automation engine connecting ERPs, CRMs, banking webhooks, and internal microservices.",
    longDescription:
      "Connect siloed business systems with reliable event-driven orchestration. Handles complex asynchronous branching logic, automatic idempotency keys, exponential retry backoff, and dead-letter queues without requiring complex custom integration plumbing.",
    category: "Enterprise Automation",
    sku: "SOMYA-SFT-WFO01",
    badge: "Process Automation",
    availability: "Ready for Deployment",
    specs: {
      "Runtime Engine": "Serverless Node/TypeScript micro-step execution engine",
      "Throughput Capacity": "10,000+ workflow runs per second with horizontal worker scaling",
      "Connectors": "REST APIs, GraphQL, PostgreSQL, Webhooks, AWS S3, Stripe, Slack",
      "Reliability Guarantee": "Guaranteed at-least-once execution with idempotent request matching",
      "Observability": "Visual node execution graphs with step input/output inspection",
      "Trigger Latency": "Sub-50ms trigger-to-execution latency on cloud edge nodes",
    },
    features: [
      "Visual drag-and-drop workflow canvas with JSON schema validation",
      "Automated error alerting with immediate re-run capabilities from point of failure",
      "Encrypted environment credential vault for third-party API keys",
      "Scheduled cron triggers, webhook listeners, and database change feeds",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "auto-02",
    slug: "somya-intelligent-invoice-pipeline",
    name: "Somya Accounts Payable & Billing Automation",
    shortDescription:
      "End-to-end invoice capture, PO reconciliation, ledger posting, and fraud anomaly detection pipeline.",
    longDescription:
      "Accelerate finance operations by eliminating manual data entry. Invoices received via email, scan, or portal are instantly parsed, validated against purchase orders, audited for duplicates and tax discrepancies, and queued for finance team approval.",
    category: "Enterprise Automation",
    sku: "SOMYA-SFT-INV02",
    badge: "Finance Automation",
    availability: "Ready for Deployment",
    specs: {
      "Parsing Pipeline": "OCR + LLM semantic extraction + programmatic validation rules",
      "Reconciliation": "Automated 2-way and 3-way reconciliation (PO, Goods Receipt, Invoice)",
      "ERP Connectors": "Native connectors for Tally, Zoho Books, SAP, QuickBooks, NetSuite",
      "Audit Trail": "Every calculation and modification permanently logged with timestamp",
      "Fraud Screening": "Bank account change alerts, duplicate submission detection",
      "Currency Handling": "Multi-currency conversion with historical exchange rate lookup",
    },
    features: [
      "Direct email ingestion mailbox auto-processing incoming vendor invoices",
      "Line-item tax verification (GST / VAT / Sales Tax) with HSN code validation",
      "Custom approval routing matrices based on spend limits and department heads",
      "Instant vendor payment status inquiries via automated vendor notifications",
    ],
    isDemoPlaceholder: false,
  },

  // ─── 4. Analytics & Intelligence ──────────────────────────────────
  {
    id: "anl-01",
    slug: "somya-realtime-telemetry-engine",
    name: "Somya Real-Time Data Streaming & Metric Engine",
    shortDescription:
      "High-throughput stream processing platform for real-time sensor ingestion, clickstream analytics, and anomaly alerting.",
    longDescription:
      "Ingest, transform, and analyze streaming data with microsecond precision. Built for high-volume telemetry applications, financial transaction monitoring, and infrastructure health tracking with dynamic threshold alerting.",
    category: "Analytics & Intelligence",
    sku: "SOMYA-SFT-TEL01",
    badge: "Streaming Analytics",
    availability: "Ready for Deployment",
    specs: {
      "Stream Protocols": "Apache Kafka, Apache Pulsar, Redis Streams, WebSocket Ingests",
      "Processing Latency": "Sub-10 millisecond end-to-end analytical processing window",
      "Storage Backend": "PostgreSQL with partitioned hypertable time-series storage",
      "Query Interface": "Continuous materialized views with standard SQL compatibility",
      "Visualization": "Live dashboards updating at 60 FPS without page refreshes",
      "Clustering": "Multi-zone clustering with automatic failover and zero data loss",
    },
    features: [
      "Dynamic metric spike and drop detection using statistical moving averages",
      "Real-time sliding window aggregations (1s, 1m, 5m, 1h rolling rollups)",
      "Custom alert webhooks routing directly to OpsGenie, PagerDuty, or Discord",
      "Interactive time-series explorer with zoomable millisecond resolution",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "anl-02",
    slug: "somya-customer-journey-analytics",
    name: "Somya Customer 360 & Behavioral Intelligence",
    shortDescription:
      "Omnichannel customer intelligence suite uniting web analytics, CRM touchpoints, support tickets, and lifetime value tracking.",
    longDescription:
      "Get complete visibility into customer acquisition, retention, and lifetime value. Unifies events from mobile apps, web portals, and support desks into single customer profiles to power precise segmentation and churn prevention.",
    category: "Analytics & Intelligence",
    sku: "SOMYA-SFT-C360",
    badge: "Customer Intelligence",
    availability: "Ready for Deployment",
    specs: {
      "Data Sources": "Client websites, mobile SDKs, CRM databases, support helpdesks",
      "Identity Stitching": "Deterministic and probabilistic cross-device user identity stitching",
      "Privacy Compliance": "GDPR, CCPA, and DPDP Act compliant with automated cookie consent hooks",
      "Cohort Engine": "Behavioral cohort segmentation with dynamic re-calculation",
      "Attribution Models": "Multi-touch attribution models (First-touch, Last-touch, Linear, Decay)",
      "Storage Security": "Secure encrypted analytical data warehouse partition",
    },
    features: [
      "Sankey flow diagram visualization of conversion and drop-off funnels",
      "Automated identification of high-value churn risk accounts",
      "Customer lifetime value (LTV) predictive scoring with purchase propensity",
      "Real-time segmentation export into email and marketing automation tools",
    ],
    isDemoPlaceholder: false,
  },

  // ─── 5. Security & Governance ─────────────────────────────────────
  {
    id: "sec-01",
    slug: "somya-zero-trust-access-gateway",
    name: "Somya Zero-Trust Identity & API Security Gateway",
    shortDescription:
      "Next-generation API and internal system access gateway enforcing continuous authentication, RBAC/ABAC, and mutual TLS.",
    longDescription:
      "Protect your proprietary APIs, microservices, and internal SaaS dashboards from unauthorized access and credential compromise. Enforces zero-trust principles on every single request with micro-segmentation, token introspection, and automated threat blocking.",
    category: "Security & Governance",
    sku: "SOMYA-SFT-ZTG01",
    badge: "Zero-Trust Gateway",
    availability: "Private Cloud / On-Premise",
    specs: {
      "Protocol Support": "HTTP/1.1, HTTP/2, gRPC, WebSocket proxy with mTLS encryption",
      "Auth Integrations": "Supabase Auth, Okta, Azure AD, OAuth 2.0, OpenID Connect",
      "Rate Limiting": "Distributed sliding-window rate limiting with IP reputation scoring",
      "WAF Protection": "OWASP Top 10 mitigation, SQL injection & XSS automated scrubbing",
      "Proxy Overhead": "Ultra-low <2ms proxy overhead on edge nodes",
      "Audit Logging": "Tamper-evident cryptographic request and response audit logs",
    },
    features: [
      "Dynamic policy evaluation taking into account user role, device posture, and IP",
      "Instant session revocation across all enterprise portals upon security alert",
      "Granular API endpoint scopes protecting sensitive financial and PII endpoints",
      "Live attack map and blocked suspicious request inspector",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "sec-02",
    slug: "somya-compliance-audit-vault",
    name: "Somya Continuous Compliance & SOC2 Evidence Vault",
    shortDescription:
      "Automated compliance evidence collection, access review workflows, and immutable audit trail archive.",
    longDescription:
      "Simplify annual audits and maintain continuous security posture. Automatically collects system configuration evidence, verifies database encryption and backup schedules, coordinates quarterly access reviews, and maintains an immutable audit trail.",
    category: "Security & Governance",
    sku: "SOMYA-SFT-CPV02",
    badge: "Compliance Vault",
    availability: "Ready for Deployment",
    specs: {
      "Framework Coverage": "SOC 2 Type II, ISO 27001, HIPAA, PCI-DSS, GDPR, DPDP",
      "Evidence Collection": "Automated daily cloud infrastructure and database posture tests",
      "Storage Compliance": "WORM (Write Once Read Many) compliant immutable log vault",
      "Access Reviews": "Automated user role certification workflows for department leads",
      "Vendor Risk": "Vendor security assessment tracking with expiration reminders",
      "Auditor View": "Read-only auditor access view with one-click evidence downloads",
    },
    features: [
      "Live security score badge and gap analysis roadmap for certification",
      "Automated alerts when misconfigurations or unencrypted resources are detected",
      "Scheduled access review questionnaires sent automatically to team managers",
      "Comprehensive policy template library customized for Indian & global regulations",
    ],
    isDemoPlaceholder: false,
  },

  // ─── 6. Developer Platforms ───────────────────────────────────────
  {
    id: "dev-01",
    slug: "somya-microservices-developer-hub",
    name: "Somya Internal Developer Platform (IDP)",
    shortDescription:
      "Self-service developer portal offering automated environment provisioning, CI/CD telemetry, and unified service catalogs.",
    longDescription:
      "Empower engineering teams to ship faster while upholding architectural standards. Developers can spin up staging environments, register microservices, inspect distributed traces, and manage cloud credentials through an intuitive self-service hub.",
    category: "Developer Platforms",
    sku: "SOMYA-SFT-IDP01",
    badge: "Developer Hub",
    availability: "Custom Enterprise Setup",
    specs: {
      "Core Modules": "Service Catalog, Scaffold Templates, Docs-as-Code, CI/CD Insights",
      "Cloud Compatibility": "AWS, Google Cloud, Azure, Docker, Kubernetes, Supabase",
      "CI/CD Integration": "GitHub Actions, GitLab CI, ArgoCD, Jenkins",
      "Architecture Docs": "Automated OpenAPI / Swagger and TechDocs visualization",
      "Secret Management": "Vault integration with dynamic short-lived development credentials",
      "Observability": "OpenTelemetry tracing integration with bottleneck analysis",
    },
    features: [
      "One-click scaffolding of new microservices with pre-configured CI/CD & linting",
      "Live service dependency graph showing upstream and downstream services",
      "DORA metrics dashboard tracking deployment frequency and lead time for changes",
      "Unified service ownership registry with on-call rota escalation links",
    ],
    isDemoPlaceholder: false,
  },
  {
    id: "dev-02",
    slug: "somya-api-management-suite",
    name: "Somya Enterprise API Gateway & Monetization Suite",
    shortDescription:
      "Complete API management platform featuring developer onboarding, usage metering, subscription billing, and sandbox testing.",
    longDescription:
      "Transform internal APIs into commercial revenue streams or secure partner integrations. Features a developer portal with interactive documentation, API key generation with granular quotas, and integrated usage-based billing.",
    category: "Developer Platforms",
    sku: "SOMYA-SFT-APM02",
    badge: "API Gateway",
    availability: "Ready for Deployment",
    specs: {
      "API Protocols": "REST, GraphQL, gRPC with automatic OpenAPI schema generation",
      "Metering Engine": "High-precision per-call metering and monthly quota tracking",
      "Billing Integration": "Stripe Metered Billing, Razorpay subscriptions, prepaid credit wallets",
      "Developer Portal": "Self-service key issuance, documentation, and interactive sandbox",
      "Security Protocols": "HMAC signatures, mutual TLS, IP allowlisting, key rotation policies",
      "Analytics Dashboard": "Endpoint latency distribution, error rate breakdown, revenue per API",
    },
    features: [
      "Interactive API console allowing developers to test endpoints in browser",
      "Configurable tier limits (Free, Pro, Enterprise) with automated rate throttling",
      "Instant webhook delivery with automatic retry on developer endpoint failures",
      "Automated SDK generation for TypeScript, Python, and Go",
    ],
    isDemoPlaceholder: false,
  },
];

// ─── Query Functions (Ready to bind to DB) ────────────────────────

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getRelatedProducts(
  productId: string,
  category: ProductCategory,
  limit: number = 3
): Promise<Product[]> {
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== productId && p.category === category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = PRODUCTS.filter(
    (p) => p.id !== productId && p.category !== category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
