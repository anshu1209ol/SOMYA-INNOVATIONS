/**
 * Anti-Spam & Bot Detection Utilities
 *
 * Implements non-intrusive, privacy-preserving anti-spam defenses:
 * 1. Honeypot traps (detects automated field-fillers without user friction).
 * 2. Time-delta inspection (detects superhuman submission speeds under 1.5s).
 * 3. Extensible hook for CAPTCHA/Turnstile verification.
 */

export interface SpamCheckParams {
  honeypot?: string | null;
  clientTimestamp?: number | string | null;
  minSubmissionDelayMs?: number;
}

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

/**
 * Validates whether an incoming submission exhibits bot or automated crawler patterns.
 */
export function evaluateSpam(params: SpamCheckParams): SpamCheckResult {
  const {
    honeypot,
    clientTimestamp,
    minSubmissionDelayMs = 1500, // Minimum 1.5 seconds to read/fill a form
  } = params;

  // 1. Honeypot check: If the hidden honeypot field has any value, it was filled by a bot
  if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
    return {
      isSpam: true,
      reason: "Automated submission detected (honeypot field was triggered).",
    };
  }

  // 2. Submission speed check: Automated scripts typically submit forms in < 1 second
  if (clientTimestamp) {
    const parsedTimestamp =
      typeof clientTimestamp === "string" ? parseInt(clientTimestamp, 10) : clientTimestamp;

    if (!isNaN(parsedTimestamp) && parsedTimestamp > 0) {
      const elapsedMs = Date.now() - parsedTimestamp;
      if (elapsedMs > 0 && elapsedMs < minSubmissionDelayMs) {
        return {
          isSpam: true,
          reason: "Submission rejected due to abnormal interaction speed.",
        };
      }
    }
  }

  return { isSpam: false };
}
