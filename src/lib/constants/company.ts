// ─── Company Configuration ──────────────────────────────────────
// Centralized enterprise metadata for SOMYA INNOVATIONS.

export const COMPANY = {
  name: "SOMYA INNOVATIONS",
  shortName: "Somya",
  tagline: "Technology • AI • IT Solutions",
  description:
    "SOMYA INNOVATIONS delivers practical technology solutions across AI, IT infrastructure, digital products, and enterprise technology equipment—built around real business requirements.",
  legalName: "SOMYA INNOVATIONS",

  // Business contact information
  contact: {
    email: "[contact@somyainnovations.com]",
    phone: "[+91-XXXX-XXXXXX]",
    address: "[Company Address — To Be Updated]",
    businessHours: "Monday – Saturday, 9:00 AM – 6:00 PM IST",
  },

  // Social references
  social: {
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    youtube: "#",
    github: "#",
  },

  // Base Site URL for Canonical & OpenGraph resolution (Preferred canonical host: https://www.somyainnovations.in/)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.somyainnovations.in",

  // SEO defaults (Zero Trading mentions)
  seo: {
    defaultTitle: "SOMYA INNOVATIONS | AI, IT & Digital Solutions",
    titleTemplate: "%s | SOMYA INNOVATIONS",
    defaultDescription:
      "SOMYA INNOVATIONS delivers practical AI, IT infrastructure and digital technology solutions for businesses, from automation and software to technology products.",
    keywords: [
      "SOMYA INNOVATIONS",
      "AI solutions",
      "AI automation",
      "machine learning",
      "computer vision",
      "data analytics",
      "IT solutions",
      "IT infrastructure",
      "networking",
      "hardware",
      "technical support",
      "digital solutions",
      "software development",
      "web applications",
      "API integration",
      "cloud solutions",
      "technology products",
    ],
    locale: "en_IN",
  },
};
