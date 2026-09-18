export type ResourceCategory =
  | "AI"
  | "IT"
  | "Cybersecurity"
  | "Cloud"
  | "Digital Transformation"
  | "Technology"
  | "Technology Products"
  | "Business Technology";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ResourceCategory;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
  tags: string[];
  keyTakeaways: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
      bulletPoints?: string[];
    }[];
    conclusion: string;
  };
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  "AI",
  "IT",
  "Cybersecurity",
  "Cloud",
  "Digital Transformation",
  "Technology",
  "Technology Products",
  "Business Technology",
];

export const ARTICLES: Article[] = [
  // ─── 1. AI (Featured) ───────────────────────────────────────────
  {
    id: "art-01",
    slug: "applied-ai-vs-speculative-novelty",
    title: "Applied AI vs. Speculative Novelty: How Enterprises Evaluate Real Automation ROI",
    excerpt:
      "A technical framework for separating practical machine learning and process automation from speculative hype, focusing on measurable operational throughput and error reduction.",
    category: "AI",
    readTime: "6 min read",
    publishedAt: "2025-01-15",
    author: {
      name: "Engineering Solutions Team",
      role: "AI Systems Architecture",
    },
    featured: true,
    tags: ["Machine Learning", "Enterprise Automation", "ROI", "LLMs"],
    keyTakeaways: [
      "Prioritize cognitive workflows that eliminate high-frequency manual data entry bottlenecks over vanity chatbots.",
      "Calculate ROI using cycle-time reduction, human error mitigation, and scalability throughput rather than abstract accuracy percentages.",
      "Ensure model architectures are decoupled from proprietary vendors to prevent lock-in as open-weights models evolve.",
    ],
    content: {
      intro:
        "The corporate conversation surrounding artificial intelligence has reached a critical inflection point. Organizations are moving away from speculative prototypes and demanding verifiable, bottom-line return on investment (ROI). For modern enterprises, the objective is not to adopt AI for branding value, but to engineer durable systems that systematically resolve operational friction.",
      sections: [
        {
          heading: "The Anatomy of High-Impact Business AI",
          paragraphs: [
            "Successful enterprise deployments rarely involve generic, unconstrained generative chatbots. Instead, the most dependable returns stem from narrowly scoped, deterministic pipelines: intelligent document extraction, automated invoice matching, computer vision for defect inspection, and supervised tabular forecasting.",
            "When evaluating potential automation initiatives, technical leaders should assess the ratio of operational friction to implementation complexity. Workflows characterized by high transaction frequency, standardized inputs, and clearly defined exception rules represent the most reliable candidates for automation.",
          ],
          bulletPoints: [
            "Deterministic input validation before passing payloads to language models",
            "Retrieval-Augmented Generation (RAG) restricted to verified company documentation",
            "Explicit human-in-the-loop escalation paths for edge-case classifications",
          ],
        },
        {
          heading: "Quantifying Real Automation ROI",
          paragraphs: [
            "Rather than measuring abstract metrics such as model parameter counts or synthetic benchmark scores, commercial deployments must be evaluated against tangible business indicators: turnaround time reduction, error-rate shrinkage, and overtime expense reduction.",
            "By calculating the cost per transaction under a manual regimen versus an event-driven AI workflow, leadership can establish a transparent timeline to break-even. Sustainable architectures emphasize local edge inference or cost-governed API gateways to ensure predictable operating expenditures.",
          ],
        },
        {
          heading: "Architectural Resilience and Vendor Independence",
          paragraphs: [
            "A major risk in modern AI adoption is over-dependence on proprietary hosted model APIs with volatile pricing and evolving data policies. Resilient enterprise designs construct abstraction layers that allow underlying model weights—whether proprietary or open-weights—to be swapped seamlessly without rewriting business logic.",
          ],
        },
      ],
      conclusion:
        "Practical artificial intelligence is grounded in engineering rigor, disciplined data hygiene, and clear operational milestones. By treating AI as an integrated pipeline rather than an isolated magic wand, businesses build durable competitive advantages.",
    },
  },

  // ─── 2. IT ──────────────────────────────────────────────────────
  {
    id: "art-02",
    slug: "designing-structured-enterprise-networks",
    title: "Designing Structured Enterprise Network Topologies for Low Latency and Zero Downtime",
    excerpt:
      "A pragmatic guide to cabling hierarchies, core and access switch topologies, VLAN segmentation, and redundant uplink architectures for commercial premises.",
    category: "IT",
    readTime: "8 min read",
    publishedAt: "2025-01-28",
    author: {
      name: "Network Infrastructure Team",
      role: "Enterprise Systems",
    },
    tags: ["Networking", "Switching", "VLAN", "Hardware"],
    keyTakeaways: [
      "Implement a three-tier hierarchical model (Core, Distribution, Access) to prevent broadcast storm propagation.",
      "Deploy dedicated physical and logical VLANs to isolate guest traffic, VoIP systems, and security camera video feeds.",
      "Ensure multi-WAN link failover is paired with automated BGP or health-check route switching.",
    ],
    content: {
      intro:
        "An enterprise network is the invisible central nervous system of any commercial operation. When structured properly, it delivers seamless communication, high-bandwidth data transfers, and uncompromising security. When neglected, it manifests as mysterious packet drops, video conference lag, and catastrophic downtime during peak transaction windows.",
      sections: [
        {
          heading: "Hierarchical Architecture vs. Flat Topologies",
          paragraphs: [
            "Many growing businesses make the mistake of daisy-chaining unmanaged switches across rooms. This flat topology amplifies broadcast noise and makes fault isolation exceptionally difficult. A structured hierarchical network organizes traffic across access, distribution, and core layers.",
          ],
          bulletPoints: [
            "Access Layer: High-density PoE+ switches powering workstations, VoIP phones, and Wi-Fi APs",
            "Distribution Layer: Aggregating departmental traffic, enforcing Access Control Lists (ACLs)",
            "Core Layer: High-throughput optical 10G/40G backbones providing zero-latency server connectivity",
          ],
        },
        {
          heading: "VLAN Segmentation for Security and Performance",
          paragraphs: [
            "Separating network traffic logically through 802.1Q VLANs is essential. Security cameras streaming continuous 4K video feeds should never compete for bandwidth on the same broadcast domain as administrative workstations or customer guest Wi-Fi.",
          ],
        },
      ],
      conclusion:
        "Investing in certified structured cabling, managed Layer 2/3 switching, and documented patch panel architectures eliminates recurring IT headaches and provides a stable foundation for enterprise growth.",
    },
  },

  // ─── 3. Cybersecurity ───────────────────────────────────────────
  {
    id: "art-03",
    slug: "endpoint-defense-and-zero-trust-access",
    title: "Endpoint Defense and Zero-Trust Access Control in Hybrid Corporate Environments",
    excerpt:
      "How mid-sized organizations can implement zero-trust principles, multi-factor authentication, and encrypted device telemetry without enterprise complexity.",
    category: "Cybersecurity",
    readTime: "5 min read",
    publishedAt: "2025-02-05",
    author: {
      name: "Security Engineering Desk",
      role: "Information Security",
    },
    tags: ["Zero-Trust", "Endpoints", "Access Control", "Encryption"],
    keyTakeaways: [
      "Never trust, always verify: Authenticate every access request based on identity, device compliance, and context.",
      "Enforce hardware-backed Multi-Factor Authentication (MFA) across all employee access points.",
      "Isolate legacy hardware and IoT devices into non-routable quarantine subnets.",
    ],
    content: {
      intro:
        "The traditional perimeter security model—assuming everything inside the office firewall is safe and everything outside is hostile—is obsolete. With remote employees, personal mobile devices, and cloud-hosted services, organizations must transition to an uncompromising Zero-Trust architecture.",
      sections: [
        {
          heading: "The Core Tenants of Zero-Trust",
          paragraphs: [
            "Zero-trust is not a single product you purchase off a shelf; it is an architectural philosophy. It requires that every user, device, and network request be explicitly verified, granted least-privilege access, and continuously monitored for anomalous behavior.",
          ],
        },
        {
          heading: "Securing Endpoint Fleets",
          paragraphs: [
            "Endpoints are the primary attack vector for ransomware. Centralized mobile device management (MDM) ensures that commercial laptops maintain full-disk BitLocker/FileVault encryption, up-to-date security patches, and active endpoint detection software before connecting to internal networks.",
          ],
        },
      ],
      conclusion:
        "A robust security posture does not require millions in enterprise tooling; it requires disciplined enforcement of least privilege, encrypted channels, and verifiable identity verification.",
    },
  },

  // ─── 4. Cloud ───────────────────────────────────────────────────
  {
    id: "art-04",
    slug: "demystifying-containerization-docker-kubernetes",
    title: "Demystifying Containerization: When to Choose Docker and Kubernetes for Business Systems",
    excerpt:
      "A clear-eyed architectural review of containerization benefits, operational trade-offs, and when simple virtual machines outclass complex orchestration.",
    category: "Cloud",
    readTime: "7 min read",
    publishedAt: "2025-02-14",
    author: {
      name: "Cloud Architecture Team",
      role: "DevOps & Cloud Infrastructure",
    },
    tags: ["Docker", "Kubernetes", "Cloud", "Microservices"],
    keyTakeaways: [
      "Docker containers guarantee consistency across development, staging, and production environments.",
      "Avoid Kubernetes premature complexity unless managing distributed microservices across multiple clusters.",
      "Pair container deployments with automated CI/CD pipelines for reproducible, zero-downtime releases.",
    ],
    content: {
      intro:
        "Containerization has transformed how software is packaged, shipped, and executed. However, the tech industry frequently pushes architectural complexity onto organizations that do not require it. Understanding when containerization provides genuine commercial value is critical to controlling cloud expenditures.",
      sections: [
        {
          heading: "Why Containers Outperform Bare Virtual Machines",
          paragraphs: [
            "Containers bundle an application with all of its runtime binaries, libraries, and configuration files into an immutable image. This eliminates the infamous 'it works on my machine' dilemma, allowing identical execution on developer laptops and production cloud servers.",
          ],
        },
        {
          heading: "The Pragmatic Path: Docker Compose vs. Kubernetes",
          paragraphs: [
            "While Kubernetes is the undisputed standard for hyperscale cloud operations, it introduces significant administrative overhead. For many commercial applications, single-host container management or managed container services provide 95% of the benefits at a fraction of the operational cost.",
          ],
        },
      ],
      conclusion:
        "Containerize for consistency, portability, and rapid rollback capability—but choose your orchestration layer based on genuine scale requirements rather than industry fashion.",
    },
  },

  // ─── 5. Digital Transformation ──────────────────────────────────
  {
    id: "art-05",
    slug: "from-spreadsheets-to-single-source-truth",
    title: "From Spreadsheets to Single-Source Truth: Modernizing Legacy Internal Workflows",
    excerpt:
      "How growing businesses overcome spreadsheet chaos by migrating to centralized web applications, relational databases, and automated validation pipelines.",
    category: "Digital Transformation",
    readTime: "5 min read",
    publishedAt: "2025-02-22",
    author: {
      name: "Digital Engineering Desk",
      role: "Custom Software Solutions",
    },
    tags: ["Databases", "Workflows", "ERP", "Custom Software"],
    keyTakeaways: [
      "Spreadsheets are excellent for rapid prototyping, but catastrophic for concurrent multi-user transactional data.",
      "Centralized relational databases enforce strict referential integrity and prevent data corruption.",
      "Custom web portals tailored to internal company logic achieve dramatically higher employee adoption than generic off-the-shelf software.",
    ],
    content: {
      intro:
        "Almost every successful business begins on spreadsheets. They are flexible, intuitive, and require zero coding. However, as order volumes climb and multiple departments edit simultaneously, version conflicts, formula breaks, and lack of audit trails inevitably threaten operational reliability.",
      sections: [
        {
          heading: "The Breaking Point of Spreadsheet Management",
          paragraphs: [
            "When critical operations rely on 'Master_Inventory_Final_v2_FINAL.xlsx', the risk of catastrophic data loss is imminent. Spreadsheets cannot enforce granular permissions, log who changed a specific price cell, or handle automated concurrent locking.",
          ],
        },
        {
          heading: "The Migration to Structured Web Portals",
          paragraphs: [
            "A purpose-built web application paired with a PostgreSQL database replaces fragile formulas with automated validation rules. Employees interact with clean, role-based dashboards while the database guarantees transactional integrity and automated backups.",
          ],
        },
      ],
      conclusion:
        "Modernizing internal tools is not about discarding historical business logic—it is about cementing that logic into durable, reliable software that scales seamlessly.",
    },
  },

  // ─── 6. Technology ──────────────────────────────────────────────
  {
    id: "art-06",
    slug: "computer-vision-in-industrial-quality-control",
    title: "The Role of Computer Vision in Industrial Quality Control and Spatial Tracking",
    excerpt:
      "Exploring edge camera hardware, real-time object detection models, and how automated visual inspection transforms manufacturing defect detection.",
    category: "Technology",
    readTime: "6 min read",
    publishedAt: "2025-03-01",
    author: {
      name: "Applied Vision Lab",
      role: "Computer Vision & Edge AI",
    },
    tags: ["Computer Vision", "Industrial AI", "Edge Computing", "Quality Assurance"],
    keyTakeaways: [
      "Edge inferencing on industrial camera hardware provides sub-100ms classification latency without cloud bandwidth costs.",
      "High-CRI LED lighting and camera sensor selection are just as critical as the deep learning model itself.",
      "Continuous logging of borderline visual classifications enables active learning and model accuracy refinements.",
    ],
    content: {
      intro:
        "Human visual inspection on rapid assembly lines is notoriously prone to eye fatigue, subjective judgment, and inconsistency. Modern computer vision systems, powered by lightweight neural networks running on edge hardware, now perform continuous, micro-second visual audits with zero degradation in precision.",
      sections: [
        {
          heading: "Hardware Considerations for Industrial Vision",
          paragraphs: [
            "An optical inspection system is only as good as the photons hitting the sensor. Professional deployments invest heavily in stable illumination, telecentric lenses that eliminate perspective distortion, and high-frame-rate industrial camera sensors.",
          ],
        },
        {
          heading: "Edge Processing vs. Cloud Latency",
          paragraphs: [
            "When manufacturing items pass at meters per second, round-trip latency to a distant cloud server is unacceptable. Deploying localized inference engines right at the assembly station guarantees real-time rejection triggers for defective units.",
          ],
        },
      ],
      conclusion:
        "Computer vision converts high-resolution visual feeds into structured, actionable telemetry, eliminating manual bottlenecks and securing consistent production quality.",
    },
  },

  // ─── 7. Technology Products ────────────────────────────────────
  {
    id: "art-07",
    slug: "enterprise-hardware-architecture-reliability",
    title: "Enterprise Hardware Architecture: Reliability, Thermal Design & Hardware Lifecycles",
    excerpt:
      "A technical perspective on enterprise server architectures, validated OEM components, thermal envelope planning, and lifecycle stability for corporate compute nodes.",
    category: "Technology Products",
    readTime: "7 min read",
    publishedAt: "2025-03-08",
    author: {
      name: "Hardware Engineering Team",
      role: "Systems Architecture",
    },
    tags: ["Technology Products", "Hardware", "Infrastructure", "Enterprise Compute"],
    keyTakeaways: [
      "Select enterprise compute nodes based on validated mean time between failures (MTBF) and thermal dissipation efficiency.",
      "Always ensure verified hardware warranties and redundant hot-swappable power supplies for mission-critical nodes.",
      "Standardize hardware platforms across fleet tiers to simplify driver provisioning, spares stocking, and operational maintenance.",
    ],
    content: {
      intro:
        "Architecting physical hardware for an enterprise is fundamentally different from assembling consumer desktops. Counterfeit components, unvalidated memory timings, and substandard power supplies create hidden failure modes that undermine corporate application uptime.",
      sections: [
        {
          heading: "The Architecture of High-Reliability Nodes",
          paragraphs: [
            "Mission-critical servers require strict component qualification. Enterprise ECC memory registers, redundant Platinum-rated power supplies, and dedicated Out-of-Band (IPMI) management interfaces ensure continuous diagnostics and remote recovery even if the primary operating system halts.",
          ],
        },
        {
          heading: "Thermal Design & Lifecycle Planning",
          paragraphs: [
            "Operating server hardware within optimized thermal envelopes significantly extends silicon lifespan. Structured airflow management, hot/cold aisle isolation in server rooms, and preventative dust filtration reduce hardware degradation and lower total cost of ownership over a 5-year deployment cycle.",
          ],
        },
      ],
      conclusion:
        "Long-term infrastructure stability begins with verified hardware design. Investing in enterprise-grade platforms guarantees predictable performance, architectural reliability, and seamless support.",
    },
  },

  // ─── 8. Business Technology ─────────────────────────────────────
  {
    id: "art-08",
    slug: "building-business-dashboards-metrics-vs-noise",
    title: "Building Business Dashboards: Metrics That Matter vs. Telemetry Noise",
    excerpt:
      "Design principles for operational command cockpits that drive rapid decision-making instead of overwhelming leaders with cluttered charts.",
    category: "Business Technology",
    readTime: "5 min read",
    publishedAt: "2025-03-12",
    author: {
      name: "Business Intelligence Team",
      role: "Analytics & Telemetry",
    },
    tags: ["Business Intelligence", "Dashboards", "KPIs", "Data"],
    keyTakeaways: [
      "Limit executive screens to 5–7 core actionable metrics rather than dozens of vanity graphs.",
      "Provide drill-down capability from high-level summaries into granular line-item records.",
      "Automate exception alerts so decision-makers only need to inspect dashboards when metrics deviate from acceptable bands.",
    ],
    content: {
      intro:
        "Data without context is just noise. Too many corporate dashboards resemble airplane cockpits during an emergency—crowded with flashing gauges, 3D pie charts, and uncurated numbers that leave managers paralyzed rather than informed.",
      sections: [
        {
          heading: "The Principle of Actionable Information",
          paragraphs: [
            "Every metric displayed on a dashboard must answer an operational question: 'If this number turns red, what decision must be made?' If a number does not trigger a specific action, it should be moved to a secondary diagnostic view.",
          ],
        },
        {
          heading: "Visual Hierarchy and Cognitive Load",
          paragraphs: [
            "High-contrast, minimalist design with clear visual hierarchy ensures that critical anomalies stand out instantly. Using consistent color semantics (emerald for normal, amber for threshold warnings, rose for system alerts) reduces cognitive load.",
          ],
        },
      ],
      conclusion:
        "An exceptional business dashboard is quiet when operations are healthy and precise when anomalies arise. Design for operational clarity above all else.",
    },
  },
];

// ─── Query Functions (Ready for CMS/Database) ─────────────────────

export async function getResources(): Promise<Article[]> {
  return ARTICLES;
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const featured = ARTICLES.find((a) => a.featured);
  return featured || ARTICLES[0] || null;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = ARTICLES.find((a) => a.slug === slug);
  return article || null;
}

export async function getRelatedArticles(
  articleId: string,
  category: ResourceCategory,
  limit: number = 3
): Promise<Article[]> {
  const sameCategory = ARTICLES.filter(
    (a) => a.id !== articleId && a.category === category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherCategory = ARTICLES.filter(
    (a) => a.id !== articleId && a.category !== category
  );
  return [...sameCategory, ...otherCategory].slice(0, limit);
}
