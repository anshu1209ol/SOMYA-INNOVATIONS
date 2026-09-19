import React from "react";
import type { Metadata } from "next";
import { LegalPageLayout, type LegalSection } from "@/components/legal/LegalPageLayout";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy | Data Governance & Protection",
  description:
    "Privacy Policy and data governance structure for SOMYA INNOVATIONS. Template document prepared for corporate and regulatory finalization.",
  path: "/privacy-policy",
});

const SECTIONS: LegalSection[] = [
  {
    id: "scope-and-applicability",
    title: "Scope & Applicability",
    content: (
      <>
        <p>
          This Privacy Policy outlines the preliminary framework by which{" "}
          <strong className="text-zinc-100 font-mono">[COMPANY LEGAL NAME]</strong> (&ldquo;SOMYA INNOVATIONS,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects, handles, stores, and protects information gathered through our web platform, commercial interactions, quotation requests, and prospective service communications.
        </p>
        <p>
          This document applies exclusively to digital and offline interactions initiated via this platform and does not supersede bilateral Non-Disclosure Agreements (NDAs) or Master Services Agreements (MSAs) executed with enterprise clients.
        </p>
      </>
    ),
  },
  {
    id: "categories-of-data-collected",
    title: "Categories of Information Collected",
    content: (
      <>
        <p>
          Depending on your interactions with our platform, we may collect the following categories of business and technical information:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-zinc-300">
          <li>
            <strong className="text-zinc-200">Voluntarily Provided Information:</strong> Full name, professional email address, telephone contact, organization name, project scope descriptions, bill of materials (BoM), and related RFQ details submitted through our contact or quotation forms.
          </li>
          <li>
            <strong className="text-zinc-200">Technical & Device Telemetry:</strong> Internet Protocol (IP) addresses, browser user-agent tokens, operating system characteristics, referral URLs, and session interaction timestamps.
          </li>
          <li>
            <strong className="text-zinc-200">Recruitment & Talent Records:</strong> Curricula vitae (CVs), portfolio links, work experience summaries, and contact credentials submitted through our talent network.
          </li>
        </ul>
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-400">
          [PLACEHOLDER: Insert any sector-specific or biometric exclusions if applicable under Indian Digital Personal Data Protection Act / DPDP regulations].
        </div>
      </>
    ),
  },
  {
    id: "purpose-of-processing",
    title: "Purpose of Data Processing",
    content: (
      <>
        <p>
          Information collected by SOMYA INNOVATIONS is processed strictly for legitimate operational and commercial objectives, including:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
          <li>Preparing, verifying, and issuing itemized commercial quotations and technical proposals.</li>
          <li>Communicating regarding software architecture, IT infrastructure services, and hardware availability.</li>
          <li>Evaluating prospective candidates against verified engineering job openings.</li>
          <li>Monitoring system security, network performance, and unauthorized platform intrusion.</li>
          <li>Complying with statutory accounting, tax, and regulatory record-keeping obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention-and-storage",
    title: "Data Retention & Storage Protocols",
    content: (
      <>
        <p>
          Data submitted via online channels is retained only for the duration necessary to satisfy the operational objectives for which it was gathered, or as mandated by applicable statutory retention regulations:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-300 font-mono text-xs">
          <li>Commercial Enquiries & Quotations: Retained for <strong className="text-zinc-200">[RETENTION PERIOD: E.G. 24 MONTHS]</strong> for commercial audit trail.</li>
          <li>Talent Submissions: Retained for <strong className="text-zinc-200">[RETENTION PERIOD: E.G. 12 MONTHS]</strong> in our candidate database.</li>
          <li>Server Access Logs: Rotated and purged every <strong className="text-zinc-200">[LOG ROTATION TIMEFRAME: E.G. 90 DAYS]</strong>.</li>
        </ul>
      </>
    ),
  },
  {
    id: "information-sharing-and-subprocessors",
    title: "Third-Party Subprocessors & Disclosure",
    content: (
      <>
        <p>
          SOMYA INNOVATIONS does not sell, rent, monetize, or trade visitor or client contact information to third-party data brokers or marketing aggregators.
        </p>
        <p>
          Disclosures are restricted to vetted infrastructure vendors operating under confidentiality obligations:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
          <li>Cloud hosting, compute, and CDN infrastructure providers: <span className="font-mono text-xs text-zinc-400">[HOSTING PROVIDERS — E.G. AWS / VERCEL / LOCAL DATA CENTERS]</span>.</li>
          <li>Transactional email gateways: <span className="font-mono text-xs text-zinc-400">[EMAIL DISPATCH SERVICE]</span>.</li>
          <li>Logistics, freight, and hardware fulfillment partners (for hardware technology product deliveries).</li>
          <li>Statutory, law enforcement, or regulatory bodies when required under legal subpoena or binding court order.</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security-controls",
    title: "Information Security Controls",
    content: (
      <>
        <p>
          We employ layered technical and organizational safeguards designed to mitigate risks of unauthorized data access, destruction, disclosure, or modification:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
          <li>Transport Layer Security (TLS 1.3 / HTTPS) encryption for all in-transit digital submissions.</li>
          <li>Restricted, role-based administrative access to internal communication channels.</li>
          <li>Network firewall isolation and routine vulnerability assessments.</li>
        </ul>
        <p className="text-xs text-zinc-500 italic">
          Disclaimer: No electronic data transmission or digital storage system can be guaranteed 100% impenetrable. Users transmit information at their acknowledged discretion.
        </p>
      </>
    ),
  },
  {
    id: "user-rights-and-access",
    title: "Individual Rights & Data Subject Requests",
    content: (
      <>
        <p>
          Depending on your regional jurisdiction, you may possess statutory rights regarding your personal information, including:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
          <li>The right to request confirmation regarding whether your personal information is being processed.</li>
          <li>The right to request rectification of inaccurate, incomplete, or outdated records.</li>
          <li>The right to request erasure of personal data, subject to statutory retention obligations.</li>
          <li>The right to withdraw consent for prospective communications.</li>
        </ul>
        <p>
          To exercise any of these rights, submit a written inquiry to{" "}
          <code className="text-[#E8DFCF] font-mono bg-white/[0.04] px-1.5 py-0.5 rounded">[GRIEVANCE EMAIL ADDRESS]</code>.
        </p>
      </>
    ),
  },
  {
    id: "jurisdiction-and-grievance",
    title: "Grievance Officer & Statutory Jurisdiction",
    content: (
      <>
        <p>
          In accordance with applicable Information Technology and Data Protection provisions, the designated Grievance Officer for SOMYA INNOVATIONS is:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs space-y-1 text-zinc-300">
          <div><strong className="text-zinc-500">Officer Name / Designation:</strong> [GRIEVANCE OFFICER NAME & TITLE]</div>
          <div><strong className="text-zinc-500">Legal Entity:</strong> [COMPANY LEGAL NAME]</div>
          <div><strong className="text-zinc-500">Postal Address:</strong> [REGISTERED OFFICE POSTAL ADDRESS]</div>
          <div><strong className="text-zinc-500">Official Email:</strong> [GRIEVANCE EMAIL ADDRESS]</div>
        </div>
      </>
    ),
  },
  {
    id: "policy-modifications",
    title: "Policy Revisions & Notifications",
    content: (
      <>
        <p>
          SOMYA INNOVATIONS reserves the right to amend this Privacy Policy periodically to reflect changes in regulatory statutes, operational procedures, or system architecture.
        </p>
        <p>
          Material revisions will be posted to this URL with a revised timestamp in the &ldquo;Last Updated&rdquo; indicator. Continued utilization of this website after revisions constitutes acknowledgment of the amended policy.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      documentType="Data Protection & Privacy"
      lastUpdatedPlaceholder="[DATE — TO BE FINALIZED PRIOR TO PRODUCTION]"
      sections={SECTIONS}
      activeRoute="/privacy-policy"
    />
  );
}
