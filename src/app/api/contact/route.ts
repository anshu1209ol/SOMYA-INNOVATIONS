import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { sanitizeFormData } from "@/lib/security/sanitize";
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
          error: "Too many contact enquiries. Please wait a moment before sending another message.",
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
      return NextResponse.json(
        { success: false, error: "Submission flagged by automated filters." },
        { status: 400 }
      );
    }

    // 4. Server-Side Schema Validation (Never trust frontend validation)
    const validation = contactFormSchema.safeParse(body);
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

    // 5. Data Sanitization (Remove HTML, script injection, control characters)
    const sanitizedData = sanitizeFormData(validation.data);

    // 6. Generate Secure Reference ID
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceId = `ENQ-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`;

    // Audit trail log (records reference ID without exposing raw message contents)
    console.info(`[Audit] Contact enquiry received: ref=${referenceId}, subject="${sanitizedData.subject.slice(0, 30)}"`);

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: "Thank you. Your communication has been securely transmitted.",
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
    console.error("Internal error processing contact form:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
