# SOMYA INNOVATIONS

> Technology for a smarter tomorrow.

Central reference for the SOMYA INNOVATIONS public website, authentication, management portals, Supabase architecture, attendance integration, security, SEO, routes, and implementation rules.

## Important Links

### Public
- Website: https://www.somyainnovations.in/
- About: https://www.somyainnovations.in/about
- AI & Automation: https://www.somyainnovations.in/solutions/ai-automation
- IT Solutions: https://www.somyainnovations.in/solutions/it-solutions
- Digital Solutions: https://www.somyainnovations.in/solutions/digital-solutions
- Products: https://www.somyainnovations.in/products
- Industries: https://www.somyainnovations.in/industries
- Work: https://www.somyainnovations.in/work
- Resources: https://www.somyainnovations.in/resources
- Careers: https://www.somyainnovations.in/careers
- Contact: https://www.somyainnovations.in/contact
- Request Quote: https://www.somyainnovations.in/request-quote

### Authentication
- Unified Login: https://www.somyainnovations.in/login
- Unauthorized: https://www.somyainnovations.in/unauthorized

### Private Management
| Portal | URL | Purpose |
|---|---|---|
| Admin | https://www.somyainnovations.in/admin | Business and operational management |
| CEO | https://www.somyainnovations.in/ceo | Executive dashboard and strategy |
| Tech Lead | https://www.somyainnovations.in/tech-lead | Technical/system command center |
| Attendance | https://www.somyainnovations.in/admin/attendance | Integrated attendance management |

> There is **one login only**. Never create separate Admin, CEO, Tech Lead, or Attendance login pages.

### SEO
- Sitemap: https://www.somyainnovations.in/sitemap.xml
- Robots: https://www.somyainnovations.in/robots.txt
- Google Search Console property: `somyainnovations.in`

---

## 1. Company Scope

Current focus:
1. AI & Automation
2. IT Solutions
3. Digital Solutions
4. Technology Products

**Trading is not part of the current scope.** Do not add Trading, Trading & Procurement, or trading-related navigation/forms unless explicitly requested.

---

## 2. Design System

### Visual Direction
Quiet luxury + technology + precision + trust. Avoid generic SaaS, cyberpunk, neon, college-project, freelancer-portfolio, or generic AI-startup visuals.

### Colors

**No blue anywhere** unless explicitly approved.

| Color | Hex |
|---|---|
| Warm Beige | `#F1EBDD` |
| Light Beige | `#E8DFCF` |
| Warm Black | `#11110F` |
| Soft Black | `#1B1B18` |
| Burgundy | `#641F2A` |
| Deep Burgundy | `#45151D` |
| Muted Olive | `#68704A` |
| Dark Olive | `#4D5437` |

Approximate balance: Beige 60%, Black 25%, Burgundy 8%, Olive 7%.

Avoid blue, cyan, purple, violet, and neon gradients.

### Typography
Preferred: Manrope, DM Sans, Inter. Optional editorial accent: Instrument Serif. Avoid futuristic display fonts.

Header brand `SOMYA INNOVATIONS` should use a clean modern bold sans-serif.

### Animation
Use restrained fade/reveal, image transitions, hover movement, underline, and subtle page transitions. Respect `prefers-reduced-motion`.

---

## 3. Homepage

Approved hero direction:

**Eyebrow**
> TECHNOLOGY FOR A SMARTER TOMORROW

**Heading**
> Technology built around how your business works.

**Copy**
> We design and deliver practical technology solutions across AI, IT infrastructure and digital products—built around real business requirements.

**CTAs**
- Explore Solutions →
- Start a Conversation

**Services**
- AI & AUTOMATION
- IT SOLUTIONS
- DIGITAL SOLUTIONS
- TECHNOLOGY PRODUCTS

Visual direction: professional dark workspace, laptop/workstation, city/architectural environment, large diagonal burgundy geometric element.

Right-side vertical text:
`SOLVE / BUILD / INNOVATE / GROW`

Bottom-right:
`BUILDING / MEANINGFUL / SOLUTIONS`

Do not add unrelated hero elements.

---

## 4. Public Routes

```text
/
├── /about
├── /solutions/ai-automation
├── /solutions/it-solutions
├── /solutions/digital-solutions
├── /products
│   └── /products/[slug]
├── /industries
├── /work
├── /resources
│   └── /resources/[slug]
├── /careers
│   └── /careers/[slug]
├── /contact
├── /request-quote
└── /privacy-policy
    /terms
    /refund-policy
    /cookie-policy
```

Private:
```text
/login
/admin/*
/ceo/*
/tech-lead/*
```

---

## 5. Unified Authentication

Flow:

