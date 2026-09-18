/**
 * Secure File Upload Architecture & Specification
 *
 * SOMYA INNOVATIONS adheres to enterprise security standards for file handling:
 *
 * 1. ZERO DIRECT WEB-ROOT EXECUTION:
 *    - Uploaded files are NEVER stored inside the public/ directory or executable web roots.
 *    - Files must be stored in an isolated, private Object Storage bucket (AWS S3, Google Cloud Storage, or MinIO).
 *
 * 2. PRESIGNED URL WORKFLOW (RECOMMENDED FOR CLOUD DEPLOYMENTS):
 *    - Step A: Client requests a single-use presigned PUT URL from /api/upload/presign with file metadata (size, MIME, hash).
 *    - Step B: Server validates size (< 25MB), file extension (whitelist only), and client authentication/rate-limit.
 *    - Step C: Server generates an ephemeral AWS S3 Presigned URL expiring in 300 seconds with Content-Disposition: attachment.
 *    - Step D: Client uploads directly to the private S3 bucket.
 *    - Step E: An asynchronous Lambda / Cloud Function executes an antivirus scan (ClamAV) and marks the attachment verified.
 *
 * 3. DEFENSE-IN-DEPTH ATTRIBUTES:
 *    - Force "Content-Disposition: attachment; filename=safe-name.pdf" to prevent browser in-situ execution.
 *    - Force "X-Content-Type-Options: nosniff" to prevent MIME sniffing attacks.
 *    - Disallow all executable formats (.exe, .sh, .php, .js, .bat, etc.).
 */

export const UPLOAD_SECURITY_CONFIG = {
  maxSizeBytes: 25 * 1024 * 1024, // 25 MB max
  allowedMimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "application/zip",
    "application/x-zip-compressed",
    "image/jpeg",
    "image/png",
    "text/plain",
  ],
  allowedExtensions: [
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".csv",
    ".zip",
    ".jpg",
    ".jpeg",
    ".png",
    ".txt",
  ],
} as const;
