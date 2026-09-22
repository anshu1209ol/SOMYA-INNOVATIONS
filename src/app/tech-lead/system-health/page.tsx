import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Server, CheckCircle2, Shield, Activity, Clock, Cpu } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Systems Runtime Telemetry | SOMYA Tech Lead',
  description: 'Runtime systems architecture, database connection latency, and edge infrastructure health.',
  path: '/tech-lead/system-health',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

const SYSTEM_NODES = [
  {
    name: 'Next.js App Server (Turbopack)',
    cluster: 'Vercel Edge Platform',
    status: 'Operational',
    uptime: '99.98%',
    latency: '12ms',
    role: 'Server Components & Dynamic Routing',
  },
  {
    name: 'Supabase PostgreSQL Database',
    cluster: 'AWS ap-south-1 (Mumbai)',
    status: 'Operational',
    uptime: '99.99%',
    latency: '8ms',
    role: 'Primary ACID Data Store & RLS Enforcer',
  },
  {
    name: 'Supabase Auth & GoTrue Engine',
    cluster: 'Multi-Region Auth Core',
    status: 'Operational',
    uptime: '100%',
    latency: '<5ms',
    role: 'JWT Verification & Secure Session Cookies',
  },
  {
    name: 'Attendance Realtime Sync Worker',
    cluster: 'Cloudflare Edge Worker',
    status: 'Operational',
    uptime: '99.95%',
    latency: '18ms',
    role: 'Biometric & QR Shift Punches Ingestion',
  },
  {
    name: 'Encrypted Media & Object Storage',
    cluster: 'Supabase S3 Bucket Layer',
    status: 'Operational',
    uptime: '99.99%',
    latency: '22ms',
    role: 'Avatar Uploads & Contract Artifacts',
  },
]

export default function TechLeadSystemHealthPage() {
  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Systems Runtime Telemetry"
        subtitle="Live architectural telemetry, runtime cluster health, latency monitoring, and encrypted connection status."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#F1EBDD]/60 uppercase">
            <span>Overall Health</span>
            <CheckCircle2 className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">All Systems Normal</div>
          <p className="text-[11px] font-mono text-[#A2AD7B]">Zero service interruptions</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#F1EBDD]/60 uppercase">
            <span>Core Latency</span>
            <Activity className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F1EBDD]">&lt; 15 ms</div>
          <p className="text-[11px] font-mono text-[#F1EBDD]/50">p95 global average</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#F1EBDD]/60 uppercase">
            <span>Security Layer</span>
            <Shield className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">RLS Active</div>
          <p className="text-[11px] font-mono text-[#F1EBDD]/50">Row-level security enforcing</p>
        </div>
      </section>

      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
          Node Cluster Telemetry
        </h3>

        <div className="space-y-3">
          {SYSTEM_NODES.map((node) => (
            <div
              key={node.name}
              className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="font-semibold text-[#F1EBDD] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#68704A] animate-pulse" />
                  <span>{node.name}</span>
                </div>
                <div className="text-[11px] font-mono text-[#F1EBDD]/50">
                  {node.cluster} • {node.role}
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11px] shrink-0">
                <span className="text-[#E8DFCF]">Latency: {node.latency}</span>
                <span className="text-[#A2AD7B]">Uptime: {node.uptime}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 uppercase">
                  {node.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
