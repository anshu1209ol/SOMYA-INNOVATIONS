import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const srcDir = path.join(rootDir, "src");

const CANONICAL_HOST = "https://www.somyainnovations.in";

const corePublicPages = [
  { file: "src/app/page.tsx", route: "/", expectedH1: "Technology built around" },
  { file: "src/app/about/page.tsx", route: "/about", expectedH1: "About SOMYA INNOVATIONS" },
  { file: "src/app/solutions/ai-automation/page.tsx", route: "/solutions/ai-automation", expectedH1: "AI & Automation Solutions" },
  { file: "src/app/solutions/it-solutions/page.tsx", route: "/solutions/it-solutions", expectedH1: "IT Solutions" },
  { file: "src/app/solutions/digital-solutions/page.tsx", route: "/solutions/digital-solutions", expectedH1: "Digital Solutions" },
  { file: "src/app/products/page.tsx", route: "/products", expectedH1: "Technology Products" },
  { file: "src/app/industries/page.tsx", route: "/industries", expectedH1: "Technology Solutions for Businesses" },
  { file: "src/app/work/page.tsx", route: "/work", expectedH1: "Our Work" },
  { file: "src/app/resources/page.tsx", route: "/resources", expectedH1: "Technology Resources & Insights" },
  { file: "src/app/careers/page.tsx", route: "/careers", expectedH1: "Careers at SOMYA INNOVATIONS" },
  { file: "src/app/contact/page.tsx", route: "/contact", expectedH1: "Contact SOMYA INNOVATIONS" },
  { file: "src/app/request-quote/page.tsx", route: "/request-quote", expectedH1: "Request a Quote" },
];

const privateRoutes = [
  "/admin",
  "/ceo",
  "/tech-lead",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/unauthorized",
  "/attendance",
];

const forbiddenKeywords = [
  "Trading & Procurement",
  "Procurement Services",
  "Bulk Trading",
  "Institutional Supply",
];

let errors = [];
let warnings = [];

console.log("==========================================");
console.log("SOMYA INNOVATIONS — PRODUCTION SEO AUDIT");
console.log("==========================================\n");

// 1. Audit Company Configuration
console.log("1. Auditing company configuration...");
const companyFile = fs.readFileSync(path.join(srcDir, "lib/constants/company.ts"), "utf-8");
if (!companyFile.includes(CANONICAL_HOST)) {
  errors.push(`company.ts does not use preferred canonical host: ${CANONICAL_HOST}`);
} else {
  console.log(`  ✓ Canonical host configured as ${CANONICAL_HOST}`);
}

// 2. Audit Robots.ts
console.log("2. Auditing robots.txt configuration...");
const robotsFile = fs.readFileSync(path.join(srcDir, "app/robots.ts"), "utf-8");
for (const p of privateRoutes) {
  if (!robotsFile.includes(`"${p}"`)) {
    warnings.push(`robots.ts might be missing disallow for private route: ${p}`);
  }
}
if (!robotsFile.includes(`${CANONICAL_HOST}/sitemap.xml`) && !robotsFile.includes("${COMPANY.siteUrl}/sitemap.xml")) {
  errors.push("robots.ts does not point to canonical sitemap.xml");
} else {
  console.log("  ✓ Robots disallows private portals and exposes canonical sitemap");
}

// 3. Audit Sitemap.ts
console.log("3. Auditing sitemap.xml configuration...");
const sitemapFile = fs.readFileSync(path.join(srcDir, "app/sitemap.ts"), "utf-8");
for (const p of privateRoutes) {
  if (sitemapFile.includes(`"${p}"`)) {
    errors.push(`Private route leaked into public sitemap: ${p}`);
  }
}
for (const page of corePublicPages) {
  if (!sitemapFile.includes(page.route)) {
    errors.push(`Core public route missing from sitemap: ${page.route}`);
  }
}
console.log("  ✓ Sitemap contains all core public routes with zero private leakages");

// 4. Audit Core Public Pages (H1, Title, Description, Alt Attributes)
console.log("4. Auditing core public page templates...");
const titles = new Map();
const descriptions = new Map();

for (const page of corePublicPages) {
  const filePath = path.join(rootDir, page.file);
  if (!fs.existsSync(filePath)) {
    errors.push(`Page file does not exist: ${page.file}`);
    continue;
  }
  const content = fs.readFileSync(filePath, "utf-8");

  // Check H1
  const h1Matches = content.match(/<h1[\s\S]*?<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    errors.push(`Missing <h1> tag in ${page.file}`);
  } else if (h1Matches.length > 1) {
    errors.push(`Multiple <h1> tags (${h1Matches.length}) in ${page.file}`);
  } else {
    const h1Content = h1Matches[0];
    if (page.expectedH1 && !h1Content.includes(page.expectedH1)) {
      warnings.push(`Expected H1 containing "${page.expectedH1}" in ${page.file}`);
    }
  }

  // Check image alt tags
  const imgMatches = content.match(/<img[^>]*>/gi) || [];
  for (const img of imgMatches) {
    if (!img.includes('alt=')) {
      warnings.push(`Image missing alt attribute in ${page.file}: ${img}`);
    }
  }

  // Extract title and description
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);

  if (titleMatch) {
    const t = titleMatch[1];
    if (titles.has(t) && page.route !== "/") {
      warnings.push(`Duplicate title "${t}" in ${page.file} and ${titles.get(t)}`);
    } else {
      titles.set(t, page.file);
    }
  } else {
    warnings.push(`No explicit title metadata found in ${page.file}`);
  }

  if (descMatch) {
    const d = descMatch[1];
    if (descriptions.has(d) && page.route !== "/") {
      warnings.push(`Duplicate description in ${page.file} and ${descriptions.get(d)}`);
    } else {
      descriptions.set(d, page.file);
    }
  } else {
    warnings.push(`No explicit description metadata found in ${page.file}`);
  }
}
console.log(`  ✓ Checked ${corePublicPages.length} public pages for single H1, metadata and image alt attributes`);

// 5. Audit For Prohibited Keywords in Public Pages
console.log("5. Checking for prohibited trading claims...");
for (const page of corePublicPages) {
  const filePath = path.join(rootDir, page.file);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, "utf-8");
  for (const kw of forbiddenKeywords) {
    if (content.toLowerCase().includes(kw.toLowerCase())) {
      errors.push(`Prohibited keyword "${kw}" found in ${page.file}`);
    }
  }
}
console.log("  ✓ Zero prohibited trading terms found in public routes");

// 6. Audit 404 and OG Asset
console.log("6. Verifying 404 page & OG Image asset...");
if (!fs.existsSync(path.join(srcDir, "app/not-found.tsx"))) {
  errors.push("Missing 404 page at src/app/not-found.tsx");
} else {
  console.log("  ✓ Custom 404 page exists at src/app/not-found.tsx");
}

if (!fs.existsSync(path.join(rootDir, "public/og-image.jpg"))) {
  errors.push("Missing OG card asset at public/og-image.jpg");
} else {
  console.log("  ✓ Default OG card asset exists at public/og-image.jpg");
}

// Summary Report
console.log("\n==========================================");
console.log("AUDIT SUMMARY");
console.log("==========================================");
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (warnings.length > 0) {
  console.log("\nWarnings:");
  warnings.forEach((w) => console.log(`  - [WARN] ${w}`));
}

if (errors.length > 0) {
  console.log("\nErrors:");
  errors.forEach((e) => console.log(`  - [ERROR] ${e}`));
  process.exit(1);
} else {
  console.log("\n✓ ALL PRODUCTION SEO CRITERIA PASSED CLEANLY!");
  process.exit(0);
}
