-- ==============================================================================
-- SOMYA INNOVATIONS — Internal Management System Schema Extension
-- Migration: 00004_internal_management_system.sql
-- ==============================================================================
-- Additive migration: Preserves all existing tables and data.
-- ==============================================================================

-- ─── 1. USER STATUS & LIFECYCLE EXTENSIONS ON PROFILES ─────────────────────────

-- Ensure status column exists with check constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'status'
  ) THEN
    ALTER TABLE public.profiles
      ADD COLUMN status TEXT NOT NULL DEFAULT 'active'
      CHECK (status IN ('invited', 'active', 'suspended', 'terminated'));
  END IF;

  -- Add termination tracking columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'terminated_at'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN terminated_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'terminated_by'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN terminated_by UUID REFERENCES public.profiles(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'termination_reason'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN termination_reason TEXT;
  END IF;

  -- Add suspension tracking columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'suspended_at'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN suspended_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'suspended_by'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN suspended_by UUID REFERENCES public.profiles(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'suspension_reason'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN suspension_reason TEXT;
  END IF;

  -- Add joining date and last login tracking
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'joining_date'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN joining_date DATE DEFAULT CURRENT_DATE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'last_login_at'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN last_login_at TIMESTAMPTZ;
  END IF;
END $$;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 2. IMMUTABLE AUDIT LOGS TABLE ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  reason TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.audit_logs IS 'Immutable compliance and security audit log. Records cannot be updated or deleted.';

-- ─── 3. PERMISSION SYSTEM & ROLE-PERMISSION MAPPINGS ──────────────────────────

CREATE TABLE IF NOT EXISTS public.permissions (
  name TEXT PRIMARY KEY,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.permissions IS 'Catalog of discrete permissions in SOMYA internal platform.';

CREATE TABLE IF NOT EXISTS public.role_permissions (
  role app_role NOT NULL,
  permission_name TEXT NOT NULL REFERENCES public.permissions(name) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (role, permission_name)
);

COMMENT ON TABLE public.role_permissions IS 'Maps application roles to granular permissions.';

-- Seed standard permissions catalog
INSERT INTO public.permissions (name, description, category) VALUES
  ('system.manage', 'Full control over system settings, telemetry and security', 'system'),
  ('technical.manage', 'Manage engineering architecture, releases and issues', 'engineering'),
  ('users.view', 'View workforce directory and profile records', 'people'),
  ('users.create', 'Invite or provision new employee accounts', 'people'),
  ('users.edit', 'Update employee job title, department and details', 'people'),
  ('users.suspend', 'Temporarily suspend user access', 'people'),
  ('users.terminate', 'Permanently terminate user access with reason and audit log', 'people'),
  ('roles.view', 'View role assignments and permissions', 'access'),
  ('roles.assign', 'Assign or revoke roles from users', 'access'),
  ('projects.view', 'View enterprise projects and roadmaps', 'projects'),
  ('projects.create', 'Create new company projects', 'projects'),
  ('projects.edit', 'Modify existing project parameters and status', 'projects'),
  ('projects.delete', 'Archive or delete projects', 'projects'),
  ('tasks.view', 'View project tasks and backlog items', 'tasks'),
  ('tasks.create', 'Create tasks within projects', 'tasks'),
  ('tasks.edit', 'Update task scope, assignment and priority', 'tasks'),
  ('tasks.assign', 'Assign tasks to team members', 'tasks'),
  ('sprints.manage', 'Plan, start and complete engineering sprints', 'engineering'),
  ('issues.manage', 'Track, investigate and resolve technical issues', 'engineering'),
  ('releases.manage', 'Publish and track software release versions', 'engineering'),
  ('attendance.view', 'Inspect employee attendance logs and percentages', 'workforce'),
  ('attendance.manage', 'Approve leave requests and adjust shift punches', 'workforce'),
  ('leads.manage', 'Manage incoming commercial enquiries and proposals', 'business'),
  ('clients.manage', 'Manage enterprise client directory and contacts', 'business'),
  ('quotations.manage', 'Draft, send and manage formal price quotations', 'business'),
  ('audit.view', 'Inspect immutable security and administrative audit records', 'compliance'),
  ('reports.view', 'View operational, strategic and financial summaries', 'reporting'),
  ('executive.view', 'Access executive briefing and strategic priorities', 'executive'),
  ('company.settings', 'Manage organization settings and company announcements', 'company')
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category;

-- Seed role-permission assignments
-- TECH LEAD: Highest technical and system authority
INSERT INTO public.role_permissions (role, permission_name) VALUES
  ('tech_lead', 'system.manage'),
  ('tech_lead', 'technical.manage'),
  ('tech_lead', 'users.view'),
  ('tech_lead', 'users.create'),
  ('tech_lead', 'users.edit'),
  ('tech_lead', 'users.suspend'),
  ('tech_lead', 'users.terminate'),
  ('tech_lead', 'roles.view'),
  ('tech_lead', 'roles.assign'),
  ('tech_lead', 'projects.view'),
  ('tech_lead', 'projects.create'),
  ('tech_lead', 'projects.edit'),
  ('tech_lead', 'projects.delete'),
  ('tech_lead', 'tasks.view'),
  ('tech_lead', 'tasks.create'),
  ('tech_lead', 'tasks.edit'),
  ('tech_lead', 'tasks.assign'),
  ('tech_lead', 'sprints.manage'),
  ('tech_lead', 'issues.manage'),
  ('tech_lead', 'releases.manage'),
  ('tech_lead', 'attendance.view'),
  ('tech_lead', 'audit.view'),
  ('tech_lead', 'reports.view'),
  ('tech_lead', 'company.settings')
ON CONFLICT DO NOTHING;

-- CEO: Executive and commercial authority
INSERT INTO public.role_permissions (role, permission_name) VALUES
  ('ceo', 'executive.view'),
  ('ceo', 'projects.view'),
  ('ceo', 'users.view'),
  ('ceo', 'attendance.view'),
  ('ceo', 'leads.manage'),
  ('ceo', 'clients.manage'),
  ('ceo', 'quotations.manage'),
  ('ceo', 'reports.view'),
  ('ceo', 'audit.view'),
  ('ceo', 'company.settings')
ON CONFLICT DO NOTHING;

-- ADMIN: Operations, business pipeline and workforce management
INSERT INTO public.role_permissions (role, permission_name) VALUES
  ('admin', 'leads.manage'),
  ('admin', 'clients.manage'),
  ('admin', 'quotations.manage'),
  ('admin', 'projects.view'),
  ('admin', 'projects.create'),
  ('admin', 'projects.edit'),
  ('admin', 'tasks.view'),
  ('admin', 'tasks.create'),
  ('admin', 'tasks.edit'),
  ('admin', 'tasks.assign'),
  ('admin', 'users.view'),
  ('admin', 'attendance.view'),
  ('admin', 'attendance.manage'),
  ('admin', 'reports.view'),
  ('admin', 'company.settings')
ON CONFLICT DO NOTHING;

-- EMPLOYEE: Personal task view, shift punch, leave request
INSERT INTO public.role_permissions (role, permission_name) VALUES
  ('employee', 'tasks.view'),
  ('employee', 'projects.view')
ON CONFLICT DO NOTHING;

-- ─── 4. SECURITY DEFINER HELPER FUNCTIONS ─────────────────────────────────────

-- Check if user has explicit permission
CREATE OR REPLACE FUNCTION public.has_permission(p_user_id UUID, p_permission TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role = rp.role
    WHERE ur.user_id = p_user_id
      AND rp.permission_name = p_permission
  );
$$;

-- Check if user account is currently active (not terminated or suspended)
CREATE OR REPLACE FUNCTION public.is_account_active(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = p_user_id
      AND status = 'active'
      AND is_active = true
  );
$$;

-- ─── 5. ROW LEVEL SECURITY (RLS) POLICIES FOR AUDIT LOGS ──────────────────────

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Permissions are readable by any authenticated user
CREATE POLICY "Permissions viewable by authenticated users"
  ON public.permissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Role permissions viewable by authenticated users"
  ON public.role_permissions FOR SELECT
  TO authenticated
  USING (true);

-- Audit logs: Read allowed for users with audit.view permission
CREATE POLICY "Audit logs viewable by authorized internal personnel"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (
    public.has_permission(auth.uid(), 'audit.view')
    OR public.has_role(auth.uid(), 'tech_lead')
    OR public.has_role(auth.uid(), 'ceo')
    OR public.has_role(auth.uid(), 'admin')
  );

-- Audit logs: Insert allowed for system actions / authenticated users
CREATE POLICY "Audit logs insertable by authenticated users"
  ON public.audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (actor_id = auth.uid() OR actor_id IS NULL);
