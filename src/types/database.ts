/**
 * SOMYA INNOVATIONS — Database Type Definitions
 *
 * Strongly typed interfaces mirroring the PostgreSQL schema.
 * Used as the generic parameter for Supabase client: createClient<Database>()
 */

// ─── Enum Types ────────────────────────────────────────────────────────────

export type AppRole = 'admin' | 'ceo' | 'tech_lead' | 'employee' | 'client'

export type LeadStatus =
  | 'new' | 'contacted' | 'qualified' | 'discussion'
  | 'quote_sent' | 'negotiation' | 'won' | 'lost'

export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical'

export type ClientStatus = 'prospect' | 'active' | 'inactive' | 'archived'

export type QuotationStatus =
  | 'draft' | 'sent' | 'viewed' | 'negotiation'
  | 'accepted' | 'rejected' | 'expired'

export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'

export type ProjectMemberRole =
  | 'admin' | 'project_manager' | 'tech_lead' | 'developer' | 'designer' | 'employee'

export type TaskStatus =
  | 'backlog' | 'todo' | 'in_progress' | 'code_review' | 'testing' | 'done'

export type SprintStatus = 'planning' | 'active' | 'completed'

export type IssueSeverity = 'low' | 'medium' | 'high' | 'critical'

export type IssueStatus = 'open' | 'investigating' | 'in_progress' | 'resolved' | 'closed'

export type ReleaseStatus = 'planned' | 'in_development' | 'testing' | 'released' | 'rolled_back'

export type BlogPostStatus = 'draft' | 'published' | 'archived'

export type JobStatus = 'draft' | 'published' | 'closed'

export type ApplicationStatus =
  | 'received' | 'reviewing' | 'shortlisted' | 'interview' | 'selected' | 'rejected'

export type ContactSubmissionStatus = 'new' | 'read' | 'replied' | 'closed'

export type QuoteRequestStatus = 'new' | 'read' | 'replied' | 'closed'

export type DocumentVisibility = 'private' | 'project' | 'organization' | 'public'

export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship'


// ─── Row Types ─────────────────────────────────────────────────────────────

export interface Profile {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  avatar_url: string | null
  job_title: string | null
  department: string | null
  is_active: boolean
  status?: 'invited' | 'active' | 'suspended' | 'terminated'
  terminated_at?: string | null
  terminated_by?: string | null
  termination_reason?: string | null
  suspended_at?: string | null
  suspended_by?: string | null
  suspension_reason?: string | null
  joining_date?: string | null
  last_login_at?: string | null
  created_at: string
  updated_at: string
}

export interface Role {
  id: string
  name: AppRole
  description: string | null
  created_at: string
}

export interface UserRole {
  id: string
  user_id: string
  role: AppRole
  assigned_by: string | null
  created_at: string
}

