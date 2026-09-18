"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "./FormControls";
import { Button } from "@/components/buttons";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import {
  Send,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmittedData, setLastSubmittedData] = useState<ContactFormData | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [mountedAt] = useState<number>(() => Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          website_hp: honeypot,
          clientTimestamp: mountedAt,
        }),
      });

      if (response.ok) {
        setLastSubmittedData(data);
        setIsSubmitted(true);
        return;
      }

      const errData = await response.json().catch(() => ({}));
      setSubmitError(
        errData.error || "We were unable to transmit your enquiry. Please verify your entries and try again."
      );
    } catch (err: unknown) {
      console.error("Submission network error:", err);
      setSubmitError("Network communication failure. Please verify your connection and try again.");
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setLastSubmittedData(null);
    reset();
  };

  if (isSubmitted && lastSubmittedData) {
    return (
      <div className="rounded-2xl p-8 sm:p-12 bg-[#1B1B18] border border-[#68704A]/40 text-center relative overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#68704A]/20 border border-[#68704A]/30 mb-6 text-[#68704A]">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#F1EBDD] mb-3 tracking-tight">
          Enquiry Transmitted Successfully
        </h3>

        <p className="text-sm sm:text-base text-[#F1EBDD]/80 max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you, <strong className="text-white">{lastSubmittedData.fullName}</strong>. Your communication regarding &ldquo;{lastSubmittedData.subject}&rdquo; has been registered in our system.
        </p>

        <div className="p-4 rounded-xl bg-[#11110F] border border-white/[0.08] text-xs text-[#F1EBDD]/70 max-w-md mx-auto text-left mb-8 space-y-1.5 font-mono">
          <div>
            <span className="text-[#F1EBDD]/50">Contact Email:</span>{" "}
            <span className="text-[#F1EBDD]">{lastSubmittedData.email}</span>
          </div>
          {lastSubmittedData.phone && (
            <div>
              <span className="text-[#F1EBDD]/50">Contact Phone:</span>{" "}
              <span className="text-[#F1EBDD]">{lastSubmittedData.phone}</span>
            </div>
          )}
          {lastSubmittedData.company && (
            <div>
              <span className="text-[#F1EBDD]/50">Organization:</span>{" "}
              <span className="text-[#F1EBDD]">{lastSubmittedData.company}</span>
            </div>
          )}
          <div>
            <span className="text-[#F1EBDD]/50">Estimated Response:</span>{" "}
            <span className="text-[#68704A]">Within 1-2 Business Days</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Send Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 sm:p-10 bg-[#1B1B18] border border-white/[0.08] shadow-2xl relative text-[#F1EBDD]">
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
        <div>
          <h3 className="text-xl font-bold text-[#F1EBDD] tracking-tight">
            Direct Enquiry Channel
          </h3>
          <p className="text-xs text-[#F1EBDD]/60 mt-1">
            Fill out the form below to reach our solutions and engineering team.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-[#F1EBDD]/50">
          <ShieldCheck className="w-3.5 h-3.5 text-[#68704A]" />
          Encrypted Dispatch
        </span>
      </div>

      {/* Global Error Banner */}
      {submitError && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 text-xs text-red-300"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <div>
            <p className="font-semibold text-red-200">Transmission Error</p>
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
            <p className="font-semibold text-amber-200">Please review the required fields</p>
            <p className="mt-0.5">Some entries require attention before sending your enquiry.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot field */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="contact-website-hp">Leave this field blank</label>
          <input
            id="contact-website-hp"
            type="text"
            name="website_hp"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Full Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="fullName"
            label="Full Name"
            required
            placeholder="Enter your full name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <Input
            id="company"
            label="Company / Organization"
            placeholder="Company or institution name"
            error={errors.company?.message}
            {...register("company")}
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="email"
            label="Email"
            type="email"
            required
            placeholder="you@company.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            id="phone"
            label="Phone"
            type="tel"
            required
            placeholder="+91-XXXX-XXXXXX"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        {/* Subject */}
        <div>
          <Input
            id="subject"
            label="Subject"
            required
            placeholder="e.g. IT Infrastructure Modernization / AI Automation Project"
            error={errors.subject?.message}
            {...register("subject")}
          />
        </div>

        {/* Message */}
        <div>
          <Textarea
            id="message"
            label="Message"
            required
            placeholder="Please share details regarding your technology requirements, project scope, or questions..."
            rows={5}
            error={errors.message?.message}
            {...register("message")}
          />
        </div>

        {/* Submit Button & Assurance */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[11px] text-[#F1EBDD]/50 font-mono">
            * Fields marked with asterisk are mandatory.
          </p>

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
                <span>Transmitting...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>Send Enquiry</span>
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