```text
/login
   ↓
Supabase Auth
   ↓
Profile + Role + Status + Permissions
   ├── tech_lead → /tech-lead
   ├── ceo       → /ceo
   ├── admin     → /admin
   ├── employee  → employee portal (future)
   └── client    → client portal (future)
```

Role must come from the database. Never route by email, username, localStorage, or hardcoded users.

If a logged-in user visits `/login`, redirect to their authorized dashboard.

If logged out and opening a protected route:
`→ /login`

If authenticated but unauthorized:
`→ /unauthorized`

---

## 6. Role Hierarchy

### Tech Lead
Highest technical/system authority:
- People and access
- Roles and permissions
- Projects, tasks, sprints, issues, releases
- Authentication, database, storage, integrations
- System health
- Audit logs
- Technical documentation
- Suspend/terminate users

### CEO
Executive authority:
- Clients
- Opportunities
- Projects
- Quotations
- Team overview
- Strategic roadmap
- Priorities
- Announcements
- Business/project reports

### Admin
Operational/business management:
- Leads
- Clients
- Quotations
- Projects
- Tasks
- Team
- Attendance
- Leave
- Departments
- Services
- Products
- Careers
- Resources
- Documents
- Reports
- Analytics
- Activity
- Notifications
- Settings

### Employee
Future portal with assigned work, own attendance, projects/tasks, and explicitly granted permissions.

### Client
Future portal limited to client-specific projects, documents, communication, and explicitly granted permissions.

Use explicit permissions in addition to hierarchy.

---

## 7. Admin Portal

URL: https://www.somyainnovations.in/admin

Sidebar:
```text
Overview
Business → Leads, Clients, Quotations, Projects, Tasks
People → Team, Attendance, Leave, Departments
Operations → Services, Products, Careers, Resources, Documents
Reporting → Reports, Analytics, Activity
System → Notifications, Settings
```

Dashboard uses **real DB data only**:
- Active leads
- Active clients
- Active projects
- Pending quotations
- Open tasks
- Today's attendance
- Active project table
- Today's tasks
- Recent activity
- Upcoming deadlines

No fake metrics.

---

## 8. CEO Portal

URL: https://www.somyainnovations.in/ceo

Sidebar:
```text
Overview
Business → Clients, Opportunities, Projects, Quotations
People → Team
Strategy → Strategic Roadmap, Priorities, Announcements
Reports → Business Reports, Project Reports
```

Dashboard:
- Active Clients
- Active Projects
- Open Opportunities
- Pending Quotations
- Project Health
- Upcoming Deadlines
- Team Overview
- Strategic Priorities
- Recent Activity

Executive-focused, not a duplicate Admin dashboard.

---

## 9. Tech Lead Portal

URL: https://www.somyainnovations.in/tech-lead

Sidebar:
```text
Overview
Organization → People, Roles & Permissions, Departments, Attendance, Access Control
Engineering → Projects, Tasks, Sprints, Issues, Releases, Technical Roadmap
System → Authentication, Database, Storage, Integrations, System Health, Audit Logs
Documentation → Technical Documentation, Knowledge Base
```

Dashboard:
- Active Projects
- Open Tasks
- Critical Issues
- Open Issues
- Active Team Members
- Upcoming Releases
- Sprint Progress
- Current Sprint
- Team Workload
- Project Health
- Recent Technical Activity
- System Health

---

## 10. Technical Workflow

### Kanban
```text
Backlog → To Do → In Progress → Code Review → Testing → Done
                                                ↘ Blocked
```

### Issue severity
`Low / Medium / High / Critical`

### Issue fields
```text
title
description
project
severity
status
reported_by
assigned_to
created_at
updated_at
resolved_at
```

### Sprint fields
```text
name
project
goal
start_date
end_date
status
tasks
```

### Release fields
```text
version
title
description
project
status
release_date
created_by
```

Release items:
`feature / bug / fix / technical change`

---

## 11. People Management

Routes:
```text
/tech-lead/people
/tech-lead/people/[id]
```

Profile:
```text
Name
Email
Phone
Department
Position
Role
Joining Date
Status
Last Login
```

Access:
`Authentication / Role / Permissions / Sessions`

Work:
`Projects / Tasks`

Attendance:
`History / Leave`

Activity:
`Login / Role Changes / Assignments / Administrative Actions`

Danger zone:
`Suspend Access / Terminate User`

### User lifecycle
```text
INVITED → ACTIVE → SUSPENDED → TERMINATED
```

Database status:
`active / suspended / terminated`

**Termination is not deletion.**

Termination must:
1. Verify authorization.
2. Require appropriate confirmation/re-authentication.
3. Create immutable audit record.
4. Set status to `terminated`.
5. Store `terminated_at`, `terminated_by`, and reason.
6. Disable active role assignments.
7. Revoke active sessions.
8. Block future login/access.
9. Revoke application permissions.
10. Notify appropriate authority.
11. Preserve projects, tasks, comments, attendance, documents, and audit history.

