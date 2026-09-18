"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui";
import { Button } from "@/components/buttons";
import { JobCard } from "@/components/careers/JobCard";
import { JobApplicationModal } from "@/components/careers/JobApplicationModal";
import {
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle,
  FileCheck,
} from "lucide-react";
import {
  type JobListing,
  FUTURE_ROLE_TEMPLATE_PREVIEW,
} from "@/lib/careers";

interface CareersClientProps {
  initialJobs: JobListing[];
}

export function CareersClient({ initialJobs }: CareersClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showTemplatePreview, setShowTemplatePreview] = useState(true);

  const handleOpenApplication = (job?: JobListing) => {
    setSelectedJob(job || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="space-y-16">
      {/* ─── OPEN POSITIONS SECTION ───────────────────────────────────── */}
      <section id="open-positions" className="scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="burgundy" dot className="mb-3">
            Recruitment Requisitions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#F1EBDD] tracking-tight">
            Open Positions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F1EBDD]/70 font-sans">
            Opportunities at SOMYA INNOVATIONS depend directly on active client engagements and verified engineering expansion.
          </p>
        </div>

        {initialJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initialJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleOpenApplication}
              />
            ))}
          </div>
        ) : (
          /* ─── HONEST EMPTY-STATE SECTION ───────────────────────────── */
          <div className="space-y-12">
            <div className="relative rounded-3xl p-8 sm:p-12 bg-[#161614] border border-[#2A2A26] shadow-2xl text-center overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#641F2A]/10 border border-[#641F2A]/30 flex items-center justify-center text-[#F1EBDD] mx-auto shadow-inner">
                  <Briefcase className="w-8 h-8 text-[#641F2A]" />
                </div>

                <div className="inline-block px-4 py-1 rounded-full bg-[#1B1B18] border border-[#2A2A26] text-xs font-mono text-[#F1EBDD]/60 uppercase tracking-wider">
                  Requisition Status
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#F1EBDD] tracking-tight">
                  &ldquo;Current openings will be published here.&rdquo;
                </h3>

                <p className="text-sm sm:text-base text-[#F1EBDD]/70 leading-relaxed font-sans">
                  SOMYA INNOVATIONS adheres to an honest hiring philosophy. We do not invent speculative job openings, maintain ghost listings, or inflate recruiting volume. Openings are published strictly as funded engineering contracts and project deliveries require.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleOpenApplication()}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Submit General Application
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setShowTemplatePreview(!showTemplatePreview)}
                    icon={<Layers className="w-4 h-4" />}
                  >
                    {showTemplatePreview ? "Hide Job Card Specification" : "Preview Job Card Specification"}
                  </Button>
                </div>
              </div>
            </div>

            {/* ─── FUTURE-READY JOB CARD SPECIFICATION & PREVIEW ───────── */}
            {showTemplatePreview && (
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#68704A]" />
                      <span className="text-xs font-mono text-[#68704A] uppercase tracking-wider">
                        Future-Ready Architecture
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-[#F1EBDD]">
                      Job Card Architecture Standard
                    </h3>
                    <p className="text-xs text-[#F1EBDD]/60 font-sans">
                      Standardized card layout featuring Job Title, Location, Employment Type, Department, Description, Requirements, and Apply action.
                    </p>
                  </div>
                  <Badge variant="olive" size="sm">
                    Interactive Preview
                  </Badge>
                </div>

                <div className="max-w-4xl mx-auto">
                  <JobCard
                    job={FUTURE_ROLE_TEMPLATE_PREVIEW}
                    onApply={handleOpenApplication}
                    isTemplatePreview={true}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── RECRUITMENT PRINCIPLES & PROCESS ────────────────────────── */}
      <section className="pt-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="olive" dot className="mb-3">
            Hiring Standards
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#F1EBDD] tracking-tight">
            How We Evaluate Talent
          </h2>
          <p className="mt-3 text-sm text-[#F1EBDD]/70 font-sans">
            Our recruitment workflow is designed around technical competence, architectural clarity, and mutual respect.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: "01",
              title: "Transparent Review",
              desc: "Direct evaluation of your actual technical background and engineering artifacts without automated filtering algorithms.",
              icon: Search,
              accent: "burgundy",
            },
            {
              step: "02",
              title: "Technical Discussion",
              desc: "A conversational technical session focused on systems architecture, trade-offs, and practical operational decisions.",
              icon: Layers,
              accent: "olive",
            },
            {
              step: "03",
              title: "Problem Solving",
              desc: "Evaluation through real-world operational scenarios rather than arbitrary brain teasers or leetcode tricks.",
              icon: FileCheck,
              accent: "burgundy",
            },
            {
              step: "04",
              title: "Clear Terms",
              desc: "Transparent compensation, explicit role scope, and a straightforward onboarding plan aligned with project needs.",
              icon: CheckCircle,
              accent: "olive",
            },
          ].map((item) => {
            const Icon = item.icon;
            const isBurgundy = item.accent === "burgundy";
            return (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold ${
                    isBurgundy ? "text-[#641F2A]" : "text-[#68704A]"
                  }`}>
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-center text-[#F1EBDD]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-base font-serif text-[#F1EBDD] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[#F1EBDD]/60 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── APPLICATION UI MODAL ────────────────────────────────────── */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedJob={selectedJob}
      />
    </div>
  );
}
