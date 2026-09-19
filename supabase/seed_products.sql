-- Seed 16 Enterprise SaaS & AI Products

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Enterprise AI Copilot & Knowledge Engine', 
  'somya-enterprise-ai-copilot', 
  c.id, 
  'Empower employees and customers with an enterprise-grade AI Copilot integrated directly into your internal documentation, knowledge bases, and transactional databases. Features deterministic source attribution, zero model data training leaks, real-time embeddings indexing, and custom prompt workflows tailored for regulatory and high-compliance enterprise sectors.', 
  '{"Architecture":"Hybrid RAG + Multi-Model Orchestration (OpenAI / Claude / Self-Hosted)","Context Engine":"Vector Embeddings with pgvector & Hybrid Sparse Reranking","Data Isolation":"Tenant-Level Cryptographic Partitioning & Zero-Retention SLA","Integrations":"PostgreSQL, Supabase, Notion, Slack, Jira, REST & GraphQL APIs","Deployment Model":"Dedicated Managed Cloud, Private VPC, or On-Premises Kubernetes","Security Standard":"SOC2 Type II Ready, End-to-End TLS 1.3, Audit Trail Vault"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-AIC01', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'AI Solutions'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Multimodal Vision AI & Document Engine', 
  'somya-vision-inspection-ai', 
  c.id, 
  'Automate manual visual audits and document digitization with Somya Vision AI. Combines deep learning OCR, layout analysis, and multimodal vision models to extract complex tabular data from invoices, shipping manifests, identity proofs, and manufacturing defect inspection feeds with 99.4% accuracy.', 
  '{"Model Backbone":"Custom Fine-Tuned Vision Transformers & Document LLMs","Processing Speed":"Up to 5,000 documents per minute with auto-scaling workers","Input Formats":"PDF, TIFF, JPEG, PNG, Multi-page Scans, RTSP Video Streams","Extraction Accuracy":"99.4% field-level accuracy on complex tabular layouts","Integration Type":"REST Webhook, S3 / Supabase Storage Bucket Trigger, Kafka Queue","Export Targets":"ERP systems (SAP, Oracle, Tally), PostgreSQL, JSON Payloads"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-VIS02', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'AI Solutions'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Autonomous Agent Orchestration Hub', 
  'somya-autonomous-agent-hub', 
  c.id, 
  'Deploy proactive autonomous agents that execute multi-step operational tasks across disparate corporate systems. Designed with deterministic planning loops, loop guards, self-healing retries, and comprehensive audit logs for mission-critical enterprise workflows.', 
  '{"Agent Topology":"Hierarchical Planner-Worker Multi-Agent Swarms","Execution Engine":"State Machine with Event-Driven Step Resumption","Tool Ecosystem":"Database Queries, HTTP Clients, Python/Sandbox Exec, Browser Subagents","Concurrency Model":"Scalable async worker pools with Redis-backed state coordination","Guardrails":"Policy enforcement layers, spend caps, and privilege sandboxing","Observability":"Full step-by-step trajectory replay with latency and token telemetry"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-AGT03', 
  'Custom Enterprise Setup', 
  true