Confirmation:
```text
Reason
Typed confirmation: TERMINATE
```

Tech Lead cannot terminate themselves.

---

## 12. Attendance Integration

Primary route:
https://www.somyainnovations.in/admin/attendance

Possible routes:
```text
/admin/attendance
/admin/attendance/today
/admin/attendance/employees
/admin/attendance/calendar
/admin/attendance/reports
/admin/attendance/leave
/admin/attendance/settings
```

**Do not rebuild the existing attendance system.**

First inspect and reuse the current:
- QR scanning
- Check-in/check-out
- Attendance percentage
- History
- Reports
- Offline functionality if present
- Leave
- Settings
- Existing tables/APIs/components

Use one central employee identity for users, departments, roles, projects, tasks, leave, and attendance.

### Attendance access
| Role | Access |
|---|---|
| Tech Lead | Full/system |
| Admin | Full operational |
| CEO | Summary/read |
| Employee | Own attendance |
| Client/Public | None |

Approved leave should show `On Leave` in attendance without duplicate manual entry.

---

## 13. Security

Private routes:
```text
/admin/*
/ceo/*
/tech-lead/*
```

Security must use:
- Supabase Auth
- Server-side authorization
- Role/permission checks
- Supabase RLS
- Secure sessions

Not security:
- Hidden navigation
- CSS
- `robots.txt`
- `noindex`
- Client-side redirects only

Never expose the Supabase service-role key in frontend code.

Logout:
1. Sign out from Supabase.
2. Clear session/cache.
3. Redirect to `/login`.
4. Protected content must not be accessible through browser back navigation.

---

## 14. Database Architecture

```text
Next.js
   ↓
Supabase Auth
   ↓
RBAC / Permissions
   ↓
PostgreSQL + RLS
   ├── Storage
   ├── Realtime (only where needed)
   └── Edge Functions (only where needed)
```

### Core tables if not already present

```text
profiles
roles
user_roles
departments
leads
lead_activities
lead_notes
clients
client_contacts
quotations
quotation_items
quotation_status_history
projects
project_members
project_milestones
tasks
task_comments
task_assignees
task_activity
task_attachments
sprints
sprint_tasks
technical_issues
issue_comments
releases
release_items
documents
notifications
activity_logs
audit_logs
announcements
company_settings
```

Use existing equivalent tables. Never duplicate them.

### Permissions

Examples:
```text
users.view
users.create
users.edit
users.suspend
users.terminate
roles.view
roles.assign
projects.view
projects.create
projects.edit
projects.delete
tasks.view
tasks.create
tasks.edit
tasks.assign
attendance.view
attendance.manage
technical.manage
system.manage
audit.view
reports.view
company.settings
```

RLS is mandatory for application tables.

---

## 15. Storage

Potential buckets:
```text
avatars
documents
quotations
project-files
blog-media
product-media
career-documents
```

Sensitive files should be private and accessed with signed URLs where appropriate.

---

## 16. Edge Functions

Use only when necessary, such as:
- Email sending
- Quote notifications
- PDF generation
- Career application processing
- External API integrations
- Webhooks
- GitHub integrations

Do not use Edge Functions for simple CRUD that Supabase can handle directly.

---

## 17. Implementation Rule

# REUSE → EXTEND → ADAPT → CREATE ONLY IF NECESSARY

Before changing anything:
1. Inspect existing routes.
2. Inspect components.
3. Inspect Supabase schema.
4. Inspect authentication.
5. Inspect RLS.
6. Inspect attendance.
7. Identify reusable APIs/components.
8. Extend existing functionality.
9. Create only what is missing.

Do not:
- Rebuild working auth.
- Rebuild attendance.
- Duplicate tables/APIs/components.
- Duplicate employee records.
- Generate fake production data.
- Add unnecessary abstraction.
- Add unnecessary realtime.
- Add unnecessary Edge Functions.
- Perform destructive migrations.
- Drop production data.
- Rewrite working code unnecessarily.

If there is a schema conflict, inspect and report it instead of destroying data.

---

## 18. SEO

Public pages should be indexable where appropriate.

Private routes should not be public sitemap entries.

Current:
- Sitemap: https://www.somyainnovations.in/sitemap.xml
- Robots: https://www.somyainnovations.in/robots.txt

Recommended robots structure:

```text
User-agent: *

Allow: /

Disallow: /admin
Disallow: /admin/
Disallow: /ceo
Disallow: /ceo/
Disallow: /tech-lead
Disallow: /tech-lead/
Disallow: /login
Disallow: /signup
Disallow: /forgot-password
Disallow: /reset-password
Disallow: /auth/
Disallow: /dashboard
Disallow: /dashboard/
Disallow: /unauthorized
Disallow: /attendance
Disallow: /attendance/
Disallow: /api/
Disallow: /design-system
Disallow: /design-system/

Sitemap: https://www.somyainnovations.in/sitemap.xml
```

