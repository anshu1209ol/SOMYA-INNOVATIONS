import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validation";
import { sanitizeFormData, sanitizeFilename } from "@/lib/security/sanitize";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { evaluateSpam } from "@/lib/security/spam";

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check (5 requests per minute per IP)
    const clientIp = getClientIp(request.headers);
    const rateLimit = checkRateLimit(clientIp, { maxRequests: 5, windowMs: 60000 });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many quotation requests. Please wait a moment before submitting again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetSeconds),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Parse Incoming Payload
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    // 3. Spam & Bot Protection (Honeypot + Submission Timing)
    const spamCheck = evaluateSpam({
      honeypot: body.website_hp || body.hp_field,
      clientTimestamp: body.clientTimestamp,
    });

    if (spamCheck.isSpam) {
      // Return ambiguous rejection to avoid coaching scrapers
      return NextResponse.json(
        { success: false, error: "Request flagged by automated protection filters." },
        { status: 400 }
      );
    }

    // 4. Server-Side Schema Validation (Never trust frontend validation)
    const validation = quoteFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Form validation failed.",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    // 5. Data Sanitization
    const sanitizedData = sanitizeFormData(validation.data);

    // 6. Attachment Filename Sanitization & Extension Validation
    if (sanitizedData.attachmentName) {
      const fileCheck = sanitizeFilename(sanitizedData.attachmentName);
      if (!fileCheck.isValid) {
        return NextResponse.json(
          { success: false, error: fileCheck.error || "Disallowed attachment format." },
          { status: 400 }
        );
      }
      sanitizedData.attachmentName = fileCheck.sanitizedName;
    }

    // 7. Generate Secure Reference ID
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceId = `QTE-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`;

    // Audit trail log
    console.info(`[Audit] Quote request registered: ref=${referenceId}, category="${sanitizedData.serviceCategory}"`);

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message:
          "Thank you. Your requirement has been received. Our team will review the details and get back to you.",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    // Log internally without leaking stack traces or sensitive details to the client
    console.error("Internal error processing quote request:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
