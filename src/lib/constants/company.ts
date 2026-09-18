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

  // Base Site URL for Canonical & OpenGraph resolution
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://somyainnovations.com",

  // SEO defaults (Zero Trading mentions)
  seo: {
    defaultTitle: "SOMYA INNOVATIONS | Technology • AI • IT Solutions",
    titleTemplate: "%s | SOMYA INNOVATIONS",
    defaultDescription:
      "SOMYA INNOVATIONS delivers practical technology solutions across AI, IT infrastructure, digital products, and enterprise technology equipment—built around real business requirements.",
    keywords: [
      "SOMYA INNOVATIONS",
      "IT solutions",
      "artificial intelligence",
      "AI & automation",
      "machine learning",
      "digital solutions",
      "custom software development",
      "enterprise networking",
      "cybersecurity",
      "technology products",
      "business infrastructure",
    ],
    locale: "en_IN",
  },
};
