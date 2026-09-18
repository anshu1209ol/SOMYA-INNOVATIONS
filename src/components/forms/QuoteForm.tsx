"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea, Select } from "./FormControls";
import { Button } from "@/components/buttons";
import {
  QUOTE_SERVICE_CATEGORIES,
  QUOTE_BUDGET_OPTIONS,
  QUOTE_TIMELINE_OPTIONS,
  submitQuoteRequest,
  type QuoteRequestPayload,
} from "@/lib/quote";
import { quoteFormSchema, type QuoteFormData } from "@/lib/validation";
import {
  Send,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Paperclip,
  UploadCloud,
  X,
  FileText,
  ShieldCheck,
} from "lucide-react";

export function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceId?: string;
    data: QuoteFormData;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [mountedAt] = useState<number>(() => Date.now());

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      serviceCategory: "",
      productServiceRequired: "",
      quantity: "",
      budgetRange: "",
      timeline: "",
      message: "",
      attachmentName: "",
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setAttachedFile({
        name: file.name,
        size: `${sizeMB} MB`,
      });
      setValue("attachmentName", file.name);
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    setValue("attachmentName", "");
  };

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitError(null);
    try {
      const payload: QuoteRequestPayload & { website_hp?: string; clientTimestamp?: number } = {
        ...data,
        attachmentName: attachedFile?.name || undefined,
        website_hp: honeypot,
        clientTimestamp: mountedAt,
      };

      const result = await submitQuoteRequest(payload);

      if (result.success) {
        setSubmissionResult({
          referenceId: result.referenceId,
          data,
        });
        setIsSubmitted(true);
      } else {
        setSubmitError(result.message || "An unexpected error occurred during submission.");
      }
    } catch (err) {
      console.error("Quotation submission error:", err);
      setSubmitError("We were unable to process your quotation request. Please check your network and try again.");
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionResult(null);
    setSubmitError(null);
    setAttachedFile(null);
    reset();
  };

  // ─── SUCCESS STATE ────────────────────────────────────────────────
  if (isSubmitted && submissionResult) {
    const { referenceId, data } = submissionResult;
    return (
      <div className="rounded-2xl p-8 sm:p-12 bg-[#1B1B18] border border-[#68704A]/40 text-center relative overflow-hidden shadow-2xl text-[#F1EBDD] animate-in fade-in zoom-in-95 duration-300">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#68704A]/20 border border-[#68704A]/30 mb-6 text-[#68704A]">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="inline-block px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-[#E8DFCF] uppercase tracking-wider mb-4">
          Requirement Logged: {referenceId}
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#F1EBDD] mb-4 tracking-tight">
          Quotation Request Registered
        </h3>

        <p className="text-base sm:text-lg text-[#F1EBDD]/90 max-w-xl mx-auto mb-8 leading-relaxed font-medium">
          Thank you. Your requirement has been received. Our team will review the details and get back to you.
        </p>

        <div className="p-5 rounded-xl bg-[#11110F] border border-white/[0.08] text-xs text-[#F1EBDD]/80 max-w-lg mx-auto text-left mb-8 space-y-2.5 font-mono">
          <div className="flex justify-between border-b border-white/[0.08] pb-2">
            <span className="text-[#F1EBDD]/50">Contact:</span>
            <span className="text-[#F1EBDD] font-medium">{data.fullName} ({data.email})</span>
          </div>
          {data.company && (
            <div className="flex justify-between border-b border-white/[0.08] pb-2">
              <span className="text-[#F1EBDD]/50">Organization:</span>
              <span className="text-[#F1EBDD]">{data.company}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-white/[0.08] pb-2">
            <span className="text-[#F1EBDD]/50">Service Category:</span>
            <span className="text-[#641F2A] font-bold">{data.serviceCategory}</span>
          </div>
          {data.productServiceRequired && (
            <div className="flex justify-between border-b border-white/[0.08] pb-2">
              <span className="text-[#F1EBDD]/50">Requirement / Product:</span>
              <span className="text-[#F1EBDD]">{data.productServiceRequired}</span>
            </div>
          )}
          {data.quantity && (
            <div className="flex justify-between border-b border-white/[0.08] pb-2">
              <span className="text-[#F1EBDD]/50">Quantity:</span>
              <span className="text-[#F1EBDD]">{data.quantity}</span>
            </div>
          )}
          {data.budgetRange && (
            <div className="flex justify-between border-b border-white/[0.08] pb-2">
              <span className="text-[#F1EBDD]/50">Budget Range:</span>
              <span className="text-[#F1EBDD]">{data.budgetRange}</span>
            </div>
          )}
          {data.timeline && (
            <div className="flex justify-between border-b border-white/[0.08] pb-2">
              <span className="text-[#F1EBDD]/50">Target Timeline:</span>
              <span className="text-[#F1EBDD]">{data.timeline}</span>
            </div>
          )}
          {attachedFile && (
            <div className="flex justify-between pt-1">
              <span className="text-[#F1EBDD]/50">Attachment:</span>
              <span className="text-[#68704A]">{attachedFile.name} ({attachedFile.size})</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  // ─── ACTIVE FORM STATE ────────────────────────────────────────────
  return (
    <div className="rounded-2xl p-6 sm:p-10 bg-[#1B1B18] border border-white/[0.08] shadow-2xl relative text-[#F1EBDD]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/[0.08]">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F1EBDD] tracking-tight">
            Commercial Quotation Request
          </h3>
          <p className="text-xs sm:text-sm text-[#F1EBDD]/60 mt-1">
            Provide your specifications below. Fields marked with asterisk are mandatory.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F1EBDD]/60 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.08] shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#68704A]" />
          NDA Protected
        </span>
      </div>

      {submitError && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 text-xs text-red-300"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <div>
            <p className="font-semibold text-red-200">Transmission Notice</p>
            <p className="mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-amber-300"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <div>
            <p className="font-semibold text-amber-200">Missing or invalid required fields</p>
            <p className="mt-0.5">Please review the highlighted fields below before submitting.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="quote-website-hp">Leave this field blank</label>
          <input
            id="quote-website-hp"
            type="text"
            name="website_hp"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Row 1: Full Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="quote-fullname"
            label="Full Name"
            required
            placeholder="e.g. Ramesh Chandra"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <Input
            id="quote-company"
            label="Company / Organization"
            placeholder="e.g. Enterprise Ltd. / Institution"
            error={errors.company?.message}
            {...register("company")}
          />
        </div>

        {/* Row 2: Email & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="quote-email"
            label="Business Email"
            type="email"
            required
            placeholder="name@company.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            id="quote-phone"
            label="Phone Number"
            type="tel"
            placeholder="+91-XXXX-XXXXXX"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        {/* Row 3: Service Category & Product/Service Required */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            id="quote-service-category"
            label="Service Category"
            required
            options={QUOTE_SERVICE_CATEGORIES}
            placeholder="Select a category"
            error={errors.serviceCategory?.message}
            {...register("serviceCategory")}
          />
          <Input
            id="quote-product-service"
            label="Product / Service Required"
            placeholder="e.g. 50x Desktop Workstations / Document AI"
            error={errors.productServiceRequired?.message}
            {...register("productServiceRequired")}
          />
        </div>

        {/* Row 4: Quantity, Budget Range, & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Input
            id="quote-quantity"
            label="Quantity / Units"
            placeholder="e.g. 25 units / 1 system"
            error={errors.quantity?.message}
            {...register("quantity")}
          />
          <Select
            id="quote-budget"
            label="Budget Range"
            options={QUOTE_BUDGET_OPTIONS}
            placeholder="Select budget"
            error={errors.budgetRange?.message}
            {...register("budgetRange")}
          />
          <Select
            id="quote-timeline"
            label="Timeline"
            options={QUOTE_TIMELINE_OPTIONS}
            placeholder="Select timeline"
            error={errors.timeline?.message}
            {...register("timeline")}
          />
        </div>

        {/* Row 5: Message */}
        <div>
          <Textarea
            id="quote-message"
            label="Message & Technical Scope"
            required
            rows={5}
            placeholder="Detail your requirements, operating environment, technical specifications, or procurement criteria..."
            error={errors.message?.message}
            {...register("message")}
          />
        </div>

        {/* Row 6: Optional File Attachment UI */}
        <div>
          <label
            htmlFor="quote-file-attachment"
            className="block text-xs font-mono uppercase tracking-wider text-[#F1EBDD]/60 mb-2 cursor-pointer"
          >
            Attach Specifications / BoM <span className="text-[#F1EBDD]/40 font-normal">(Optional)</span>
          </label>
          <div className="border border-dashed border-white/[0.15] hover:border-[#641F2A]/60 focus-within:ring-2 focus-within:ring-[#641F2A] rounded-xl p-4 sm:p-5 bg-white/[0.02] transition-all relative">
            <input
              id="quote-file-attachment"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.zip"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Upload specification document"
              aria-label="Upload specification document"
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#F1EBDD] shrink-0">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#F1EBDD]">
                    {attachedFile ? attachedFile.name : "Attach Bill of Materials (BoM), RFP, or technical spec"}
                  </p>
                  <p className="text-[11px] text-[#F1EBDD]/50 font-mono">
                    {attachedFile ? attachedFile.size : "PDF, XLSX, CSV, DOCX up to 25MB"}
                  </p>
                </div>
              </div>

              {attachedFile ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFile();
                  }}
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/20 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-[#E8DFCF] font-bold shrink-0">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Browse File</span>
                </span>
              )}
            </div>
          </div>
          <p className="text-[10px] text-[#F1EBDD]/50 font-mono mt-1.5">
            Files are queued for secure transmission when your quotation is dispatched.
          </p>
        </div>

        {/* Action Buttons & Submission Status */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#F1EBDD]/60 font-mono">
            <FileText className="w-4 h-4 text-[#68704A] shrink-0" />
            <span>Formal commercial review based on verified specifications.</span>
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing Request...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>Submit Quotation Request</span>
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
