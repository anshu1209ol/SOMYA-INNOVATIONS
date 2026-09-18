import React from "react";
import { Badge } from "@/components/ui";
import { Button } from "@/components/buttons";
import {
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { JobListing } from "@/lib/careers";

export interface JobCardProps {
  job: JobListing;
  onApply?: (job: JobListing) => void;
  isTemplatePreview?: boolean;
}

export function JobCard({
  job,
  onApply,
  isTemplatePreview = false,
}: JobCardProps) {
  return (
    <div className="relative rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/50 p-6 sm:p-8 transition-all duration-300 group overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header Badges & Template indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="burgundy" size="sm">
              {job.department}
            </Badge>
            <span className="text-[11px] font-mono text-[#F1EBDD]/50 uppercase px-2 py-0.5 rounded bg-[#1B1B18] border border-[#2A2A26]">
              {job.id}
            </span>
          </div>

          {isTemplatePreview && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#68704A] bg-[#68704A]/10 border border-[#68704A]/30 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              Role Specification Template
            </span>
          )}
        </div>

        {/* Job Title */}
        <h3 className="text-xl sm:text-2xl font-serif text-[#F1EBDD] mb-3 group-hover:text-[#E8DFCF] transition-colors">
          {job.title}
        </h3>

        {/* Meta details: Location, Type, Workplace */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#F1EBDD]/60 mb-6 pb-6 border-b border-[#2A2A26] font-sans">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#641F2A] shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#68704A] shrink-0" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#F1EBDD]/60 shrink-0" />
            <span>{job.workplaceType}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-sm text-[#F1EBDD]/70 leading-relaxed font-sans">
            {job.description}
          </p>
        </div>

        {/* Requirements Checklist */}
        <div className="space-y-3 mb-8">
          <h4 className="text-xs font-semibold text-[#F1EBDD]/90 uppercase tracking-wider font-sans">
            Key Requirements:
          </h4>
          <ul className="space-y-2">
            {job.requirements.map((req, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-[#F1EBDD]/60 leading-relaxed font-sans"
              >
                <CheckCircle2 className="w-4 h-4 text-[#641F2A] shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-[#2A2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-xs text-[#F1EBDD]/40 font-mono">
          {isTemplatePreview
            ? "Framework Specification"
            : job.postedDate
            ? `Posted: ${job.postedDate}`
            : "Actively Reviewing"}
        </span>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onApply?.(job)}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          className="w-full sm:w-auto"
        >
          {isTemplatePreview ? "Apply for Similar Roles" : "Apply Now"}
        </Button>
      </div>
    </div>
  );
}
