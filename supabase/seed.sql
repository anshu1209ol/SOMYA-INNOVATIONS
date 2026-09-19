-- ==============================================================================
-- SOMYA INNOVATIONS — Seed Data (Development Only)
-- ==============================================================================
-- This seed file inserts safe default records.
-- Do NOT insert fake clients, revenue, testimonials, or business achievements.
-- Production database must be clean unless the company provides real data.
-- ==============================================================================

-- ─── DEFAULT ROLES ─────────────────────────────────────────────────────────

INSERT INTO public.roles (name, description) VALUES
  ('admin', 'Full administrative access to all modules'),
  ('ceo', 'Executive strategic access — view/overview oriented'),
  ('tech_lead', 'Technical project and engineering management access'),
  ('employee', 'Access only to explicitly assigned resources'),
  ('client', 'Access only to own projects, quotations, and documents')
ON CONFLICT (name) DO NOTHING;


-- ─── DEFAULT SERVICES (4 Pillars — No Trading) ────────────────────────────

INSERT INTO public.services (name, slug, short_description, description, icon, display_order, is_active) VALUES
  (
    'AI & Automation',
    'ai-automation',
    'Applied computer vision, intelligent document extraction, and event-driven automation for industrial and commercial operations.',
    'SOMYA INNOVATIONS builds practical AI systems for real business problems — computer vision for quality inspection, intelligent document processing, predictive maintenance, and workflow automation. We deploy on-premises edge inference nodes and cloud pipelines, focusing on measurable ROI rather than speculative AI claims.',
    'Brain',
    1,
    true
  ),
  (
    'IT Solutions',
    'it-solutions',
    'Campus networks, enterprise workstation fleets, server room staging, firewall hardening, and annual maintenance contracts.',
    'End-to-end IT infrastructure services including campus networking (fiber, managed switches, VLANs), enterprise workstation deployment, server room design and staging, firewall and VPN hardening, and comprehensive annual maintenance contracts. Local physical engineering presence with verified SLA commitments.',
    'Server',
    2,
    true
  ),
  (
    'Digital Solutions',
    'digital-solutions',
    'Full-stack Next.js platforms, operational dashboards, transactional APIs, and database migrations replacing spreadsheets.',
    'Custom digital platforms built with modern architectures — Next.js, TypeScript, PostgreSQL. We create operational dashboards, client portals, transactional APIs, and enterprise database systems that replace manual spreadsheet processes with automated, auditable workflows.',
    'Globe',
    3,
    true
  ),
  (
    'Technology Products',
    'technology-products',
    'Curated computing hardware, enterprise networking equipment, commercial displays, and software licensing.',
    'Curated technology product catalogue for enterprise deployments — workstation computing nodes, managed network switches, commercial display systems, security equipment, and software licensing. All sourced through validated OEM channels with warranty support.',
    'HardDrive',
    4,
    true
  )
ON CONFLICT (slug) DO NOTHING;


-- ─── DEFAULT PRODUCT CATEGORIES ────────────────────────────────────────────

INSERT INTO public.product_categories (name, slug, display_order) VALUES
  ('AI Solutions', 'ai-solutions', 1),
  ('SaaS Dashboards', 'saas-dashboards', 2),
  ('Enterprise Automation', 'enterprise-automation', 3),
  ('Analytics & Intelligence', 'analytics-intelligence', 4),
  ('Security & Governance', 'security-governance', 5),
  ('Developer Platforms', 'developer-platforms', 6)
ON CONFLICT (name) DO NOTHING;


-- ─── DEFAULT COMPANY SETTINGS ──────────────────────────────────────────────

INSERT INTO public.company_settings (key, value, category) VALUES
  ('company_name', 'SOMYA INNOVATIONS', 'general'),
  ('tagline', 'Technology • AI • IT Solutions', 'general'),
  ('email', 'contact@somyainnovations.com', 'contact'),
  ('phone', '', 'contact'),
  ('address', '', 'contact'),
  ('business_hours', 'Monday – Saturday, 9:00 AM – 6:00 PM IST', 'contact'),
  ('linkedin', '', 'social'),
  ('instagram', '', 'social'),
  ('facebook', '', 'social'),
  ('youtube', '', 'social'),
  ('github', '', 'social'),
  ('default_quotation_validity_days', '30', 'quotation'),
  ('default_tax_percentage', '18', 'quotation'),
  ('quotation_terms', 'Standard terms and conditions apply. Quotation valid for the period specified.', 'quotation')
ON CONFLICT (key) DO NOTHING;


-- ─── DEFAULT BLOG CATEGORIES ──────────────────────────────────────────────

INSERT INTO public.blog_categories (name, slug) VALUES
  ('AI & Machine Learning', 'ai-ml'),
  ('IT Infrastructure', 'it-infrastructure'),
  ('Digital Transformation', 'digital-transformation'),
  ('Technology Products', 'technology-products'),
  ('Industry Insights', 'industry-insights'),
  ('Company Updates', 'company-updates')
ON CONFLICT (name) DO NOTHING;
