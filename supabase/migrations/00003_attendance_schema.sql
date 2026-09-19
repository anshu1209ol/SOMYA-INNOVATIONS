-- ==============================================================================
-- SOMYA INNOVATIONS — Attendance & Workforce Management Schema
-- Migration: 00003_attendance_schema.sql
-- ==============================================================================

-- ─── 1. EMPLOYEES TABLE ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.employees (
  id TEXT PRIMARY KEY, -- e.g. 'EMP-1001'
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  dept TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Present' CHECK (status IN ('Present', 'Remote', 'Late', 'On Leave', 'Absent')),
  check_in TEXT DEFAULT '09:00 AM',
  check_out TEXT DEFAULT '--',
  hours TEXT DEFAULT '8h 00m',
  location TEXT NOT NULL DEFAULT 'HQ - Somya Tower',
  avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.employees IS 'Workforce directory and current day attendance statuses.';

-- ─── 2. ATTENDANCE PUNCHES / SHIFTS TABLE ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.attendance_punches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id TEXT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  punch_in TIMESTAMPTZ NOT NULL DEFAULT now(),
  punch_out TIMESTAMPTZ,
  duration TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.attendance_punches IS 'Historical and active clock-in/clock-out punch records.';

-- ─── 3. LEAVE REQUESTS TABLE ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leave_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id TEXT REFERENCES public.employees(id) ON DELETE SET NULL,
  employee_name TEXT NOT NULL,
  dept TEXT NOT NULL,
  dates TEXT NOT NULL,
  reason TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Casual Leave',
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  actioned_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.leave_requests IS 'Employee leave requests and approval workflows.';

-- ─── 4. ROW LEVEL SECURITY (RLS) ───────────────────────────────────────────────
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_punches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;

-- Read policies: allow all internal staff and authenticated portal users
CREATE POLICY "Allow public read for employee attendance directory"
  ON public.employees FOR SELECT
  USING (true);

CREATE POLICY "Allow all modifications for authenticated/service role on employees"
  ON public.employees FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow read for attendance punches"
  ON public.attendance_punches FOR SELECT
  USING (true);

CREATE POLICY "Allow modifications for attendance punches"
  ON public.attendance_punches FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow read for leave requests"
  ON public.leave_requests FOR SELECT
  USING (true);

CREATE POLICY "Allow modifications for leave requests"
  ON public.leave_requests FOR ALL
  USING (true)
  WITH CHECK (true);

-- ─── 5. SEED INITIAL WORKFORCE DATA ────────────────────────────────────────────
INSERT INTO public.employees (id, name, role, dept, status, check_in, check_out, hours, location, avatar)
VALUES
  ('EMP-1001', 'Aarav Sharma', 'Lead AI Engineer', 'AI Engineering', 'Present', '09:02 AM', '--', '7h 45m', 'HQ - Floor 4', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'),
  ('EMP-1002', 'Priya Patel', 'Cloud Architect', 'IT Infrastructure', 'Present', '08:55 AM', '--', '7h 52m', 'HQ - Floor 3', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'),
  ('EMP-1003', 'Rohan Verma', 'Cybersecurity Analyst', 'Security', 'Late', '10:15 AM', '--', '6h 32m', 'HQ - Floor 2', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'),
  ('EMP-1004', 'Ananya Iyer', 'Full Stack Engineer', 'Digital Engineering', 'Remote', '09:00 AM', '--', '7h 47m', 'Remote - Bengaluru', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'),
  ('EMP-1005', 'Vikram Malhotra', 'Enterprise Sales Director', 'Sales & Client Success', 'Present', '08:45 AM', '--', '8h 02m', 'Client Site - Delhi', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'),
  ('EMP-1006', 'Neha Gupta', 'ML Operations Lead', 'AI Engineering', 'On Leave', '--', '--', '0h 00m', 'Medical Leave', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80'),
  ('EMP-1007', 'Karan Singh', 'DevOps Engineer', 'IT Infrastructure', 'Present', '09:10 AM', '--', '7h 37m', 'HQ - Floor 3', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80'),
  ('EMP-1008', 'Sneha Reddy', 'UI/UX Product Designer', 'Digital Engineering', 'Absent', '--', '--', '0h 00m', 'Unexcused', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'),
  ('EMP-1009', 'Aditya Nair', 'Data Scientist', 'AI Engineering', 'Present', '08:58 AM', '--', '7h 49m', 'HQ - Floor 4', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  dept = EXCLUDED.dept,
  status = EXCLUDED.status,
  check_in = EXCLUDED.check_in,
  check_out = EXCLUDED.check_out,
  hours = EXCLUDED.hours,
  location = EXCLUDED.location,
  avatar = EXCLUDED.avatar;

INSERT INTO public.leave_requests (employee_name, dept, dates, reason, type, status)
VALUES
  ('Neha Gupta', 'AI Engineering', 'Sep 18 - Sep 20', 'Medical Leave', 'Sick Leave', 'Pending'),
  ('Kunal Mehra', 'IT Infrastructure', 'Sep 22 - Sep 25', 'Conference Attendance', 'Duty Leave', 'Pending'),
  ('Meera Deshmukh', 'Digital Engineering', 'Oct 01 - Oct 05', 'Annual Vacation', 'Casual Leave', 'Pending');
