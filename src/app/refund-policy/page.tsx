import React from "react";
import type { Metadata } from "next";
import { LegalPageLayout, type LegalSection } from "@/components/legal/LegalPageLayout";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Refund & Cancellation Policy | Products & Services Guidelines",
  description:
    "Refund and cancellation framework governing technology products, custom software, and managed IT services at SOMYA INNOVATIONS.",
  path: "/refund-policy",
});

const SECTIONS: LegalSection[] = [
  {
    id: "scope-and-applicability",
    title: "Scope & Classification of Services",
    content: (
      <>
        <p>
          This Refund &amp; Cancellation Policy outlines the commercial guidelines governing billing adjustments, cancellations, and return claims for transactions entered into with{" "}
          <strong className="text-zinc-100 font-mono">[COMPANY LEGAL NAME]</strong> (&ldquo;SOMYA INNOVATIONS,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
        </p>
        <p>
          Because our operations encompass distinct commercial divisions&mdash;spanning technology products, custom software engineering, and managed IT services&mdash;remedies and return criteria vary by service category as delineated below.
        </p>
      </>
    ),
  },
  {
    id: "custom-software-and-consulting",
    title: "Custom Software, AI & Digital Engineering Services",
    content: (
      <>
        <p>
          Professional services, custom website development, AI model engineering, and technical advisory services involve dedicated engineering labor and intellectual property creation:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-zinc-300">
          <li>
            <strong className="text-zinc-200">Milestone-Based Acceptance:</strong> Software deliverables are governed by formal milestone sign-offs documented in the applicable Statement of Work (SOW). Upon client acceptance of a completed milestone, associated milestone fees are non-refundable.
          </li>
          <li>
            <strong className="text-zinc-200">Advance Retainers & Discovery Fees:</strong> Advance mobilization retainers applied toward requirements gathering, architectural research, and infrastructure provisioning are non-refundable once engineering labor has commenced.
          </li>
          <li>
            <strong className="text-zinc-200">Early Project Termination:</strong> In the event a client terminates an active software contract prior to completion, the client remains responsible for payment of all verifiable engineering hours delivered up to the official termination notice date.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "hardware-and-technology-products",
    title: "Hardware, Computing & Networking Products",
    content: (
      <>
        <p>
          Physical computing equipment, server hardware, networking appliances, and components supplied through our Technology Products division are subject to commercial inspection protocols:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-zinc-300">
          <li>
            <strong className="text-zinc-200">Inspection &amp; Transit Damage Notice:</strong> Enterprise buyers must inspect shipments upon delivery. Any physical damage sustained during transit or discrepancies against the invoice must be reported in writing within{" "}
            <span className="font-mono text-indigo-300">[INSPECTION TIMEFRAME: E.G. 48 TO 72 HOURS]</span> of receipt.
          </li>
          <li>
            <strong className="text-zinc-200">Defective on Arrival (DOA):</strong> Units determined to be Dead-on-Arrival upon certified installation will be prioritized for warranty replacement or RMA service per manufacturer policy.
          </li>
          <li>
            <strong className="text-zinc-200">Manufacturer Warranty Pass-Through:</strong> All new hardware is supplied with original equipment manufacturer (OEM) warranties. After the initial inspection window, warranty claims and hardware servicing are administered through respective manufacturer service centers.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "order-cancellation-guidelines",
    title: "Order Cancellation Guidelines",
    content: (
      <>
        <p>
          Cancellation eligibility depends on the operational stage of order fulfillment:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
          <li>
            <strong className="text-zinc-200">Standard Hardware Orders:</strong> May be canceled prior to dispatch or warehouse staging, subject to written confirmation.
          </li>
          <li>
            <strong className="text-zinc-200">Custom &amp; Built-to-Order Configurations:</strong> Specialized server assemblies, configured CAD workstations, or bulk non-stock items ordered specifically for a client cannot be canceled once component assembly or vendor purchase orders are executed.
          </li>
          <li>
            <strong className="text-zinc-200">Restocking Fees:</strong> Orders canceled after dispatch or approved for non-defect return may incur an inventory restocking fee of{" "}
            <code className="text-amber-300 font-mono bg-white/[0.04] px-1.5 py-0.5 rounded">[RESTOCKING FEE %: E.G. 10% TO 20%]</code> to cover logistics and warehousing expenses.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "return-authorization-process",
    title: "Return Merchandise Authorization (RMA) Protocol",
    content: (
      <>
        <p>
          No physical returns will be accepted at our facilities without an approved Return Merchandise Authorization (RMA) number.
        </p>
        <p>To initiate an RMA request:</p>
        <ol className="list-decimal pl-5 space-y-1.5 text-zinc-300 font-mono text-xs">
          <li>Submit a formal claim to <span className="text-zinc-200">[BILLING &amp; RMA EMAIL ADDRESS]</span> quoting original Invoice / PO number.</li>
          <li>Provide serial numbers, photographs of packaging, and detailed description of the operational defect.</li>
          <li>Upon approval, ship the unit in its original OEM packaging with all accessories, documentation, and cables.</li>
        </ol>
      </>
    ),
  },
  {
    id: "refund-issuance-and-timelines",
    title: "Refund Processing & Reimbursement Method",
    content: (
      <>
        <p>
          Approved refunds will be processed following physical verification and inspection of the returned merchandise or formal settlement of software deliverables:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-300">
          <li>
            <strong className="text-zinc-200">Refund Channel:</strong> Refunds will be credited to the original payment mechanism (e.g. corporate NEFT/RTGS bank transfer, commercial credit card).
          </li>
          <li>
            <strong className="text-zinc-200">Processing Window:</strong> Following physical inspection and approval, credit memos will be initiated within{" "}
            <span className="font-mono text-indigo-300">[TIMEFRAME: E.G. 7 TO 14 BUSINESS DAYS]</span>, subject to commercial banking settlement cycles.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "commercial-dispute-resolution",
    title: "Dispute Escalation & Contact",
    content: (
      <>
        <p>
          For questions regarding billing discrepancies, payment schedules, or commercial return authorizations, please contact our procurement and accounts division:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs space-y-1 text-zinc-300">
          <div><strong className="text-zinc-500">Accounts Department:</strong> [BILLING / PROCUREMENT DIVISION]</div>
          <div><strong className="text-zinc-500">Corporate Entity:</strong> [COMPANY LEGAL NAME]</div>
          <div><strong className="text-zinc-500">Inquiry Email:</strong> [BILLING CONTACT EMAIL]</div>
          <div><strong className="text-zinc-500">Phone Support:</strong> [BILLING SUPPORT PHONE]</div>
        </div>
      </>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      documentType="Commercial & Billing Policy"
      lastUpdatedPlaceholder="[DATE — TO BE FINALIZED PRIOR TO PRODUCTION]"
      sections={SECTIONS}
      activeRoute="/refund-policy"
    />
  );
}