Do not use a `Host:` line.

**robots.txt is not a security mechanism.**

---

## 19. Product Slugs

```text
/products/somya-enterprise-ai-copilot
/products/somya-vision-inspection-ai
/products/somya-autonomous-agent-hub
/products/somya-predictive-forecasting-engine
/products/somya-executive-bi-dashboard
/products/somya-fleet-operations-portal
/products/somya-client-collaboration-portal
/products/somya-hr-talent-suite
/products/somya-workflow-orchestrator
/products/somya-intelligent-invoice-pipeline
/products/somya-realtime-telemetry-engine
/products/somya-customer-journey-analytics
/products/somya-zero-trust-access-gateway
/products/somya-compliance-audit-vault
/products/somya-microservices-developer-hub
/products/somya-api-management-suite
```

Only keep approved, real public product pages. Do not create fake products for SEO.

---

## 20. Resource Slugs

```text
/resources/applied-ai-vs-speculative-novelty
/resources/designing-structured-enterprise-networks
/resources/endpoint-defense-and-zero-trust-access
/resources/demystifying-containerization-docker-kubernetes
/resources/from-spreadsheets-to-single-source-truth
/resources/computer-vision-in-industrial-quality-control
/resources/enterprise-hardware-architecture-reliability
/resources/building-business-dashboards-metrics-vs-noise
```

---

## 21. Testing Matrix

### Logged out
```text
/admin              → /login
/ceo                → /login
/tech-lead          → /login
/admin/attendance   → /login
```

### Admin
```text
/login              → /admin
/admin              → Allowed
/admin/attendance   → Allowed
```

### CEO
```text
/login              → /ceo
/ceo                → Allowed
```

### Tech Lead
```text
/login              → /tech-lead
/tech-lead          → Allowed
```

### Employee
Future:
```text
/login              → Employee Dashboard
/admin              → Denied
/ceo                → Denied
/tech-lead          → Denied
```

### Terminated user
Verify:
```text
Existing session revoked
Login blocked
Direct URL blocked
API access blocked
RLS access blocked
Historical records preserved
```

### Logout
```text
Session cleared
→ /login
Browser back cannot reveal protected content
```

---

## 22. Recommended Stack

```text
Frontend:       Next.js + React + TypeScript
Backend:        Supabase
Database:       PostgreSQL
Authentication: Supabase Auth
Storage:        Supabase Storage
Authorization:  RBAC + Permissions + RLS
Deployment:     Vercel
Optional:       Supabase Realtime / Edge Functions
```

---

## 23. Final Architecture

```text
                    SOMYA INNOVATIONS
                           │
             ┌─────────────┴─────────────┐
             │                           │
       PUBLIC WEBSITE               UNIFIED LOGIN
                                         │
                                  Supabase Auth
                                         │
                              Profile + Role + Status
                                         │
                   ┌─────────────────────┼─────────────────────┐
                   │                     │                     │
                TECH LEAD               CEO                  ADMIN
                   │                     │                     │
                   └─────────────────────┼─────────────────────┘
                                         │
                              Shared Management Data
                                         │
                           ┌─────────────┼─────────────┐
                           │             │             │
                        Projects       Tasks       Attendance
                           │             │             │
                        Sprints        Issues         Leave
                           │             │             │
                       Releases       Activity       Reports
                                         │
                                     Audit Logs
```

---

## 24. Golden Rules

1. One login.
2. Role determines dashboard.
3. Tech Lead is the highest technical/system authority.
4. CEO is executive authority.
5. Admin handles operational management.
6. Attendance is one integrated system.
7. Never duplicate existing attendance functionality.
8. Never duplicate employee identities.
9. Termination is not deletion.
10. Historical records remain preserved.
11. RLS is mandatory.
12. Server-side authorization is mandatory.
13. Client-side hiding is not security.
14. Never expose the Supabase service-role key.
15. Production dashboards use real database data.
16. Never create fake metrics.
17. Never destroy production data during migrations.
18. Inspect before modifying.
19. Reuse before rebuilding.
20. No blue anywhere unless explicitly approved.
21. Trading is not part of current SOMYA scope.
22. Private portals must not appear in public navigation.
23. Robots.txt is not security.
24. Avoid unnecessary architecture and credits.
25. **REUSE → EXTEND → ADAPT → CREATE ONLY IF NECESSARY.**

---

## Project Status

This README is the central reference for the SOMYA INNOVATIONS website and management platform.

When implementing new features, check this document first and preserve the existing architecture unless a deliberate change is approved.