FROM public.product_categories c
WHERE c.name = 'AI Solutions'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Predictive Intelligence & Demand Engine', 
  'somya-predictive-forecasting-engine', 
  c.id, 
  'Transform raw historical operational and financial data into accurate forward-looking forecasts. Leverages gradient boosted trees and deep time-series neural networks to predict inventory requirements, customer churn risks, and cash flow volatility with statistical confidence intervals.', 
  '{"Algorithm Suite":"DeepAR, Prophet, XGBoost, and Transformer-based Forecasters","Forecasting Horizon":"Multi-horizon (Daily, Weekly, Monthly, Quarterly)","Data Ingestion":"Automated ETL connectors for PostgreSQL, Snowflake, BigQuery","Output Formats":"Dynamic dashboard feeds, automated webhook alerts, scheduled PDF reports","Scalability":"Processes multi-million record historical time series in seconds","Validation Method":"Automated backtesting and rolling walk-forward cross-validation"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-PRD04', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'AI Solutions'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Executive Operations & BI SaaS Dashboard', 
  'somya-executive-bi-dashboard', 
  c.id, 
  'A comprehensive SaaS dashboard tailored for CEOs, COOs, and division leaders. Consolidates multi-entity financial metrics, sales pipeline velocity, customer retention, and workforce productivity into clean, high-performance dashboards with zero fake metrics and sub-second query latency.', 
  '{"Frontend Framework":"Next.js 16, React 19, Tailwind CSS, High-Speed Canvas Charts","Database Integration":"Direct Supabase / PostgreSQL analytical query connection","Refresh Cadence":"Real-time WebSocket streaming with configurable auto-polling","Access Control":"Multi-tenant role-based permissions with drill-down audit trails","Export Capabilities":"Executive PDF summaries, CSV raw dumps, scheduled Slack/Email digests","Mobile Readiness":"Fully responsive, optimized for tablet and mobile executive access"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-DSH01', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'SaaS Dashboards'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Fleet & IoT Operations SaaS Platform', 
  'somya-fleet-operations-portal', 
  c.id, 
  'Engineered for logistics, industrial fleets, and field asset operators. Tracks vehicle and equipment sensor feeds, alerts dispatchers to mechanical faults before breakdowns occur, logs fuel efficiency, and enforces preventive maintenance schedules.', 
  '{"Protocol Support":"MQTT, CoAP, HTTPS, WebSockets for IoT edge device streaming","Mapping Engine":"High-density vector mapping with live GPS coordinate tracking","Telemetry Ingestion":"Handles 50,000+ sensor ticks per second with zero dropouts","Maintenance Automation":"Trigger-based work order generation based on mileage or engine hours","Database Storage":"Supabase + PostgreSQL with Timescale time-bucket aggregations","Compliance Standard":"ELD mandate compliant, driver duty hour logging and inspection logs"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-FLT02', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'SaaS Dashboards'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Client Hub & B2B Customer Portal', 
  'somya-client-collaboration-portal', 
  c.id, 
  'Eliminate messy email threads and status chasing with a branded B2B client portal. Clients securely sign in to view project delivery progress, review and accept commercial quotations, download tax invoices, and communicate directly with their dedicated delivery leads.', 
  '{"Branding System":"Custom domain, white-label company branding, custom accent colors","Authentication":"Passwordless Magic Links, OAuth 2.0, SAML SSO, Multi-Factor Auth","Security Model":"Row Level Security (RLS) ensuring strict tenant and client data isolation","Document Storage":"Presigned expiring download URLs via private Supabase Storage","Payments & Billing":"Stripe & Razorpay integrated invoice payments and receipts","Notification Engine":"In-app notifications, browser pushes, automated email alerts"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-CLP03', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'SaaS Dashboards'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya PeopleOps & Workforce Management SaaS', 
  'somya-hr-talent-suite', 
  c.id, 
  'Streamline human capital management from job posting to annual appraisal. Features a modern applicant tracking system (ATS), automated interview scheduling, digital document onboarding, leave management, and employee pulse surveys in an intuitive dark-themed interface.', 
  '{"Core Modules":"ATS, Onboarding, Leave Management, Performance, Employee Directory","Applicant Pipeline":"Kanban-style candidate stage progression with resume viewer","Calendar Integration":"Bi-directional Google & Outlook Calendar scheduling","Compliance Handling":"Labor law compliance, digital signature acknowledgement tracking","Role Hierarchy":"Employee self-service, manager approvals, HR admin, Executive oversight","Reporting Metrics":"Headcount growth, retention rates, hiring velocity, time-to-hire"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-HRP04', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'SaaS Dashboards'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Event-Driven Workflow Orchestrator', 
  'somya-workflow-orchestrator', 
  c.id, 
  'Connect siloed business systems with reliable event-driven orchestration. Handles complex asynchronous branching logic, automatic idempotency keys, exponential retry backoff, and dead-letter queues without requiring complex custom integration plumbing.', 
  '{"Runtime Engine":"Serverless Node/TypeScript micro-step execution engine","Throughput Capacity":"10,000+ workflow runs per second with horizontal worker scaling","Connectors":"REST APIs, GraphQL, PostgreSQL, Webhooks, AWS S3, Stripe, Slack","Reliability Guarantee":"Guaranteed at-least-once execution with idempotent request matching","Observability":"Visual node execution graphs with step input/output inspection","Trigger Latency":"Sub-50ms trigger-to-execution latency on cloud edge nodes"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-WFO01', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'Enterprise Automation'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Accounts Payable & Billing Automation', 
  'somya-intelligent-invoice-pipeline', 
  c.id, 
  'Accelerate finance operations by eliminating manual data entry. Invoices received via email, scan, or portal are instantly parsed, validated against purchase orders, audited for duplicates and tax discrepancies, and queued for finance team approval.', 
  '{"Parsing Pipeline":"OCR + LLM semantic extraction + programmatic validation rules","Reconciliation":"Automated 2-way and 3-way reconciliation (PO, Goods Receipt, Invoice)","ERP Connectors":"Native connectors for Tally, Zoho Books, SAP, QuickBooks, NetSuite","Audit Trail":"Every calculation and modification permanently logged with timestamp","Fraud Screening":"Bank account change alerts, duplicate submission detection","Currency Handling":"Multi-currency conversion with historical exchange rate lookup"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-INV02', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'Enterprise Automation'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Real-Time Data Streaming & Metric Engine', 
  'somya-realtime-telemetry-engine', 
  c.id, 
  'Ingest, transform, and analyze streaming data with microsecond precision. Built for high-volume telemetry applications, financial transaction monitoring, and infrastructure health tracking with dynamic threshold alerting.', 
  '{"Stream Protocols":"Apache Kafka, Apache Pulsar, Redis Streams, WebSocket Ingests","Processing Latency":"Sub-10 millisecond end-to-end analytical processing window","Storage Backend":"PostgreSQL with partitioned hypertable time-series storage","Query Interface":"Continuous materialized views with standard SQL compatibility","Visualization":"Live dashboards updating at 60 FPS without page refreshes","Clustering":"Multi-zone clustering with automatic failover and zero data loss"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-TEL01', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'Analytics & Intelligence'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Customer 360 & Behavioral Intelligence', 
  'somya-customer-journey-analytics', 
  c.id, 
  'Get complete visibility into customer acquisition, retention, and lifetime value. Unifies events from mobile apps, web portals, and support desks into single customer profiles to power precise segmentation and churn prevention.', 
  '{"Data Sources":"Client websites, mobile SDKs, CRM databases, support helpdesks","Identity Stitching":"Deterministic and probabilistic cross-device user identity stitching","Privacy Compliance":"GDPR, CCPA, and DPDP Act compliant with automated cookie consent hooks","Cohort Engine":"Behavioral cohort segmentation with dynamic re-calculation","Attribution Models":"Multi-touch attribution models (First-touch, Last-touch, Linear, Decay)","Storage Security":"Secure encrypted analytical data warehouse partition"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-C360', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'Analytics & Intelligence'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Zero-Trust Identity & API Security Gateway', 
  'somya-zero-trust-access-gateway', 
  c.id, 
  'Protect your proprietary APIs, microservices, and internal SaaS dashboards from unauthorized access and credential compromise. Enforces zero-trust principles on every single request with micro-segmentation, token introspection, and automated threat blocking.', 
  '{"Protocol Support":"HTTP/1.1, HTTP/2, gRPC, WebSocket proxy with mTLS encryption","Auth Integrations":"Supabase Auth, Okta, Azure AD, OAuth 2.0, OpenID Connect","Rate Limiting":"Distributed sliding-window rate limiting with IP reputation scoring","WAF Protection":"OWASP Top 10 mitigation, SQL injection & XSS automated scrubbing","Proxy Overhead":"Ultra-low <2ms proxy overhead on edge nodes","Audit Logging":"Tamper-evident cryptographic request and response audit logs"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-ZTG01', 
  'Private Cloud / On-Premise', 
  true