export interface Lead {
  id: string
  name: string
  company: string | null
  email: string | null
  phone: string | null
  source: string | null
  service: string | null
  description: string | null
  status: LeadStatus
  assigned_to: string | null
  priority: PriorityLevel
  estimated_value: number | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface LeadActivity {
  id: string
  lead_id: string
  user_id: string | null
  action: string
  description: string | null
  metadata: Record<string, unknown>
  created_at: string
}

export interface LeadNote {
  id: string
  lead_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  company_name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  website: string | null
  industry: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  status: ClientStatus
  assigned_account_manager: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface ClientContact {
  id: string
  client_id: string
  name: string
  email: string | null
  phone: string | null
  designation: string | null
  is_primary: boolean
  created_at: string
}

export interface Quotation {
  id: string
  quotation_number: string
  client_id: string | null
  lead_id: string | null
  title: string
  description: string | null
  status: QuotationStatus
  valid_until: string | null
  subtotal: number
  tax: number
  discount: number
  total: number
  notes: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface QuotationItem {
  id: string
  quotation_id: string
  item_type: string
  description: string
  quantity: number
  unit_price: number
  discount: number
  tax: number
  total: number
  sort_order: number
  created_at: string
}

export interface QuotationStatusHistory {
  id: string
  quotation_id: string
  old_status: QuotationStatus | null
  new_status: QuotationStatus
  changed_by: string | null
  notes: string | null
  created_at: string
}

export interface Project {
  id: string
  name: string
  client_id: string | null
  description: string | null
  project_manager: string | null
  tech_lead: string | null
  start_date: string | null
  target_date: string | null
  status: ProjectStatus
  priority: PriorityLevel
  progress: number
  budget: number | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface ProjectMember {
  id: string
  project_id: string
  user_id: string
  role: ProjectMemberRole
  joined_at: string
}

export interface ProjectMilestone {
  id: string
  project_id: string
  title: string
  description: string | null
  due_date: string | null
  is_completed: boolean
  completed_at: string | null
  sort_order: number
  created_at: string
}

export interface Task {
  id: string
  title: string
  description: string | null
  project_id: string | null
  assigned_to: string | null
  created_by: string | null
  priority: PriorityLevel
  status: TaskStatus
  due_date: string | null
  estimated_hours: number | null
  actual_hours: number | null
  created_at: string
  updated_at: string
}

export interface TaskComment {
  id: string
  task_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
}

export interface TaskAssignee {
  id: string
  task_id: string
  user_id: string
  assigned_at: string
}

export interface Sprint {
  id: string
  name: string
  project_id: string
  goal: string | null
  start_date: string | null
  end_date: string | null
  status: SprintStatus
  created_at: string
  updated_at: string
}

export interface SprintTask {
  id: string
  sprint_id: string
  task_id: string
  added_at: string
}

export interface TechnicalIssue {
  id: string
  title: string
  description: string | null
  project_id: string | null
  severity: IssueSeverity
  status: IssueStatus
  assigned_to: string | null
  reported_by: string | null
  environment: string | null
  steps_to_reproduce: string | null
  resolution: string | null
  created_at: string
  updated_at: string
}

export interface IssueComment {
  id: string
  issue_id: string
  user_id: string
  content: string
  created_at: string
}

export interface Release {
  id: string
  version: string
  project_id: string | null
  release_name: string
  description: string | null
  release_date: string | null
  status: ReleaseStatus
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface ReleaseItem {
  id: string
  release_id: string
  item_type: string
  description: string
  task_id: string | null
  issue_id: string | null
  created_at: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  icon: string | null
  image: string | null
  features: string[]
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string | null
  display_order: number
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  category_id: string | null
  description: string | null
  specifications: Record<string, string>
  images: string[]
  brand: string | null
  model: string | null
  availability: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface JobPosition {
  id: string
  title: string
  department: string | null
  location: string | null
  employment_type: EmploymentType
  description: string | null
  requirements: string[]
  status: JobStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface JobApplication {
  id: string
  job_id: string | null
  name: string
  email: string
  phone: string | null
  resume_url: string | null
  cover_letter: string | null
  status: ApplicationStatus
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  author_id: string | null
  category_id: string | null
  status: BlogPostStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  name: string
  file_path: string
  file_size: number | null
  mime_type: string | null
  bucket: string
  visibility: DocumentVisibility
  uploaded_by: string | null
  project_id: string | null
  client_id: string | null
  description: string | null
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string | null
  link: string | null
  is_read: boolean
  created_at: string
}

export interface ActivityLog {
  id: string
  user_id: string | null
  action: string
  entity_type: string
  entity_id: string | null
  description: string | null
  metadata: Record<string, unknown>
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string | null
  type: string
  is_active: boolean
  created_by: string | null
  expires_at: string | null
  created_at: string
}

export interface CompanySetting {
  id: string
  key: string
  value: string | null
  category: string
  updated_by: string | null
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  subject: string | null
  message: string
  status: ContactSubmissionStatus
  assigned_to: string | null
  reference_id: string | null
  created_at: string
}

export interface QuoteRequest {
  id: string
  full_name: string
  company: string | null
  email: string
  phone: string | null
  service_category: string | null
  product_or_service: string | null
  quantity: string | null
  budget_range: string | null
  message: string | null
  status: QuoteRequestStatus
  reference_id: string | null
  created_at: string
}

export interface Employee {
  id: string
  user_id?: string | null
  name: string
  role: string
  dept: string
  status: 'Present' | 'Remote' | 'Late' | 'On Leave' | 'Absent'
  check_in?: string | null
  check_out?: string | null
  hours?: string | null
  location?: string
  avatar?: string | null
  created_at?: string
  updated_at?: string
}

export interface AttendancePunch {
  id: string
  employee_id: string
  punch_in: string
  punch_out?: string | null
  duration?: string | null
  status: 'active' | 'completed'
  created_at?: string
}

export interface LeaveRequest {
  id: string
  employee_id?: string | null
  employee_name: string
  dept: string
  dates: string
  reason: string
  type: string
  status: 'Pending' | 'Approved' | 'Rejected'
  actioned_by?: string | null
  created_at?: string
  updated_at?: string
}

export interface AuditLog {
  id: string
  actor_id: string | null
  action: string
  target_user_id: string | null
  entity_type: string
  entity_id: string | null
  reason: string | null
  metadata: Record<string, unknown>
  created_at: string
}

export interface Permission {
  name: string
  description: string | null
  category: string
  created_at: string
}

export interface RolePermission {
  role: AppRole
  permission_name: string
  created_at: string
}


// ─── Supabase Database Type ────────────────────────────────────────────────

type TableDef<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: { [K in keyof Row]: Row[K] }
  Insert: { [K in keyof Insert]?: Insert[K] | null | undefined } & { [key: string]: unknown }
  Update: { [K in keyof Update]?: Update[K] | null | undefined } & { [key: string]: unknown }
  Relationships: []
}

export type Database = {
  public: {
    Tables: {
      employees: TableDef<
        Employee,
        Omit<Employee, 'created_at' | 'updated_at'> & { created_at?: string; updated_at?: string },
        Partial<Omit<Employee, 'id'>>
      >
      attendance_punches: TableDef<
        AttendancePunch,
        Omit<AttendancePunch, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<AttendancePunch, 'id'>>
      >
      leave_requests: TableDef<
        LeaveRequest,
        Omit<LeaveRequest, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string },
        Partial<Omit<LeaveRequest, 'id'>>
      >
      profiles: TableDef<
        Profile,
        Omit<Profile, 'created_at' | 'updated_at'> & { created_at?: string; updated_at?: string },
        Partial<Omit<Profile, 'id'>>
      >
      roles: TableDef<
        Role,
        Omit<Role, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<Role, 'id'>>
      >
      user_roles: TableDef<
        UserRole,
        Omit<UserRole, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<UserRole, 'id'>>
      >
      leads: TableDef<
        Lead,
        Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'status' | 'priority'> & {
          id?: string; created_at?: string; updated_at?: string
          status?: LeadStatus; priority?: PriorityLevel
        },
        Partial<Omit<Lead, 'id'>>
      >
      lead_activities: TableDef<
        LeadActivity,
        Omit<LeadActivity, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<LeadActivity, 'id'>>
      >
      lead_notes: TableDef<
        LeadNote,
        Omit<LeadNote, 'id' | 'created_at' | 'updated_at'> & {
          id?: string; created_at?: string; updated_at?: string
        },
        Partial<Omit<LeadNote, 'id'>>
      >
      clients: TableDef<
        Client,
        Omit<Client, 'id' | 'created_at' | 'updated_at' | 'status'> & {
          id?: string; created_at?: string; updated_at?: string; status?: ClientStatus
        },
        Partial<Omit<Client, 'id'>>
      >
      client_contacts: TableDef<
        ClientContact,
        Omit<ClientContact, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<ClientContact, 'id'>>
      >
      quotations: TableDef<
        Quotation,
        Omit<Quotation, 'id' | 'created_at' | 'updated_at' | 'subtotal' | 'tax' | 'discount' | 'total'> & {
          id?: string; created_at?: string; updated_at?: string
          subtotal?: number; tax?: number; discount?: number; total?: number
        },
        Partial<Omit<Quotation, 'id'>>
      >
      quotation_items: TableDef<
        QuotationItem,
        Omit<QuotationItem, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<QuotationItem, 'id'>>
      >
      quotation_status_history: TableDef<
        QuotationStatusHistory,
        Omit<QuotationStatusHistory, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<QuotationStatusHistory, 'id'>>
      >
      projects: TableDef<
        Project,
        Omit<Project, 'id' | 'created_at' | 'updated_at' | 'status' | 'priority' | 'progress'> & {
          id?: string; created_at?: string; updated_at?: string
          status?: ProjectStatus; priority?: PriorityLevel; progress?: number
        },
        Partial<Omit<Project, 'id'>>
      >
      project_members: TableDef<
        ProjectMember,
        Omit<ProjectMember, 'id' | 'joined_at'> & { id?: string; joined_at?: string },
        Partial<Omit<ProjectMember, 'id'>>
      >
      project_milestones: TableDef<
        ProjectMilestone,
        Omit<ProjectMilestone, 'id' | 'created_at' | 'is_completed'> & {
          id?: string; created_at?: string; is_completed?: boolean
        },
        Partial<Omit<ProjectMilestone, 'id'>>
      >
      tasks: TableDef<
        Task,
        Omit<Task, 'id' | 'created_at' | 'updated_at' | 'status' | 'priority'> & {
          id?: string; created_at?: string; updated_at?: string
          status?: TaskStatus; priority?: PriorityLevel
        },
        Partial<Omit<Task, 'id'>>
      >
      task_comments: TableDef<
        TaskComment,
        Omit<TaskComment, 'id' | 'created_at' | 'updated_at'> & {
          id?: string; created_at?: string; updated_at?: string
        },
        Partial<Omit<TaskComment, 'id'>>
      >
      task_assignees: TableDef<
        TaskAssignee,
        Omit<TaskAssignee, 'id' | 'assigned_at'> & { id?: string; assigned_at?: string },
        Partial<Omit<TaskAssignee, 'id'>>
      >
      sprints: TableDef<
        Sprint,
        Omit<Sprint, 'id' | 'created_at' | 'updated_at' | 'status'> & {
          id?: string; created_at?: string; updated_at?: string; status?: SprintStatus
        },
        Partial<Omit<Sprint, 'id'>>
      >
      sprint_tasks: TableDef<
        SprintTask,
        Omit<SprintTask, 'id' | 'added_at'> & { id?: string; added_at?: string },
        Partial<Omit<SprintTask, 'id'>>
      >
      technical_issues: TableDef<
        TechnicalIssue,
        Omit<TechnicalIssue, 'id' | 'created_at' | 'updated_at' | 'severity' | 'status'> & {
          id?: string; created_at?: string; updated_at?: string
          severity?: IssueSeverity; status?: IssueStatus
        },
        Partial<Omit<TechnicalIssue, 'id'>>
      >
      issue_comments: TableDef<
        IssueComment,
        Omit<IssueComment, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<IssueComment, 'id'>>
      >
      releases: TableDef<
        Release,
        Omit<Release, 'id' | 'created_at' | 'updated_at' | 'status'> & {
          id?: string; created_at?: string; updated_at?: string; status?: ReleaseStatus
        },
        Partial<Omit<Release, 'id'>>
      >
      release_items: TableDef<
        ReleaseItem,
        Omit<ReleaseItem, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<ReleaseItem, 'id'>>
      >
      services: TableDef<
        Service,
        Omit<Service, 'id' | 'created_at' | 'updated_at'> & {
          id?: string; created_at?: string; updated_at?: string
        },
        Partial<Omit<Service, 'id'>>
      >
      product_categories: TableDef<
        ProductCategory,
        Omit<ProductCategory, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<ProductCategory, 'id'>>
      >
      products: TableDef<
        Product,
        Omit<Product, 'id' | 'created_at' | 'updated_at'> & {
          id?: string; created_at?: string; updated_at?: string
        },
        Partial<Omit<Product, 'id'>>
      >
      job_positions: TableDef<
        JobPosition,
        Omit<JobPosition, 'id' | 'created_at' | 'updated_at' | 'status'> & {
          id?: string; created_at?: string; updated_at?: string; status?: JobStatus
        },
        Partial<Omit<JobPosition, 'id'>>
      >
      job_applications: TableDef<
        JobApplication,
        Omit<JobApplication, 'id' | 'created_at' | 'updated_at' | 'status'> & {
          id?: string; created_at?: string; updated_at?: string; status?: ApplicationStatus
        },
        Partial<Omit<JobApplication, 'id'>>
      >
      blog_categories: TableDef<
        BlogCategory,
        Omit<BlogCategory, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<BlogCategory, 'id'>>
      >
      blog_posts: TableDef<
        BlogPost,
        Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'status'> & {
          id?: string; created_at?: string; updated_at?: string; status?: BlogPostStatus
        },
        Partial<Omit<BlogPost, 'id'>>
      >
      documents: TableDef<
        Document,
        Omit<Document, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<Document, 'id'>>
      >
      notifications: TableDef<
        Notification,
        Omit<Notification, 'id' | 'created_at' | 'is_read'> & {
          id?: string; created_at?: string; is_read?: boolean
        },
        Partial<Omit<Notification, 'id'>>
      >
      activity_logs: TableDef<
        ActivityLog,
        Omit<ActivityLog, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<ActivityLog, 'id'>>
      >
      announcements: TableDef<
        Announcement,
        Omit<Announcement, 'id' | 'created_at' | 'is_active'> & {
          id?: string; created_at?: string; is_active?: boolean
        },
        Partial<Omit<Announcement, 'id'>>
      >
      company_settings: TableDef<
        CompanySetting,
        Omit<CompanySetting, 'id' | 'updated_at'> & { id?: string; updated_at?: string },
        Partial<Omit<CompanySetting, 'id'>>
      >
      contact_submissions: TableDef<
        ContactSubmission,
        Omit<ContactSubmission, 'id' | 'created_at' | 'status'> & {
          id?: string; created_at?: string; status?: ContactSubmissionStatus
        },
        Partial<Omit<ContactSubmission, 'id'>>
      >
      quote_requests: TableDef<
        QuoteRequest,
        Omit<QuoteRequest, 'id' | 'created_at' | 'status'> & {
          id?: string; created_at?: string; status?: QuoteRequestStatus
        },
        Partial<Omit<QuoteRequest, 'id'>>
      >
      audit_logs: TableDef<
        AuditLog,
        Omit<AuditLog, 'id' | 'created_at'> & { id?: string; created_at?: string },
        Partial<Omit<AuditLog, 'id'>>
      >
      permissions: TableDef<
        Permission,
        Omit<Permission, 'created_at'> & { created_at?: string },
        Partial<Permission>
      >
      role_permissions: TableDef<
        RolePermission,
        Omit<RolePermission, 'created_at'> & { created_at?: string },
        Partial<RolePermission>
      >
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { p_user_id: string }
        Returns: AppRole
      }
      has_role: {
        Args: { p_user_id: string; p_role: AppRole }
        Returns: boolean
      }
      has_permission: {
        Args: { p_user_id: string; p_permission: string }
        Returns: boolean
      }
      is_account_active: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      is_admin: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      is_internal_user: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      is_project_member: {
        Args: { p_user_id: string; p_project_id: string }
        Returns: boolean
      }
      generate_quotation_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      calculate_quotation_totals: {
        Args: { p_quotation_id: string }
        Returns: undefined
      }
      log_activity: {
        Args: {
          p_user_id: string
          p_action: string
          p_entity_type: string
          p_entity_id?: string
          p_description?: string
          p_metadata?: Record<string, unknown>
        }
        Returns: string
      }
    }
    Enums: {
      app_role: AppRole
      lead_status: LeadStatus
      priority_level: PriorityLevel
      client_status: ClientStatus
      quotation_status: QuotationStatus
      project_status: ProjectStatus
      project_member_role: ProjectMemberRole
      task_status: TaskStatus
      sprint_status: SprintStatus
      issue_severity: IssueSeverity
      issue_status: IssueStatus
      release_status: ReleaseStatus
      blog_post_status: BlogPostStatus
      job_status: JobStatus
      application_status: ApplicationStatus
      contact_submission_status: ContactSubmissionStatus
      quote_request_status: QuoteRequestStatus
      document_visibility: DocumentVisibility
      employment_type: EmploymentType
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
