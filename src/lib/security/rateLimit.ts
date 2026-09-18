/**
 * Rate Limiting Module
 *
 * Implements a sliding-window rate limiter per client IP address.
 * Designed with a clean interface that allows effortless migration to
 * distributed Redis/Upstash backends when scaling out across multiple container instances.
 */

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory token/timestamp store
const ipStore = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 120000);
      if (record.timestamps.length === 0) {
        ipStore.delete(ip);
      }
    }
  }, 300000);
}

export interface RateLimitConfig {
  maxRequests: number; // e.g., 5 requests
  windowMs: number;    // e.g., 60_000 (1 minute)
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Checks and records a request against the rate limit for a specific IP.
 */
export function checkRateLimit(
  clientIp: string,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60000 }
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  let record = ipStore.get(clientIp);
  if (!record) {
    record = { timestamps: [] };
    ipStore.set(clientIp, record);
  }

  // Filter timestamps outside current sliding window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  const currentCount = record.timestamps.length;
  const remaining = Math.max(0, config.maxRequests - currentCount);

  if (currentCount >= config.maxRequests) {
    const oldest = record.timestamps[0] || now;
    const resetSeconds = Math.ceil((oldest + config.windowMs - now) / 1000);
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetSeconds: Math.max(1, resetSeconds),
    };
  }

  // Record this attempt
  record.timestamps.push(now);

  return {
    success: true,
    limit: config.maxRequests,
    remaining: remaining - 1,
    resetSeconds: Math.ceil(config.windowMs / 1000),
  };
}

/**
 * Extracts client IP from standard reverse-proxy headers (Cloudflare, Vercel, AWS ALB, Nginx).
 */
export function getClientIp(headers: Headers): string {
  // 1. Cloudflare connecting IP
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  // 2. Standard X-Forwarded-For (take the first IP in the chain)
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",");
    if (ips.length > 0 && ips[0].trim()) {
      return ips[0].trim();
    }
  }

  // 3. X-Real-IP
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "127.0.0.1";
}
