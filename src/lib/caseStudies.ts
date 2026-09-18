export interface CaseStudy {
  id: string;
  slug: string;
  project: string;
  industry: string;
  challenge: string;
  objective: string;
  solution: string;
  technology: string[];
  features: string[];
  implementation: string;
  outcome: string;
  published: boolean;
}

// ─── Case Studies Data Source ──────────────────────────────────────
// Real projects will be appended here as client verification and NDAs permit.
// Kept strictly empty to avoid fabricating client names, revenue, or metrics.
export const CASE_STUDIES: CaseStudy[] = [];

// Architectural Template Schema for Future Case Studies
export const CASE_STUDY_SCHEMA_SECTIONS = [
  {
    key: "project",
    label: "Project",
    description: "Definition of the engagement, operating scope, and commercial parameters.",
  },
  {
    key: "industry",
    label: "Industry",
    description: "Specific sector environment, operating constraints, and regulatory standards.",
  },
  {
    key: "challenge",
    label: "Challenge",
    description: "The core operational bottleneck, hardware failure point, or data fragmentation.",
  },
  {
    key: "objective",
    label: "Objective",
    description: "Target commercial outcomes, operational SLAs, and system requirements.",
  },
  {
    key: "solution",
    label: "Solution",
    description: "The bespoke architectural blueprint, hardware integration, or software system.",
  },
  {
    key: "technology",
    label: "Technology",
    description: "The verified hardware platforms, programming frameworks, and protocols.",
  },
  {
    key: "features",
    label: "Features",
    description: "Concrete capabilities engineered for users, administrators, and leadership.",
  },
  {
    key: "implementation",
    label: "Implementation",
    description: "Staging, precision installation, data migration, and validation testing.",
  },
  {
    key: "outcome",
    label: "Outcome",
    description: "Production stability, lifecycle handover, and ongoing support continuity.",
  },
];

export async function getCaseStudies(): Promise<CaseStudy[]> {
  // Returns published case studies (simulates DB query)
  return CASE_STUDIES.filter((cs) => cs.published);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const cs = CASE_STUDIES.find((item) => item.slug === slug && item.published);
  return cs || null;
}
