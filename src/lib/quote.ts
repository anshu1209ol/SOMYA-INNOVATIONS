/**
 * B2B Quotation Management & Data Architecture
 *
 * Prepared for clean integration with backend API routes (/api/quote),
 * CRM pipelines (HubSpot, Salesforce, ERPNext), or database queues.
 */

export const QUOTE_SERVICE_CATEGORIES = [
  "AI & Automation",
  "IT Solutions",
  "Digital Solutions",
  "Technology Products",
  "Hardware",
  "Software",
  "Other",
] as const;

export type QuoteServiceCategory = (typeof QUOTE_SERVICE_CATEGORIES)[number];

export const QUOTE_BUDGET_OPTIONS = [
  "₹25k–₹50k",
  "₹50k–₹1L",
  "₹1L–₹3L",
  "₹3L+",
  "Not decided",
] as const;

export type QuoteBudgetOption = (typeof QUOTE_BUDGET_OPTIONS)[number];

export const QUOTE_TIMELINE_OPTIONS = [
  "ASAP",
  "1 month",
  "1–3 months",
  "3–6 months",
  "Flexible",
] as const;

export type QuoteTimelineOption = (typeof QUOTE_TIMELINE_OPTIONS)[number];

export interface QuoteRequestPayload {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  serviceCategory: QuoteServiceCategory | string;
  productServiceRequired?: string;
  quantity?: string;
  budgetRange?: QuoteBudgetOption | string;
  timeline?: QuoteTimelineOption | string;
  message: string;
  attachmentName?: string;
  attachmentSize?: number;
  submittedAt?: string;
}

export interface QuoteSubmissionResult {
  success: boolean;
  message: string;
  referenceId?: string;
}

/**
 * Dispatches a quotation request to the backend API endpoint.
 * Configured with resilient fallback for staging and production environments.
 */
export async function submitQuoteRequest(
  payload: QuoteRequestPayload
): Promise<QuoteSubmissionResult> {
  const endpoint = process.env.NEXT_PUBLIC_QUOTE_API_ENDPOINT || "/api/quote";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        success: true,
        message:
          "Thank you. Your requirement has been received. Our team will review the details and get back to you.",
        referenceId: data.referenceId || `QTE-${Date.now().toString(36).toUpperCase()}`,
      };
    }

    const errData = await response.json().catch(() => ({}));
    return {
      success: false,
      message:
        errData.error ||
        "We were unable to process your quotation request. Please verify your details and try again.",
    };
  } catch (error) {
    console.error("Quote API network error:", error);
    return {
      success: false,
      message:
        "Network communication error. Please check your internet connection and try again.",
    };
  }
}
