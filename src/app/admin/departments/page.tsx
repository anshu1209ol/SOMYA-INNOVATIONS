import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Building2,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  Shield,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { createClient } from '@/lib/supabase/server'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Company Departments | SOMYA Admin System',
  description: 'Organizational divisions, practice area allocations, and department leadership records.',
  path: '/admin/departments',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

const DEFAULT_DEPARTMENTS = [
  {
    name: 'AI Solutions & Machine Learning',
    code: 'AI-ML',
    description: 'Autonomous agents, computer vision, and predictive machine learning models.',
    practiceArea: 'Artificial Intelligence',
  },
  {
    name: 'IT Infrastructure & Networking',
    code: 'INFRA',
    description: 'Enterprise campus networks, server infrastructure, and security appliances.',
    practiceArea: 'IT Solutions',
  },
  {
    name: 'Digital Solutions & Software',
    code: 'DIGITAL',
    description: 'High-performance bespoke web applications, APIs, and mobile platforms.',
    practiceArea: 'Digital Products',
  },
  {
    name: 'Commercial & Operations',
    code: 'OPS',
    description: 'Client proposals, project delivery contracts, and resource scheduling.',
    practiceArea: 'Corporate Operations',
  },
  {
    name: 'Executive Leadership',
    code: 'EXEC',
    description: 'Corporate governance, strategic partnerships, and enterprise roadmaps.',
    practiceArea: 'Governance',
  },
]

export default async function AdminDepartmentsPage() {
  let departments = DEFAULT_DEPARTMENTS

  try {
    const supabase = await createClient()
    const { data } = await (supabase as any).from('departments').select('*')
    if (data && data.length > 0) {
      departments = data.map((d: any) => ({
        name: d.name,
        code: d.code || d.name.slice(0, 4).toUpperCase(),
        description: d.description || 'Organizational business department.',
        practiceArea: d.practice_area || 'Core Operations',
      }))
    }
  } catch {
    // Fall back to predefined standard divisions
  }

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Organizational Departments"
        subtitle="Operational departments, organizational division codes, and practice areas."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4 hover:border-[#641F2A]/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 uppercase">
                {dept.code}
              </span>
              <Building2 className="w-4 h-4 text-[#A2AD7B]" />
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#F1EBDD] font-serif">{dept.name}</h3>
              <p className="text-xs text-[#F1EBDD]/60 mt-1.5 leading-relaxed font-sans">
                {dept.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#2A2A26] flex items-center justify-between text-[11px] font-mono text-[#F1EBDD]/50">
              <span>Practice: {dept.practiceArea}</span>
              <span className="text-[#A2AD7B]">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
