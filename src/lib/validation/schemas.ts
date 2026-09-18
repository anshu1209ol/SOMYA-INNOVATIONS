import { z } from "zod";

// ─── Contact Form Schema ────────────────────────────────────────
export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Quote Request Form Schema ──────────────────────────────────
export const quoteFormSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid business email address"),
  phone: z.string().optional(),
  serviceCategory: z.string().min(1, "Please select a service category"),
  productServiceRequired: z.string().optional(),
  quantity: z.string().optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  message: z
    .string()
    .min(10, "Please provide at least 10 characters describing your requirement"),
  attachmentName: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
