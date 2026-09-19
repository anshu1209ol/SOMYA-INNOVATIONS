-- ==============================================================================
-- SOMYA INNOVATIONS — Complete Database Schema
-- Migration: 00001_initial_schema.sql
-- ==============================================================================
-- This migration creates all tables, functions, triggers, RLS policies,
-- and indexes for the Somya Innovations management platform.
-- ==============================================================================

-- ─── EXTENSIONS ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── CUSTOM TYPES (ENUMS) ──────────────────────────────────────────────────

-- Roles
CREATE TYPE app_role AS ENUM ('admin', 'ceo', 'tech_lead', 'employee', 'client');

-- Lead statuses
CREATE TYPE lead_status AS ENUM (
  'new', 'contacted', 'qualified', 'discussion',
  'quote_sent', 'negotiation', 'won', 'lost'
);

-- Lead priority
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Client statuses
CREATE TYPE client_status AS ENUM ('prospect', 'active', 'inactive', 'archived');

-- Quotation statuses
CREATE TYPE quotation_status AS ENUM (
  'draft', 'sent', 'viewed', 'negotiation',
  'accepted', 'rejected', 'expired'
);

-- Project statuses
CREATE TYPE project_status AS ENUM (
  'planning', 'active', 'on_hold', 'completed', 'cancelled'
);

-- Project member roles
CREATE TYPE project_member_role AS ENUM (
  'admin', 'project_manager', 'tech_lead', 'developer', 'designer', 'employee'
);

-- Task statuses (Kanban)
CREATE TYPE task_status AS ENUM (
  'backlog', 'todo', 'in_progress', 'code_review', 'testing', 'done'
);

-- Sprint statuses
CREATE TYPE sprint_status AS ENUM ('planning', 'active', 'completed');

-- Issue severity
CREATE TYPE issue_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Issue statuses
CREATE TYPE issue_status AS ENUM (
  'open', 'investigating', 'in_progress', 'resolved', 'closed'
);

-- Release statuses
CREATE TYPE release_status AS ENUM (
  'planned', 'in_development', 'testing', 'released', 'rolled_back'
);

-- Blog post statuses
CREATE TYPE blog_post_status AS ENUM ('draft', 'published', 'archived');

-- Job position statuses
CREATE TYPE job_status AS ENUM ('draft', 'published', 'closed');

-- Application statuses
CREATE TYPE application_status AS ENUM (
  'received', 'reviewing', 'shortlisted', 'interview', 'selected', 'rejected'
);

-- Contact submission statuses
CREATE TYPE contact_submission_status AS ENUM ('new', 'read', 'replied', 'closed');

-- Quote request statuses
CREATE TYPE quote_request_status AS ENUM ('new', 'read', 'replied', 'closed');

-- Document visibility
CREATE TYPE document_visibility AS ENUM ('private', 'project', 'organization', 'public');

-- Employment type
CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'internship');


-- ═══════════════════════════════════════════════════════════════════════════
-- TABLES
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── PROFILES ──────────────────────────────────────────────────────────────

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  job_title TEXT,
  department TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'User profiles linked to auth.users. One profile per authenticated user.';


-- ─── ROLES ─────────────────────────────────────────────────────────────────

CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name app_role NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  assigned_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

COMMENT ON TABLE public.user_roles IS 'Maps users to application roles. A user may have multiple roles.';


-- ─── LEADS ─────────────────────────────────────────────────────────────────

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT,
  source TEXT,
  service TEXT,
  description TEXT,
  status lead_status NOT NULL DEFAULT 'new',
  assigned_to UUID REFERENCES public.profiles(id),
  priority priority_level NOT NULL DEFAULT 'medium',
  estimated_value DECIMAL(12, 2),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL, -- e.g. 'created', 'assigned', 'status_changed', 'note_added'
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.lead_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── CLIENTS ───────────────────────────────────────────────────────────────

CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  industry TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  status client_status NOT NULL DEFAULT 'prospect',
  assigned_account_manager UUID REFERENCES public.profiles(id),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.client_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  designation TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── QUOTATIONS ────────────────────────────────────────────────────────────

-- Sequence for quotation numbering
CREATE SEQUENCE quotation_number_seq START 1001;

