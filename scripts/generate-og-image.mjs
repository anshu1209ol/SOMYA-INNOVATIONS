import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const svgCard = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#161614"/>
      <stop offset="50%" stop-color="#11110F"/>
      <stop offset="100%" stop-color="#0D0D0B"/>
    </linearGradient>

    <!-- Warm Glows -->
    <radialGradient id="burgundyGlow" cx="20%" cy="25%" r="45%">
      <stop offset="0%" stop-color="#641F2A" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#641F2A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="oliveGlow" cx="80%" cy="75%" r="45%">
      <stop offset="0%" stop-color="#68704A" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#68704A" stop-opacity="0"/>
    </radialGradient>

    <!-- Architectural Grid Pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F1EBDD" stroke-width="0.5" stroke-opacity="0.05"/>
    </pattern>

    <!-- Monogram Shield Gradient -->
    <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#641F2A"/>
      <stop offset="100%" stop-color="#3D1219"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  <rect width="1200" height="630" fill="url(#burgundyGlow)"/>
  <rect width="1200" height="630" fill="url(#oliveGlow)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Border Inset -->
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="#F1EBDD" stroke-opacity="0.1" stroke-width="1.5"/>

  <!-- Top Eyebrow Tag -->
  <g transform="translate(100, 110)">
    <rect x="0" y="0" width="280" height="34" rx="17" fill="#641F2A" fill-opacity="0.25" stroke="#641F2A" stroke-opacity="0.5" stroke-width="1"/>
    <circle cx="18" cy="17" r="4" fill="#E28292"/>
    <text x="32" y="22" fill="#F1EBDD" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="600" letter-spacing="1.5">ENTERPRISE TECHNOLOGY</text>
  </g>

  <!-- Logo Mark / Monogram Graphic -->
  <g transform="translate(100, 180)">
    <rect width="72" height="72" rx="20" fill="url(#shieldGrad)" stroke="#641F2A" stroke-width="1.5"/>
    <text x="36" y="52" fill="#F1EBDD" font-family="Georgia, serif" font-size="44" font-weight="bold" text-anchor="middle">S</text>
  </g>

  <!-- Company Title -->
  <text x="195" y="235" fill="#F1EBDD" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="800" letter-spacing="2">SOMYA INNOVATIONS</text>

  <!-- Primary Positioning -->
  <g transform="translate(100, 310)">
    <text x="0" y="0" fill="#E8DFCF" font-family="Georgia, serif" font-size="34" font-style="italic">
      AI • IT • DIGITAL SOLUTIONS
    </text>
  </g>

  <!-- Secondary Descriptive Sub-heading -->
  <text x="100" y="375" fill="#C8C2B3" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill-opacity="0.85">
    Technology Products &amp; Enterprise Systems Architecture Built Around How Businesses Work
  </text>

  <!-- Bottom Badges / Core Capabilities -->
  <g transform="translate(100, 480)">
    <!-- Pill 1: AI & Automation -->
    <g transform="translate(0, 0)">
      <rect width="210" height="42" rx="21" fill="#1B1B18" stroke="#F1EBDD" stroke-opacity="0.12" stroke-width="1"/>
      <circle cx="20" cy="21" r="3.5" fill="#641F2A"/>
      <text x="34" y="26" fill="#F1EBDD" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">AI &amp; Automation</text>
    </g>

    <!-- Pill 2: IT Solutions -->
    <g transform="translate(230, 0)">
      <rect width="180" height="42" rx="21" fill="#1B1B18" stroke="#F1EBDD" stroke-opacity="0.12" stroke-width="1"/>
      <circle cx="20" cy="21" r="3.5" fill="#68704A"/>
      <text x="34" y="26" fill="#F1EBDD" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">IT Solutions</text>
    </g>

    <!-- Pill 3: Digital Solutions -->
    <g transform="translate(430, 0)">
      <rect width="200" height="42" rx="21" fill="#1B1B18" stroke="#F1EBDD" stroke-opacity="0.12" stroke-width="1"/>
      <circle cx="20" cy="21" r="3.5" fill="#E28292"/>
      <text x="34" y="26" fill="#F1EBDD" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">Digital Solutions</text>
    </g>

    <!-- Pill 4: Technology Products -->
    <g transform="translate(650, 0)">
      <rect width="220" height="42" rx="21" fill="#1B1B18" stroke="#F1EBDD" stroke-opacity="0.12" stroke-width="1"/>
      <circle cx="20" cy="21" r="3.5" fill="#C8C2B3"/>
      <text x="34" y="26" fill="#F1EBDD" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">Technology Products</text>
    </g>
  </g>

  <!-- Canonical Domain Stamp in bottom right -->
  <text x="1060" y="525" fill="#E8DFCF" fill-opacity="0.5" font-family="'Courier New', monospace" font-size="14" text-anchor="end">
    https://www.somyainnovations.in
  </text>
</svg>
`;

async function generate() {
  const outputPath = path.join(publicDir, "og-image.jpg");
  await sharp(Buffer.from(svgCard))
    .jpeg({ quality: 92 })
    .toFile(outputPath);
  console.log(`Generated official OG image at: ${outputPath}`);
}

generate().catch((err) => {
  console.error("Failed to generate OG image:", err);
  process.exit(1);
});
