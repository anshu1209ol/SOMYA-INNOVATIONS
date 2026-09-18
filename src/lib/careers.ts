/**
 * Careers & Talent Management Data Layer
 *
 * Designed for clean future integration with a Headless CMS, ATS (Greenhouse, Lever),
 * or SQL database while strictly adhering to transparency: zero fabricated positions.
 */

export type Department =
  | "AI & Automation"
  | "IT Solutions"
  | "Digital Solutions"
  | "Technology Products"
  | "Engineering & Architecture"
  | "Operations & Support";

export type EmploymentType =
  | "Full-Time"
  | "Part-Time"
  | "Contract"
  | "Internship / Trainee";

export type WorkplaceType = "On-site" | "Hybrid" | "Remote";

export interface JobListing {
  id: string;
  slug: string;
  title: string;
  department: Department;
  location: string;
  workplaceType: WorkplaceType;
  employmentType: EmploymentType;
  experienceLevel: "Entry" | "Mid-Level" | "Senior" | "Lead";
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  postedDate?: string;
  closingDate?: string;
  isActive: boolean;
}

export interface ApplicationSubmission {
  jobId?: string;
  jobTitle?: string;
  fullName: string;
  email: string;
  phone: string;
  department: Department;
  workplacePreference: WorkplaceType;
  portfolioUrl?: string;
  linkedinUrl?: string;
  coverNote: string;
  resumeFileName?: string;
}

/**
 * Standard template specification demonstrating the exact schema and layout
 * for future job openings once active hiring requisitions are approved.
 */
export const FUTURE_ROLE_TEMPLATE_PREVIEW: JobListing = {
  id: "SOMYA-ENG-TEMPLATE",
  slug: "systems-engineer-spec",
  title: "Systems & Infrastructure Engineer",
  department: "IT Solutions",
  location: "Bhilwara / Rajasthan, India",
  workplaceType: "Hybrid",
  employmentType: "Full-Time",
  experienceLevel: "Mid-Level",
  description:
    "Architect, deploy, and maintain resilient computing, networking, and server environments for enterprise clients. Focuses on pragmatic uptime, security hardening, and structured documentation.",
  responsibilities: [
    "Design and configure enterprise VLANs, managed switches, firewalls, and VPN gateways.",
    "Perform hardware assembly, burn-in validation, and operating system provisioning.",
    "Implement automated endpoint backup, monitoring telemetry, and rapid recovery procedures.",
    "Provide high-integrity diagnostic support for physical hardware and operating systems.",
  ],
  requirements: [
    "Demonstrated hands-on experience with Linux/Windows server administration and networking protocols (TCP/IP, DNS, DHCP, VLANs).",
    "Familiarity with hardware diagnostics, RAID configurations, and power backup topologies.",
    "Structured problem-solving mindset with a commitment to truthful technical reporting.",
    "Strong communication skills for interacting with business stakeholders and enterprise IT departments.",
  ],
  niceToHave: [
    "Certifications in networking (CCNA or equivalent) or cloud infrastructure.",
    "Experience with Bash, PowerShell, or Python automation scripting.",
  ],
  isActive: false, // Flagged inactive as a template
};

/**
 * Active openings repository.
 * Strictly empty until authorized vacancies are finalized.
 * "Do not invent open positions."
 */
export const ACTIVE_JOB_LISTINGS: JobListing[] = [];

/**
 * Fetches all currently active job postings.
 * Async signature prepared for future CMS or database query.
 */
export async function getActiveJobListings(): Promise<JobListing[]> {
  // Simulates asynchronous fetch from CMS or database
  return ACTIVE_JOB_LISTINGS.filter((job) => job.isActive);
}

/**
 * Fetches a specific job posting by its unique slug or ID.
 */
export async function getJobBySlug(slug: string): Promise<JobListing | null> {
  const active = await getActiveJobListings();
  return active.find((job) => job.slug === slug || job.id === slug) || null;
}