CREATE TABLE public.quotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_number TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients(id),
  lead_id UUID REFERENCES public.leads(id),
  title TEXT NOT NULL,
  description TEXT,
  status quotation_status NOT NULL DEFAULT 'draft',
  valid_until DATE,
  subtotal DECIMAL(14, 2) NOT NULL DEFAULT 0,
  tax DECIMAL(14, 2) NOT NULL DEFAULT 0,
  discount DECIMAL(14, 2) NOT NULL DEFAULT 0,
  total DECIMAL(14, 2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.quotation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_id UUID NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
  item_type TEXT DEFAULT 'service', -- 'service' or 'product'
  description TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(14, 2) NOT NULL DEFAULT 0,
  discount DECIMAL(14, 2) NOT NULL DEFAULT 0,
  tax DECIMAL(14, 2) NOT NULL DEFAULT 0,
  total DECIMAL(14, 2) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.quotation_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_id UUID NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
  old_status quotation_status,
  new_status quotation_status NOT NULL,
  changed_by UUID REFERENCES public.profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── PROJECTS ──────────────────────────────────────────────────────────────

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  client_id UUID REFERENCES public.clients(id),
  description TEXT,
  project_manager UUID REFERENCES public.profiles(id),
  tech_lead UUID REFERENCES public.profiles(id),
  start_date DATE,
  target_date DATE,
  status project_status NOT NULL DEFAULT 'planning',
  priority priority_level NOT NULL DEFAULT 'medium',
  progress INT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  budget DECIMAL(14, 2),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.project_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role project_member_role NOT NULL DEFAULT 'employee',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

CREATE TABLE public.project_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── TASKS ─────────────────────────────────────────────────────────────────

CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.profiles(id),
  created_by UUID REFERENCES public.profiles(id),
  priority priority_level NOT NULL DEFAULT 'medium',
  status task_status NOT NULL DEFAULT 'backlog',
  due_date DATE,
  estimated_hours DECIMAL(6, 2),
  actual_hours DECIMAL(6, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.task_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.task_assignees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(task_id, user_id)
);


-- ─── SPRINTS ───────────────────────────────────────────────────────────────

CREATE TABLE public.sprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  goal TEXT,
  start_date DATE,
  end_date DATE,
  status sprint_status NOT NULL DEFAULT 'planning',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.sprint_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sprint_id UUID NOT NULL REFERENCES public.sprints(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(sprint_id, task_id)
);


-- ─── TECHNICAL ISSUES ──────────────────────────────────────────────────────

CREATE TABLE public.technical_issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  severity issue_severity NOT NULL DEFAULT 'medium',
  status issue_status NOT NULL DEFAULT 'open',
  assigned_to UUID REFERENCES public.profiles(id),
  reported_by UUID REFERENCES public.profiles(id),
  environment TEXT,
  steps_to_reproduce TEXT,
  resolution TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.issue_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_id UUID NOT NULL REFERENCES public.technical_issues(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── RELEASES ──────────────────────────────────────────────────────────────

CREATE TABLE public.releases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version TEXT NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  release_name TEXT NOT NULL,
  description TEXT,
  release_date DATE,
  status release_status NOT NULL DEFAULT 'planned',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.release_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  release_id UUID NOT NULL REFERENCES public.releases(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL DEFAULT 'feature', -- 'feature', 'bugfix', 'improvement'
  description TEXT NOT NULL,
  task_id UUID REFERENCES public.tasks(id),
  issue_id UUID REFERENCES public.technical_issues(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── SERVICES ──────────────────────────────────────────────────────────────

CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  icon TEXT,
  image TEXT,
  features JSONB DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── PRODUCTS ──────────────────────────────────────────────────────────────

CREATE TABLE public.product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.product_categories(id),
  description TEXT,
  specifications JSONB DEFAULT '{}',
  images JSONB DEFAULT '[]',
  brand TEXT,
  model TEXT,
  availability TEXT DEFAULT 'Available on Order',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── CAREERS ───────────────────────────────────────────────────────────────

CREATE TABLE public.job_positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  employment_type employment_type NOT NULL DEFAULT 'full_time',
  description TEXT,
  requirements JSONB DEFAULT '[]',
  status job_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES public.job_positions(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status application_status NOT NULL DEFAULT 'received',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── BLOG ──────────────────────────────────────────────────────────────────

CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author_id UUID REFERENCES public.profiles(id),
  category_id UUID REFERENCES public.blog_categories(id),
  status blog_post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── DOCUMENTS ─────────────────────────────────────────────────────────────

CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  bucket TEXT NOT NULL,
  visibility document_visibility NOT NULL DEFAULT 'private',
  uploaded_by UUID REFERENCES public.profiles(id),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── NOTIFICATIONS ─────────────────────────────────────────────────────────

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── ACTIVITY LOGS ─────────────────────────────────────────────────────────

CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── ANNOUNCEMENTS ─────────────────────────────────────────────────────────

CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  type TEXT DEFAULT 'general', -- 'general', 'executive', 'technical'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES public.profiles(id),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── COMPANY SETTINGS ──────────────────────────────────────────────────────

CREATE TABLE public.company_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  category TEXT DEFAULT 'general',
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── CONTACT SUBMISSIONS ──────────────────────────────────────────────────

CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status contact_submission_status NOT NULL DEFAULT 'new',
  assigned_to UUID REFERENCES public.profiles(id),
  reference_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── QUOTE REQUESTS ───────────────────────────────────────────────────────

CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service_category TEXT,
  product_or_service TEXT,
  quantity TEXT,
  budget_range TEXT,
  message TEXT,
  status quote_request_status NOT NULL DEFAULT 'new',
  reference_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ═══════════════════════════════════════════════════════════════════════════
-- FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── GET USER ROLE ─────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = p_user_id
  ORDER BY
    CASE role
      WHEN 'admin' THEN 1
      WHEN 'ceo' THEN 2
      WHEN 'tech_lead' THEN 3
      WHEN 'employee' THEN 4
      WHEN 'client' THEN 5
    END
  LIMIT 1;
$$;

-- ─── HAS ROLE ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.has_role(p_user_id UUID, p_role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id AND role = p_role
  );
$$;

-- ─── IS ADMIN ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(p_user_id, 'admin');
$$;

-- ─── IS INTERNAL USER (admin, ceo, tech_lead, employee) ────────────────────

CREATE OR REPLACE FUNCTION public.is_internal_user(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id
      AND role IN ('admin', 'ceo', 'tech_lead', 'employee')
  );
$$;

-- ─── IS PROJECT MEMBER ─────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_project_member(p_user_id UUID, p_project_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.project_members
    WHERE user_id = p_user_id AND project_id = p_project_id
  );
$$;

-- ─── GENERATE QUOTATION NUMBER ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.generate_quotation_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_year TEXT;
  v_seq INT;
BEGIN
  v_year := to_char(now(), 'YYYY');
  v_seq := nextval('quotation_number_seq');
  RETURN 'SI-QTN-' || v_year || '-' || lpad(v_seq::TEXT, 4, '0');
END;
$$;

-- ─── CALCULATE QUOTATION TOTALS ────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.calculate_quotation_totals(p_quotation_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_subtotal DECIMAL(14,2);
  v_tax DECIMAL(14,2);
  v_discount DECIMAL(14,2);
BEGIN
  SELECT
    COALESCE(SUM(quantity * unit_price), 0),
    COALESCE(SUM(tax), 0),
    COALESCE(SUM(discount), 0)
  INTO v_subtotal, v_tax, v_discount
  FROM public.quotation_items
  WHERE quotation_id = p_quotation_id;

  UPDATE public.quotations
  SET
    subtotal = v_subtotal,
    tax = v_tax,
    discount = v_discount,
    total = v_subtotal + v_tax - v_discount,
    updated_at = now()
  WHERE id = p_quotation_id;
END;
$$;

-- ─── LOG ACTIVITY ──────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.log_activity(
  p_user_id UUID,
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id UUID DEFAULT NULL,
  p_description TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, description, metadata)
  VALUES (p_user_id, p_action, p_entity_type, p_entity_id, p_description, p_metadata)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

-- ─── HANDLE NEW USER (trigger) ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger: create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ─── UPDATED_AT TRIGGER ───────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply updated_at triggers to all tables with updated_at column
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.lead_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.quotations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.task_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.sprints FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.technical_issues FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.releases FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.job_positions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_assignees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sprint_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technical_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.release_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- ─── PROFILES POLICIES ────────────────────────────────────────────────────

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Internal users can view profiles"
  ON public.profiles FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── ROLES POLICIES ──────────────────────────────────────────────────────

CREATE POLICY "Anyone authenticated can view roles"
  ON public.roles FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- ─── USER ROLES POLICIES ─────────────────────────────────────────────────

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all user roles"
  ON public.user_roles FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── LEADS POLICIES ──────────────────────────────────────────────────────

CREATE POLICY "Admin full access to leads"
  ON public.leads FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "CEO can view leads"
  ON public.leads FOR SELECT
  USING (public.has_role(auth.uid(), 'ceo'));

CREATE POLICY "Employees can view assigned leads"
  ON public.leads FOR SELECT
  USING (assigned_to = auth.uid());

-- ─── LEAD ACTIVITIES POLICIES ─────────────────────────────────────────────

CREATE POLICY "Admin full access to lead activities"
  ON public.lead_activities FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "CEO can view lead activities"
  ON public.lead_activities FOR SELECT
  USING (public.has_role(auth.uid(), 'ceo'));

-- ─── LEAD NOTES POLICIES ─────────────────────────────────────────────────

CREATE POLICY "Admin full access to lead notes"
  ON public.lead_notes FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Authors can manage their own notes"
  ON public.lead_notes FOR ALL
  USING (user_id = auth.uid());

-- ─── CLIENTS POLICIES ────────────────────────────────────────────────────

CREATE POLICY "Admin full access to clients"
  ON public.clients FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "CEO can view clients"
  ON public.clients FOR SELECT
  USING (public.has_role(auth.uid(), 'ceo'));

CREATE POLICY "Internal users can view clients"
  ON public.clients FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── CLIENT CONTACTS POLICIES ─────────────────────────────────────────────

CREATE POLICY "Admin full access to client contacts"
  ON public.client_contacts FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Internal users can view client contacts"
  ON public.client_contacts FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── QUOTATIONS POLICIES ─────────────────────────────────────────────────

CREATE POLICY "Admin full access to quotations"
  ON public.quotations FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "CEO can view quotations"
  ON public.quotations FOR SELECT
  USING (public.has_role(auth.uid(), 'ceo'));

CREATE POLICY "Creators can manage their quotations"
  ON public.quotations FOR ALL
  USING (created_by = auth.uid());

-- ─── QUOTATION ITEMS POLICIES ─────────────────────────────────────────────

CREATE POLICY "Admin full access to quotation items"
  ON public.quotation_items FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Internal users can view quotation items"
  ON public.quotation_items FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── QUOTATION STATUS HISTORY POLICIES ────────────────────────────────────

CREATE POLICY "Admin full access to quotation history"
  ON public.quotation_status_history FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Internal users can view quotation history"
  ON public.quotation_status_history FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── PROJECTS POLICIES ───────────────────────────────────────────────────

CREATE POLICY "Admin full access to projects"
  ON public.projects FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "CEO can view projects"
  ON public.projects FOR SELECT
  USING (public.has_role(auth.uid(), 'ceo'));

CREATE POLICY "Tech lead can manage projects"
  ON public.projects FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Project members can view their projects"
  ON public.projects FOR SELECT
  USING (public.is_project_member(auth.uid(), id));

-- ─── PROJECT MEMBERS POLICIES ─────────────────────────────────────────────

CREATE POLICY "Admin full access to project members"
  ON public.project_members FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Tech lead can manage project members"
  ON public.project_members FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Members can view project members"
  ON public.project_members FOR SELECT
  USING (public.is_project_member(auth.uid(), project_id));

-- ─── PROJECT MILESTONES POLICIES ──────────────────────────────────────────

CREATE POLICY "Admin full access to milestones"
  ON public.project_milestones FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Tech lead can manage milestones"
  ON public.project_milestones FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Project members can view milestones"
  ON public.project_milestones FOR SELECT
  USING (public.is_project_member(auth.uid(), project_id));

-- ─── TASKS POLICIES ──────────────────────────────────────────────────────

CREATE POLICY "Admin full access to tasks"
  ON public.tasks FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Tech lead can manage tasks"
  ON public.tasks FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Assigned users can view and update tasks"
  ON public.tasks FOR SELECT
  USING (assigned_to = auth.uid());

CREATE POLICY "Assigned users can update their tasks"
  ON public.tasks FOR UPDATE
  USING (assigned_to = auth.uid());

CREATE POLICY "Project members can view project tasks"
  ON public.tasks FOR SELECT
  USING (project_id IS NOT NULL AND public.is_project_member(auth.uid(), project_id));

-- ─── TASK COMMENTS POLICIES ──────────────────────────────────────────────

CREATE POLICY "Admin full access to task comments"
  ON public.task_comments FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Authors can manage their task comments"
  ON public.task_comments FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Internal users can view task comments"
  ON public.task_comments FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── TASK ASSIGNEES POLICIES ─────────────────────────────────────────────

CREATE POLICY "Admin full access to task assignees"
  ON public.task_assignees FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Tech lead can manage task assignees"
  ON public.task_assignees FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Users can view their task assignments"
  ON public.task_assignees FOR SELECT
  USING (user_id = auth.uid());

-- ─── SPRINTS POLICIES ────────────────────────────────────────────────────

CREATE POLICY "Admin full access to sprints"
  ON public.sprints FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Tech lead can manage sprints"
  ON public.sprints FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Project members can view sprints"
  ON public.sprints FOR SELECT
  USING (public.is_project_member(auth.uid(), project_id));

-- ─── SPRINT TASKS POLICIES ───────────────────────────────────────────────

CREATE POLICY "Admin full access to sprint tasks"
  ON public.sprint_tasks FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Tech lead can manage sprint tasks"
  ON public.sprint_tasks FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Internal users can view sprint tasks"
  ON public.sprint_tasks FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── TECHNICAL ISSUES POLICIES ────────────────────────────────────────────

CREATE POLICY "Admin full access to issues"
  ON public.technical_issues FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Tech lead can manage issues"
  ON public.technical_issues FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Assigned users can view their issues"
  ON public.technical_issues FOR SELECT
  USING (assigned_to = auth.uid());

CREATE POLICY "Reporters can view their reported issues"
  ON public.technical_issues FOR SELECT
  USING (reported_by = auth.uid());

-- ─── ISSUE COMMENTS POLICIES ─────────────────────────────────────────────

CREATE POLICY "Admin full access to issue comments"
  ON public.issue_comments FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Authors can manage their issue comments"
  ON public.issue_comments FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Internal users can view issue comments"
  ON public.issue_comments FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── RELEASES POLICIES ───────────────────────────────────────────────────

CREATE POLICY "Admin full access to releases"
  ON public.releases FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Tech lead can manage releases"
  ON public.releases FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Internal users can view releases"
  ON public.releases FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── RELEASE ITEMS POLICIES ──────────────────────────────────────────────

CREATE POLICY "Admin full access to release items"
  ON public.release_items FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Tech lead can manage release items"
  ON public.release_items FOR ALL
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Internal users can view release items"
  ON public.release_items FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── SERVICES POLICIES (PUBLIC READ) ──────────────────────────────────────

CREATE POLICY "Anyone can view active services"
  ON public.services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage services"
  ON public.services FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── PRODUCT CATEGORIES POLICIES (PUBLIC READ) ────────────────────────────

CREATE POLICY "Anyone can view product categories"
  ON public.product_categories FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage product categories"
  ON public.product_categories FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── PRODUCTS POLICIES (PUBLIC READ) ──────────────────────────────────────

CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage products"
  ON public.products FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── JOB POSITIONS POLICIES (PUBLIC READ for published) ───────────────────

CREATE POLICY "Anyone can view published positions"
  ON public.job_positions FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admin can manage job positions"
  ON public.job_positions FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── JOB APPLICATIONS POLICIES ───────────────────────────────────────────

CREATE POLICY "Anyone can insert applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can manage applications"
  ON public.job_applications FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── BLOG CATEGORIES POLICIES (PUBLIC READ) ───────────────────────────────

CREATE POLICY "Anyone can view blog categories"
  ON public.blog_categories FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage blog categories"
  ON public.blog_categories FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── BLOG POSTS POLICIES ─────────────────────────────────────────────────

CREATE POLICY "Anyone can view published posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admin can manage all blog posts"
  ON public.blog_posts FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Authors can manage their draft posts"
  ON public.blog_posts FOR ALL
  USING (author_id = auth.uid());

-- ─── DOCUMENTS POLICIES ──────────────────────────────────────────────────

CREATE POLICY "Admin full access to documents"
  ON public.documents FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view their uploaded documents"
  ON public.documents FOR SELECT
  USING (uploaded_by = auth.uid());

CREATE POLICY "Project members can view project documents"
  ON public.documents FOR SELECT
  USING (
    project_id IS NOT NULL
    AND public.is_project_member(auth.uid(), project_id)
  );

CREATE POLICY "Users can upload documents"
  ON public.documents FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ─── NOTIFICATIONS POLICIES ──────────────────────────────────────────────

CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all notifications"
  ON public.notifications FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── ACTIVITY LOGS POLICIES ──────────────────────────────────────────────

CREATE POLICY "Admin can view all activity logs"
  ON public.activity_logs FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "CEO can view activity logs"
  ON public.activity_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'ceo'));

CREATE POLICY "Tech lead can view activity logs"
  ON public.activity_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'tech_lead'));

CREATE POLICY "Users can view their own activity"
  ON public.activity_logs FOR SELECT
  USING (user_id = auth.uid());

-- ─── ANNOUNCEMENTS POLICIES ──────────────────────────────────────────────

CREATE POLICY "Internal users can view active announcements"
  ON public.announcements FOR SELECT
  USING (
    is_active = true
    AND (expires_at IS NULL OR expires_at > now())
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Admin can manage announcements"
  ON public.announcements FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── COMPANY SETTINGS POLICIES ───────────────────────────────────────────

CREATE POLICY "Admin can manage company settings"
  ON public.company_settings FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Internal users can view company settings"
  ON public.company_settings FOR SELECT
  USING (public.is_internal_user(auth.uid()));

-- ─── CONTACT SUBMISSIONS POLICIES ────────────────────────────────────────

CREATE POLICY "Anyone can insert contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can manage contact submissions"
  ON public.contact_submissions FOR ALL
  USING (public.is_admin(auth.uid()));

-- ─── QUOTE REQUESTS POLICIES ─────────────────────────────────────────────

CREATE POLICY "Anyone can insert quote requests"
  ON public.quote_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can manage quote requests"
  ON public.quote_requests FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "CEO can view quote requests"
  ON public.quote_requests FOR SELECT
  USING (public.has_role(auth.uid(), 'ceo'));


-- ═══════════════════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════════════════

-- Profiles
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- User roles
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- Leads
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_priority ON public.leads(priority);
CREATE INDEX idx_leads_email ON public.leads(email);

-- Lead activities
CREATE INDEX idx_lead_activities_lead_id ON public.lead_activities(lead_id);

-- Clients
CREATE INDEX idx_clients_status ON public.clients(status);
CREATE INDEX idx_clients_email ON public.clients(email);
CREATE INDEX idx_clients_assigned_account_manager ON public.clients(assigned_account_manager);

-- Quotations
CREATE INDEX idx_quotations_client_id ON public.quotations(client_id);
CREATE INDEX idx_quotations_lead_id ON public.quotations(lead_id);
CREATE INDEX idx_quotations_status ON public.quotations(status);
CREATE INDEX idx_quotations_created_at ON public.quotations(created_at DESC);
CREATE INDEX idx_quotations_quotation_number ON public.quotations(quotation_number);

-- Quotation items
CREATE INDEX idx_quotation_items_quotation_id ON public.quotation_items(quotation_id);

-- Projects
CREATE INDEX idx_projects_client_id ON public.projects(client_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_created_at ON public.projects(created_at DESC);

-- Project members
CREATE INDEX idx_project_members_user_id ON public.project_members(user_id);
CREATE INDEX idx_project_members_project_id ON public.project_members(project_id);

-- Tasks
CREATE INDEX idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX idx_tasks_priority ON public.tasks(priority);
CREATE INDEX idx_tasks_created_at ON public.tasks(created_at DESC);

-- Sprints
CREATE INDEX idx_sprints_project_id ON public.sprints(project_id);
CREATE INDEX idx_sprints_status ON public.sprints(status);

-- Technical issues
CREATE INDEX idx_issues_project_id ON public.technical_issues(project_id);
CREATE INDEX idx_issues_assigned_to ON public.technical_issues(assigned_to);
CREATE INDEX idx_issues_status ON public.technical_issues(status);
CREATE INDEX idx_issues_severity ON public.technical_issues(severity);

-- Releases
CREATE INDEX idx_releases_project_id ON public.releases(project_id);
CREATE INDEX idx_releases_status ON public.releases(status);

-- Services
CREATE INDEX idx_services_slug ON public.services(slug);
CREATE INDEX idx_services_display_order ON public.services(display_order);

-- Products
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_category_id ON public.products(category_id);

-- Blog
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_author_id ON public.blog_posts(author_id);

-- Job positions
CREATE INDEX idx_job_positions_status ON public.job_positions(status);

-- Documents
CREATE INDEX idx_documents_uploaded_by ON public.documents(uploaded_by);
CREATE INDEX idx_documents_project_id ON public.documents(project_id);

-- Notifications
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

-- Activity logs
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity_type ON public.activity_logs(entity_type);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- Contact submissions
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);

-- Quote requests
CREATE INDEX idx_quote_requests_status ON public.quote_requests(status);
CREATE INDEX idx_quote_requests_created_at ON public.quote_requests(created_at DESC);


-- ═══════════════════════════════════════════════════════════════════════════
-- REALTIME
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable realtime for selective tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.technical_issues;
