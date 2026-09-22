import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileSpreadsheet,
  FileText,
  Download,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getDocuments } from '@/lib/actions/documents'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Commercial Documents & Contracts | SOMYA Admin System',
  description: 'Commercial agreements, proposal documents, master service agreements, and client contracts.',
  path: '/admin/documents',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function AdminDocumentsPage() {
  const documents = await getDocuments()

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Commercial Contracts & Documents"
        subtitle="Manage master service agreements, non-disclosure agreements, pricing scopes, and technical attachments."
      />

      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Document Ledger ({documents.length})
            </h3>
          </div>
        </div>

        {documents.length === 0 ? (
          <p className="text-xs font-mono text-[#F1EBDD]/50 py-12 text-center">
            No commercial documents uploaded to database yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1B1B18] text-[#F1EBDD]/50 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
                <tr>
                  <th className="px-4 py-3">Document Title</th>
                  <th className="px-4 py-3">Project Link</th>
                  <th className="px-4 py-3">Visibility</th>
                  <th className="px-4 py-3">Uploaded Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
                {documents.map((doc: any) => (
                  <tr key={doc.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3.5 font-semibold text-[#F1EBDD]">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#A2AD7B] shrink-0" />
                        <span>{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#E8DFCF]">
                      {doc.projects?.name || 'General Company Scope'}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-[#E8DFCF] border border-[#2A2A26] uppercase">
                        {doc.visibility || 'Internal'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#F1EBDD]/50">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
