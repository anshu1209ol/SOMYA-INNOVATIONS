/**
 * Security Sanitization Utilities
 *
 * Provides defense-in-depth sanitization for user inputs, form payloads,
 * and uploaded file metadata before backend processing or persistent storage.
 */

/**
 * Strips HTML tags, script elements, null bytes, and malicious control characters
 * from untrusted string inputs.
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    // Remove null bytes
    .replace(/\0/g, "")
    // Strip HTML/XML tags
    .replace(/<[^>]*>/g, "")
    // Remove dangerous javascript: URIs
    .replace(/javascript:/gi, "")
    // Remove data: text/html URIs
    .replace(/data:text\/html/gi, "")
    // Strip potential template injection delimiters if applicable
    .replace(/{{|}}/g, "")
    // Normalize unicode and trim excess whitespace
    .trim();
}

/**
 * Sanitizes an entire key-value object of form inputs.
 */
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = { ...data };

  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeText(value);
    }
  }

  return sanitized;
}

/**
 * Blocklist of dangerous file extensions that should never be permitted
 * regardless of file payload claims.
 */
const DISALLOWED_EXTENSIONS = new Set([
  "exe", "bat", "cmd", "sh", "bash", "ps1", "vbs", "js", "mjs", "cjs",
  "ts", "py", "rb", "php", "phtml", "jsp", "asp", "aspx", "cgi", "pl",
  "jar", "war", "ear", "dll", "so", "dylib", "com", "scr", "hta", "msi"
]);

/**
 * Allowlist of permissible business and technical document extensions.
 */
export const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  "pdf", "doc", "docx", "xls", "xlsx", "csv", "zip", "png", "jpg", "jpeg", "txt"
]);

/**
 * Validates and sanitizes uploaded filenames against directory traversal,
 * null byte injection, and executable file extensions.
 */
export function sanitizeFilename(rawFilename?: string | null): {
  isValid: boolean;
  sanitizedName?: string;
  error?: string;
} {
  if (!rawFilename || typeof rawFilename !== "string") {
    return { isValid: true, sanitizedName: undefined };
  }

  // 1. Remove null bytes and directory traversal sequences
  let cleanName = rawFilename
    .replace(/\0/g, "")
    .replace(/\.\./g, "")
    .replace(/[/\\]/g, "_")
    .trim();

  // 2. Extract base extension
  const parts = cleanName.split(".");
  if (parts.length < 2) {
    return { isValid: false, error: "File must have an explicit valid extension." };
  }

  const extension = parts.pop()?.toLowerCase() || "";

  // 3. Reject executable or dangerous extensions
  if (DISALLOWED_EXTENSIONS.has(extension)) {
    return { isValid: false, error: `Files with .${extension} extension are strictly prohibited.` };
  }

  // 4. Require extension to be in allowlist
  if (!ALLOWED_UPLOAD_EXTENSIONS.has(extension)) {
    return {
      isValid: false,
      error: `Unsupported file type .${extension}. Allowed: ${Array.from(ALLOWED_UPLOAD_EXTENSIONS).join(", ")}`,
    };
  }

  // 5. Sanitize the base name (only allow alphanumeric, dash, underscore)
  const baseName = parts.join(".").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  cleanName = `${baseName || "attachment"}.${extension}`;

  return { isValid: true, sanitizedName: cleanName };
}
