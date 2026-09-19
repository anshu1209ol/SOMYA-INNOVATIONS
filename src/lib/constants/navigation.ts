// ─── Navigation Configuration ───────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "AI Solutions", href: "/solutions/ai-automation" },
  { label: "IT Solutions", href: "/solutions/it-solutions" },
  { label: "Digital Solutions", href: "/solutions/digital-solutions" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  solutions: [
    { label: "AI & Automation", href: "/solutions/ai-automation" },
    { label: "IT Infrastructure", href: "/solutions/it-solutions" },
    { label: "Digital Solutions", href: "/solutions/digital-solutions" },
    { label: "Technology Products", href: "/products" },
    { label: "Industry Solutions", href: "/industries" },
  ],
  company: [
    { label: "About SOMYA", href: "/about" },
    { label: "Work & Case Studies", href: "/work" },
    { label: "Insights & Resources", href: "/resources" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
    { label: "Request a Quote", href: "/request-quote" },
  ],
  portals: [
    { label: "Executive (CEO)", href: "/ceo" },
    { label: "Operations Admin", href: "/admin" },
    { label: "Engineering Lead", href: "/tech-lead" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
} as const;
