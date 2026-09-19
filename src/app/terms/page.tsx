import React from "react";
import type { Metadata } from "next";
import { LegalPageLayout, type LegalSection } from "@/components/legal/LegalPageLayout";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service | Commercial & Platform Agreement",
  description:
    "Terms of Service governing the use of SOMYA INNOVATIONS website and commercial inquiry services. Preliminary draft subject to corporate legal review.",
  path: "/terms",
});

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms & Corporate Entity",
    content: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) establish the contractual relationship governing your access to and use of the website, resources, and digital interfaces maintained by{" "}
          <strong className="text-zinc-100 font-mono">[COMPANY LEGAL NAME]</strong> (&ldquo;SOMYA INNOVATIONS,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
        </p>
        <p>
          By visiting, browsing, submitting inquiries through, or utilizing any portion of this website, you confirm that you have read, understood, and agreed to be bound by these Terms. If you do not accept these Terms in full, you must discontinue your use of this platform immediately.
        </p>
      </>
    ),
  },
  {
    id: "platform-purpose-and-quotes",
    title: "Nature of Platform & Non-Binding Inquiries",
    content: (
      <>
        <p>
          This website functions as an informational overview and B2B engagement interface showcasing SOMYA INNOVATIONS capabilities across AI automation, IT solutions, digital software development, and technology products.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-zinc-300">
          <li>
            <strong className="text-zinc-200">Informational Scope:</strong> Descriptions of services, architectural diagrams, hardware categories, and product specifications represent general capability outlines and do not constitute an irrevocable commercial offer.
          </li>
          <li>
            <strong className="text-zinc-200">Quotations & Pricing:</strong> Requests submitted via the quotation builder or contact forms are non-binding expressions of interest. Binding obligations are formed solely upon the bilateral execution of a formal Master Services Agreement (MSA), Statement of Work (SOW), or accepted Purchase Order (PO).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property Rights",
    content: (
      <>
        <p>
          All textual content, architectural diagrams, graphical logos, user interface assets, code snippets, documentation, and layout designs embodied on this website are the proprietary property of{" "}
          <span className="font-mono text-zinc-200">[COMPANY LEGAL NAME]</span> or licensed third-party licensors, protected under applicable copyright, trademark, and unfair competition laws.
        </p>
        <p>
          You may not copy, reproduce, republish, decompile, scrape, mirror, or distribute any proprietary material from this website without prior explicit written authorization from our corporate management.
        </p>
      </>
    ),
  },
  {
    id: "user-conduct-restrictions",
    title: "Acceptable Use & Prohibited Activities",
    content: (
      <>
        <p>
          When accessing or interacting with our digital platform, you agree not to engage in any prohibited conduct, including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
          <li>Probing, scanning, or testing the vulnerability of our web servers, firewalls, or related infrastructure.</li>
          <li>Deploying automated crawlers, scrapers, data-mining robots, or extraction scripts without authorization.</li>
          <li>Submitting fraudulent inquiries, misleading project specifications, or malicious file payloads.</li>
          <li>Misrepresenting your identity, organization affiliation, or commercial purchasing authority.</li>
          <li>Interfering with or disrupting the normal operational integrity or availability of our systems.</li>
        </ul>
      </>
    ),
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    content: (
      <>
        <p>
          This website, its educational resources, product catalogs, and service descriptions are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis, without express or implied warranties of any kind.
        </p>
        <p>
          SOMYA INNOVATIONS disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular commercial purpose, uninterrupted uptime, or error-free transmission. Product specifications are subject to manufacturer revision and availability.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Legal Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted under applicable law, SOMYA INNOVATIONS, its directors, officers, and technical personnel shall not be liable for any indirect, incidental, punitive, consequential, or special damages (including loss of business profits, data corruption, or operational downtime) arising out of your access to, or inability to access, this website.
        </p>
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-400">
          [PLACEHOLDER: Insert explicit monetary liability cap clause e.g. &ldquo;Aggregate liability shall in no event exceed the lesser of [INR AMOUNT] or sums paid directly to the company in the preceding 3 months.&rdquo;]
        </div>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Resources & Hyperlinks",
    content: (
      <>
        <p>
          This website may contain hyperlinks to external websites, documentation registries, or vendor platforms (e.g. cloud providers, hardware manufacturers). Such links are provided solely for user convenience.
        </p>
        <p>
          SOMYA INNOVATIONS does not control, endorse, monitor, or assume legal liability for the content, privacy policies, or commercial practices of third-party websites.
        </p>
      </>
    ),
  },
  {
    id: "governing-law-and-jurisdiction",
    title: "Governing Law & Dispute Resolution",
    content: (
      <>
        <p>
          These Terms shall be interpreted, governed, and construed in accordance with the substantive laws of{" "}
          <strong className="text-zinc-100 font-mono">[GOVERNING JURISDICTION / E.G. INDIA]</strong>, without regard to conflict of law principles.
        </p>
        <p>
          Any legal action, suit, arbitration, or judicial proceeding arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts located in{" "}
          <span className="font-mono text-[#E8DFCF]">[DESIGNATED CITY / DISTRICT, JURISDICTION]</span>.
        </p>
      </>
    ),
  },
  {
    id: "severability-and-modifications",
    title: "Modifications & Severability",
    content: (
      <>
        <p>
          If any provision of these Terms is deemed unlawful, void, or unenforceable by an arbitrator or court of competent jurisdiction, that specific provision shall be severed without impairing the validity and enforceability of the remaining provisions.
        </p>
        <p>
          We reserve the right to revise these Terms at any time without prior individual notice. Your continued utilization of our platform constitutes agreement to the updated Terms.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      documentType="Commercial & Website Terms"
      lastUpdatedPlaceholder="[DATE — TO BE FINALIZED PRIOR TO PRODUCTION]"
      sections={SECTIONS}
      activeRoute="/terms"
    />
  );
}
