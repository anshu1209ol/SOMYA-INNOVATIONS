"use client";

import React, { useState } from "react";
import { Button } from "@/components/buttons";
import { Badge } from "@/components/ui";
import {
  X,
  UploadCloud,
  CheckCircle,
  Briefcase,
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  FileText,
  AlertCircle,
} from "lucide-react";
import type { JobListing, Department, WorkplaceType } from "@/lib/careers";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob?: JobListing | null;
}

export function JobApplicationModal({
  isOpen,
  onClose,
  selectedJob,
}: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: (selectedJob?.department || "AI & Automation") as Department,
    workplacePreference: (selectedJob?.workplaceType || "Hybrid") as WorkplaceType,
    portfolioUrl: "",
    linkedinUrl: "",
    coverNote: "",
    resumeName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please complete all required fields (Name, Email, and Phone).");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMsg("");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      department: (selectedJob?.department || "AI & Automation") as Department,
      workplacePreference: (selectedJob?.workplaceType || "Hybrid") as WorkplaceType,
      portfolioUrl: "",
      linkedinUrl: "",
      coverNote: "",
      resumeName: "",
    });
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resumeName: e.target.files![0].name,
      }));
    }
  };

  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  // Close modal on Escape key press and manage focus/scroll
  React.useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#11110F]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-dialog-title"
        aria-describedby="job-dialog-description"
        className="relative w-full max-w-2xl bg-[#161614] border border-[#2A2A26] rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-[#F1EBDD]"
      >
        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-[#1B1B18] border-b border-[#2A2A26] relative">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-[#2A2A26]/50 hover:bg-[#2A2A26] text-[#F1EBDD]/60 hover:text-[#F1EBDD] transition-colors border border-[#2A2A26] focus-visible:outline-2 focus-visible:outline-[#641F2A]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Badge variant="burgundy" size="sm">
              {selectedJob ? "Job Application" : "Talent Network"}
            </Badge>
            <span className="text-[11px] font-mono text-[#F1EBDD]/50">
              {selectedJob ? selectedJob.id : "GENERAL-EXPRESSION"}
            </span>
          </div>

          <h3 id="job-dialog-title" className="text-xl sm:text-2xl font-serif text-[#F1EBDD] tracking-tight">
            {selectedJob ? `Apply: ${selectedJob.title}` : "Join the SOMYA Talent Network"}
          </h3>
          <p id="job-dialog-description" className="text-xs sm:text-sm text-[#F1EBDD]/60 mt-1 max-w-lg font-sans">
            {selectedJob
              ? `Submit your credentials for ${selectedJob.department}. Our team reviews candidates against practical engineering criteria.`
              : "Register your interest for upcoming roles. We contact qualified engineers as active hiring requisitions open."}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto font-sans">
          {isSuccess ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#68704A]/20 border border-[#68704A]/40 flex items-center justify-center text-[#68704A] mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-serif text-[#F1EBDD] tracking-tight">
                  Application Received
                </h4>
                <p className="text-sm text-[#F1EBDD]/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#F1EBDD]">{formData.fullName}</strong>. Your profile has been entered into our candidate database for{" "}
                  <span className="text-[#641F2A] font-medium">
                    {selectedJob ? selectedJob.title : formData.department}
                  </span>
                  .
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-xs text-[#F1EBDD]/70 max-w-md mx-auto text-left space-y-1">
                <p>
                  <strong className="text-[#F1EBDD]">Confirmation Sent To:</strong>{" "}
                  {formData.email}
                </p>
                <p>
                  <strong className="text-[#F1EBDD]">Review Protocol:</strong> If your qualifications align with verified team requirements, our recruitment team will reach out directly.
                </p>
              </div>

              <div className="pt-4">
                <Button variant="secondary" size="md" onClick={handleReset}>
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-[#641F2A]/20 border border-[#641F2A]/40 flex items-center gap-2.5 text-xs text-[#F1EBDD]"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#641F2A]" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="job-fullname" className="block text-xs font-semibold text-[#F1EBDD]/80 mb-2">
                    Full Name <span className="text-[#641F2A]" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F1EBDD]/40 pointer-events-none" aria-hidden="true" />
                    <input
                      id="job-fullname"
                      type="text"
                      required
                      aria-required="true"
                      placeholder="Anil Sharma"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] placeholder-[#F1EBDD]/30 text-sm focus:outline-none focus:border-[#641F2A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="job-email" className="block text-xs font-semibold text-[#F1EBDD]/80 mb-2">
                    Email Address <span className="text-[#641F2A]" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F1EBDD]/40 pointer-events-none" aria-hidden="true" />
                    <input
                      id="job-email"
                      type="email"
                      required
                      aria-required="true"
                      placeholder="anil@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] placeholder-[#F1EBDD]/30 text-sm focus:outline-none focus:border-[#641F2A] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="job-phone" className="block text-xs font-semibold text-[#F1EBDD]/80 mb-2">
                    Phone Number <span className="text-[#641F2A]" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F1EBDD]/40 pointer-events-none" aria-hidden="true" />
                    <input
                      id="job-phone"
                      type="tel"
                      required
                      aria-required="true"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] placeholder-[#F1EBDD]/30 text-sm focus:outline-none focus:border-[#641F2A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="job-department" className="block text-xs font-semibold text-[#F1EBDD]/80 mb-2">
                    Department of Interest
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F1EBDD]/40 pointer-events-none" aria-hidden="true" />
                    <select
                      id="job-department"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          department: e.target.value as Department,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm focus:outline-none focus:border-[#641F2A] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="IT Solutions">IT Solutions</option>
                      <option value="Digital Solutions">Digital Solutions</option>
                      <option value="Technology Products">Technology Products</option>
                      <option value="Engineering & Architecture">Engineering & Architecture</option>
                      <option value="Operations & Support">Operations & Support</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Online Profiles / Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="job-linkedin" className="block text-xs font-semibold text-[#F1EBDD]/80 mb-2">
                    LinkedIn URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F1EBDD]/40 pointer-events-none" aria-hidden="true" />
                    <input
                      id="job-linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedinUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedinUrl: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] placeholder-[#F1EBDD]/30 text-sm focus:outline-none focus:border-[#641F2A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="job-portfolio" className="block text-xs font-semibold text-[#F1EBDD]/80 mb-2">
                    Portfolio / GitHub URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F1EBDD]/40 pointer-events-none" aria-hidden="true" />
                    <input
                      id="job-portfolio"
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.portfolioUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, portfolioUrl: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] placeholder-[#F1EBDD]/30 text-sm focus:outline-none focus:border-[#641F2A] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Resume / CV Upload Container */}
              <div>
                <label htmlFor="job-resume" className="block text-xs font-semibold text-[#F1EBDD]/80 mb-2 cursor-pointer">
                  Resume / CV (PDF or DOCX)
                </label>
                <div className="relative border-2 border-dashed border-[#2A2A26] hover:border-[#641F2A]/50 focus-within:ring-2 focus-within:ring-[#641F2A] focus-within:border-[#641F2A] rounded-2xl p-4 sm:p-6 text-center transition-all bg-[#1B1B18]/50">
                  <input
                    id="job-resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    aria-label="Upload resume in PDF or Word document format"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center pointer-events-none">
                    <UploadCloud className="w-8 h-8 text-[#641F2A] mb-2" aria-hidden="true" />
                    {formData.resumeName ? (
                      <div className="flex items-center gap-2 text-sm text-[#68704A] font-medium">
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        <span>{formData.resumeName}</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-xs sm:text-sm text-[#F1EBDD]/90 font-medium">
                          Click or drag to upload your Resume
                        </span>
                        <span className="text-[11px] text-[#F1EBDD]/40 mt-1 font-mono">
                          PDF, DOC, DOCX up to 10MB
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-xs font-semibold text-[#F1EBDD]/80 mb-2">
                  Brief Overview of Your Technical Experience
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize your engineering background, core proficiencies, or problem-solving interests..."
                  value={formData.coverNote}
                  onChange={(e) =>
                    setFormData({ ...formData, coverNote: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] placeholder-[#F1EBDD]/30 text-sm focus:outline-none focus:border-[#641F2A] transition-colors resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#F1EBDD]/60 hover:text-[#F1EBDD] transition-colors"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Submitting Profile..." : "Submit Application"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
