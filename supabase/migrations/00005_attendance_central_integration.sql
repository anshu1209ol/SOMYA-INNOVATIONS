-- ==============================================================================
-- SOMYA INNOVATIONS — Central Workforce & Attendance Integration
-- Migration: 00005_attendance_central_integration.sql
-- ==============================================================================
-- Integrates existing attendance tables (employees, attendance_punches, leave_requests)
-- with central management profiles, lifecycle statuses, and strict RLS permissions.
-- ==============================================================================

-- ─── 1. ENSURE PROFILES & EMPLOYEES LINKING ───────────────────────────────────

-- Add foreign key constraint if not already linked
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'employees_user_id_fkey' AND table_name = 'employees'
  ) THEN
    ALTER TABLE public.employees
      ADD CONSTRAINT employees_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES public.profiles(id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- ─── 2. AUTOMATIC SYNC BETWEEN PROFILES AND EMPLOYEES ─────────────────────────

-- Trigger function: when a profile is inserted or updated in the management system,
-- ensure the employee directory automatically stays in sync.
CREATE OR REPLACE FUNCTION public.sync_profile_to_employee()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_emp_id TEXT;
BEGIN
  -- If profile is terminated, set employee status to Absent and update hours/status
  IF NEW.status = 'terminated' OR NEW.is_active = false THEN
    UPDATE public.employees
    SET status = 'Absent',
        updated_at = now()
    WHERE user_id = NEW.id;
    RETURN NEW;
  END IF;

  -- Check if employee record already exists for this user_id
  SELECT id INTO v_emp_id FROM public.employees WHERE user_id = NEW.id;

  IF v_emp_id IS NOT NULL THEN
    -- Update existing employee details
    UPDATE public.employees
    SET name = COALESCE(NEW.full_name, name),
        role = COALESCE(NEW.job_title, role),
        dept = COALESCE(NEW.department, dept),
        avatar = COALESCE(NEW.avatar_url, avatar),
        updated_at = now()
    WHERE id = v_emp_id;
  ELSE
    -- If no record linked by user_id, check if employee exists with matching name
    SELECT id INTO v_emp_id FROM public.employees WHERE name = NEW.full_name LIMIT 1;
    
    IF v_emp_id IS NOT NULL THEN
      UPDATE public.employees
      SET user_id = NEW.id,
          role = COALESCE(NEW.job_title, role),
          dept = COALESCE(NEW.department, dept),
          avatar = COALESCE(NEW.avatar_url, avatar),
          updated_at = now()
      WHERE id = v_emp_id;
    ELSE
      -- Generate next employee ID e.g. EMP-1010
      v_emp_id := 'EMP-' || (1000 + (SELECT count(*) FROM public.employees) + 1)::text;
      
      INSERT INTO public.employees (
        id, user_id, name, role, dept, status, check_in, check_out, hours, location, avatar
      ) VALUES (
        v_emp_id,
        NEW.id,
        COALESCE(NEW.full_name, 'Staff Member'),
        COALESCE(NEW.job_title, 'Operations Engineer'),
        COALESCE(NEW.department, 'Digital Engineering'),
        'Present',
        '09:00 AM',
        '--',
        '8h 00m',
        'HQ - Somya Tower',
        COALESCE(NEW.avatar_url, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80')
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_profile_to_employee ON public.profiles;
CREATE TRIGGER trg_sync_profile_to_employee
AFTER INSERT OR UPDATE OF full_name, job_title, department, avatar_url, status, is_active
ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_profile_to_employee();

-- ─── 3. LEAVE APPROVAL AUTOMATIC ATTENDANCE SYNC ─────────────────────────────

-- When a leave request is marked as Approved, automatically reflect employee as 'On Leave'
CREATE OR REPLACE FUNCTION public.sync_approved_leave_to_attendance()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.status = 'Approved' THEN
    IF NEW.employee_id IS NOT NULL THEN
      UPDATE public.employees
      SET status = 'On Leave',
          check_in = '--',
          check_out = '--',
          hours = '0h 00m',
          location = 'Approved Leave (' || NEW.type || ')',
          updated_at = now()
      WHERE id = NEW.employee_id;
    ELSE
      UPDATE public.employees
      SET status = 'On Leave',
          check_in = '--',
          check_out = '--',
          hours = '0h 00m',
          location = 'Approved Leave (' || NEW.type || ')',
          updated_at = now()
      WHERE name = NEW.employee_name;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_approved_leave_to_attendance ON public.leave_requests;
CREATE TRIGGER trg_sync_approved_leave_to_attendance
AFTER INSERT OR UPDATE OF status
ON public.leave_requests
FOR EACH ROW
EXECUTE FUNCTION public.sync_approved_leave_to_attendance();

-- ─── 4. STRICT ROW LEVEL SECURITY (RLS) POLICIES ─────────────────────────────

-- Drop loose policies
DROP POLICY IF EXISTS "Allow public read for employee attendance directory" ON public.employees;
DROP POLICY IF EXISTS "Allow all modifications for authenticated/service role on employees" ON public.employees;
DROP POLICY IF EXISTS "Allow read for attendance punches" ON public.attendance_punches;
DROP POLICY IF EXISTS "Allow modifications for attendance punches" ON public.attendance_punches;
DROP POLICY IF EXISTS "Allow read for leave requests" ON public.leave_requests;
DROP POLICY IF EXISTS "Allow modifications for leave requests" ON public.leave_requests;

-- EMPLOYEES TABLE POLICIES
-- Tech Lead, Admin, CEO, and active Employees can view the workforce directory
CREATE POLICY "Internal workforce can view employee directory"
  ON public.employees FOR SELECT
  TO authenticated
  USING (
    public.is_account_active(auth.uid()) AND (
      public.has_role(auth.uid(), 'tech_lead') OR
      public.has_role(auth.uid(), 'admin') OR
      public.has_role(auth.uid(), 'ceo') OR
      public.has_role(auth.uid(), 'employee')
    )
  );

-- Only Tech Lead and Admin can modify employee records directly
CREATE POLICY "Tech Lead and Admin can manage employee records"
  ON public.employees FOR ALL
  TO authenticated
  USING (
    public.is_account_active(auth.uid()) AND (
      public.has_role(auth.uid(), 'tech_lead') OR
      public.has_role(auth.uid(), 'admin') OR
      public.has_permission(auth.uid(), 'attendance.manage')
    )
  )
  WITH CHECK (
    public.is_account_active(auth.uid()) AND (
      public.has_role(auth.uid(), 'tech_lead') OR
      public.has_role(auth.uid(), 'admin') OR
      public.has_permission(auth.uid(), 'attendance.manage')
    )
  );

-- ATTENDANCE PUNCHES POLICIES
-- Tech Lead, Admin, and CEO can read all shift punches; Employees can read their own
CREATE POLICY "Authorized personnel can view attendance punches"
  ON public.attendance_punches FOR SELECT
  TO authenticated
  USING (
    public.is_account_active(auth.uid()) AND (
      public.has_role(auth.uid(), 'tech_lead') OR
      public.has_role(auth.uid(), 'admin') OR
      public.has_role(auth.uid(), 'ceo') OR
      employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    )
  );

-- Tech Lead, Admin, and individual employee can insert punch records
CREATE POLICY "Authorized personnel can record punches"
  ON public.attendance_punches FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_account_active(auth.uid()) AND (
      public.has_role(auth.uid(), 'tech_lead') OR
      public.has_role(auth.uid(), 'admin') OR
      employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    )
  );

-- Tech Lead and Admin can update shift punches
CREATE POLICY "Tech Lead and Admin can update punches"
  ON public.attendance_punches FOR UPDATE
  TO authenticated
  USING (
    public.is_account_active(auth.uid()) AND (
      public.has_role(auth.uid(), 'tech_lead') OR
      public.has_role(auth.uid(), 'admin') OR
      public.has_permission(auth.uid(), 'attendance.manage')
    )
  );

-- LEAVE REQUESTS POLICIES
-- Tech Lead, Admin, CEO, and individual employee can view leave requests
CREATE POLICY "Authorized personnel can view leave requests"
  ON public.leave_requests FOR SELECT
  TO authenticated
  USING (
    public.is_account_active(auth.uid()) AND (
      public.has_role(auth.uid(), 'tech_lead') OR
      public.has_role(auth.uid(), 'admin') OR
      public.has_role(auth.uid(), 'ceo') OR
      employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    )
  );

-- Employees, Tech Lead, Admin can create leave requests
CREATE POLICY "Internal workforce can submit leave requests"
  ON public.leave_requests FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_account_active(auth.uid()) AND (
      public.has_role(auth.uid(), 'tech_lead') OR
      public.has_role(auth.uid(), 'admin') OR
      public.has_role(auth.uid(), 'employee')
    )
  );

-- Only Tech Lead and Admin can action/update leave requests
CREATE POLICY "Tech Lead and Admin can action leave requests"
  ON public.leave_requests FOR UPDATE
  TO authenticated
  USING (
    public.is_account_active(auth.uid()) AND (
      public.has_role(auth.uid(), 'tech_lead') OR
      public.has_role(auth.uid(), 'admin') OR
      public.has_permission(auth.uid(), 'attendance.manage')
    )
  );