FROM public.product_categories c
WHERE c.name = 'Security & Governance'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Continuous Compliance & SOC2 Evidence Vault', 
  'somya-compliance-audit-vault', 
  c.id, 
  'Simplify annual audits and maintain continuous security posture. Automatically collects system configuration evidence, verifies database encryption and backup schedules, coordinates quarterly access reviews, and maintains an immutable audit trail.', 
  '{"Framework Coverage":"SOC 2 Type II, ISO 27001, HIPAA, PCI-DSS, GDPR, DPDP","Evidence Collection":"Automated daily cloud infrastructure and database posture tests","Storage Compliance":"WORM (Write Once Read Many) compliant immutable log vault","Access Reviews":"Automated user role certification workflows for department leads","Vendor Risk":"Vendor security assessment tracking with expiration reminders","Auditor View":"Read-only auditor access view with one-click evidence downloads"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-CPV02', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'Security & Governance'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Internal Developer Platform (IDP)', 
  'somya-microservices-developer-hub', 
  c.id, 
  'Empower engineering teams to ship faster while upholding architectural standards. Developers can spin up staging environments, register microservices, inspect distributed traces, and manage cloud credentials through an intuitive self-service hub.', 
  '{"Core Modules":"Service Catalog, Scaffold Templates, Docs-as-Code, CI/CD Insights","Cloud Compatibility":"AWS, Google Cloud, Azure, Docker, Kubernetes, Supabase","CI/CD Integration":"GitHub Actions, GitLab CI, ArgoCD, Jenkins","Architecture Docs":"Automated OpenAPI / Swagger and TechDocs visualization","Secret Management":"Vault integration with dynamic short-lived development credentials","Observability":"OpenTelemetry tracing integration with bottleneck analysis"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-IDP01', 
  'Custom Enterprise Setup', 
  true
FROM public.product_categories c
WHERE c.name = 'Developer Platforms'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;

INSERT INTO public.products (name, slug, category_id, description, specifications, brand, model, availability, is_active)
SELECT 
  'Somya Enterprise API Gateway & Monetization Suite', 
  'somya-api-management-suite', 
  c.id, 
  'Transform internal APIs into commercial revenue streams or secure partner integrations. Features a developer portal with interactive documentation, API key generation with granular quotas, and integrated usage-based billing.', 
  '{"API Protocols":"REST, GraphQL, gRPC with automatic OpenAPI schema generation","Metering Engine":"High-precision per-call metering and monthly quota tracking","Billing Integration":"Stripe Metered Billing, Razorpay subscriptions, prepaid credit wallets","Developer Portal":"Self-service key issuance, documentation, and interactive sandbox","Security Protocols":"HMAC signatures, mutual TLS, IP allowlisting, key rotation policies","Analytics Dashboard":"Endpoint latency distribution, error rate breakdown, revenue per API"}'::jsonb, 
  'Somya Enterprise', 
  'SOMYA-SFT-APM02', 
  'Ready for Deployment', 
  true
FROM public.product_categories c
WHERE c.name = 'Developer Platforms'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  description = EXCLUDED.description,
  specifications = EXCLUDED.specifications,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  availability = EXCLUDED.availability,
  is_active = EXCLUDED.is_active;
