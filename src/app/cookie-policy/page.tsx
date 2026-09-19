import React from "react";
import type { Metadata } from "next";
import { LegalPageLayout, type LegalSection } from "@/components/legal/LegalPageLayout";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Cookie Policy | Storage Technologies & Guidelines",
  description:
    "Cookie Policy and web storage usage guidelines for SOMYA INNOVATIONS. Template document prepared for corporate and regulatory finalization.",
  path: "/cookie-policy",
});

const SECTIONS: LegalSection[] = [
  {
    id: "cookie-fundamentals",
    title: "Understanding Cookies & Storage Technologies",
    content: (
      <>
        <p>
          This Cookie Policy explains how{" "}
          <strong className="text-zinc-100 font-mono">[COMPANY LEGAL NAME]</strong> (&ldquo;SOMYA INNOVATIONS,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) employs cookies, web beacons, local storage, and related browser storage technologies when you interact with our website.
        </p>
        <p>
          A &ldquo;cookie&rdquo; is a compact text file stored on your computer, tablet, or smartphone by your web browser when visiting websites. Cookies enable digital platforms to recognize your device, maintain authenticated states, and analyze user engagement patterns.
        </p>
      </>
    ),
  },
  {
    id: "categories-of-cookies",
    title: "Categories of Cookies We Utilize",
    content: (
      <>
        <p>
          Our platform utilizes cookies categorized across the following operational functions:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-zinc-300">
          <li>
            <strong className="text-zinc-200">Strictly Necessary Cookies:</strong> Essential for platform security, form transmission, session validation, and load balancing across our server network. Without these cookies, basic platform operations cannot function reliably.
          </li>
          <li>
            <strong className="text-zinc-200">Functional &amp; Preference Cookies:</strong> Permit our platform to retain user configuration choices (such as user interface display themes or form input states) to deliver an optimized user experience.
          </li>
          <li>
            <strong className="text-zinc-200">Performance &amp; Telemetry Cookies:</strong> Gather aggregated, anonymous telemetry regarding web page request latency, traffic origin distribution, and technical error logs to assist our engineering team in optimizing server performance.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookie-inventory-table",
    title: "Cookie Inventory & Technical Specifications",
    content: (
      <>
        <p>
          Below is a structural inventory representing typical cookies configured or anticipated on our web platform:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] my-4">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-white/[0.04] text-zinc-300 border-b border-white/[0.08]">
              <tr>
                <th className="p-3">Cookie Identifier</th>
                <th className="p-3">Category</th>
                <th className="p-3">Provider</th>
                <th className="p-3">Purpose &amp; Expiry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-zinc-400">
              <tr>
                <td className="p-3 text-[#E8DFCF] font-semibold">_somya_session</td>
                <td className="p-3">Strictly Necessary</td>
                <td className="p-3">First Party</td>
                <td className="p-3">Maintains stateful interaction across form stages. Session expiry.</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E8DFCF] font-semibold">_somya_csrf</td>
                <td className="p-3">Security</td>
                <td className="p-3">First Party</td>
                <td className="p-3">Cross-Site Request Forgery mitigation on API endpoints. Session expiry.</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E8DFCF] font-semibold">[TELEMETRY COOKIE]</td>
                <td className="p-3">Analytics</td>
                <td className="p-3">[PROVIDER NAME]</td>
                <td className="p-3">[Aggregated traffic analysis and error telemetry. Expiry: 12 months].</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-zinc-500 font-mono">
          [PLACEHOLDER: Populate inventory table with verified tracking tags or consent banner configurations once deployed to production].
        </p>
      </>
    ),
  },
  {
    id: "managing-and-disabling-cookies",
    title: "How to Manage & Disable Cookies",
    content: (
      <>
        <p>
          You retain the right to accept, customize, or reject non-essential cookies. You can configure your browser preferences to alert you when cookies are placed, or to decline cookies outright:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-300 text-xs">
          <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and Security &rarr; Cookies and other site data.</li>
          <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection.</li>
          <li><strong>Apple Safari:</strong> Preferences &rarr; Privacy &rarr; Manage Website Data.</li>
          <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies.</li>
        </ul>
        <p className="text-xs text-zinc-400 mt-2">
          Note: Disabling strictly necessary cookies may degrade website functionality, prevent form submissions, or disrupt display formatting.
        </p>
      </>
    ),
  },
  {
    id: "third-party-content-and-embeds",
    title: "Third-Party Embedded Elements",
    content: (
      <>
        <p>
          Certain pages may incorporate embedded components from external service providers (e.g. interactive map modules or font CDNs). These external services may deploy their own cookies subject to their respective corporate policies:
        </p>
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-400">
          [PLACEHOLDER: List any third-party embedded services utilized, e.g., Google Maps API, YouTube, or Google Fonts].
        </div>
      </>
    ),
  },
  {
    id: "policy-maintenance",
    title: "Policy Maintenance & Inquiries",
    content: (
      <>
        <p>
          We review this Cookie Policy periodically to align with evolving web standards, browser security protocols, and data protection legislation.
        </p>
        <p>
          If you have questions regarding our implementation of cookies, web storage, or data telemetry, please reach out to our privacy team at:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs space-y-1 text-zinc-300">
          <div><strong className="text-zinc-500">Corporate Entity:</strong> [COMPANY LEGAL NAME]</div>
          <div><strong className="text-zinc-500">Privacy Desk:</strong> [COOKIE / PRIVACY CONTACT EMAIL]</div>
          <div><strong className="text-zinc-500">Office Location:</strong> [REGISTERED CITY / ADDRESS]</div>
        </div>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      documentType="Web Telemetry & Storage Guidelines"
      lastUpdatedPlaceholder="[DATE — TO BE FINALIZED PRIOR TO PRODUCTION]"
      sections={SECTIONS}
      activeRoute="/cookie-policy"
    />
  );
}
