/**
 * SOMYA INNOVATIONS — Consistent Error Handling
 *
 * Custom error classes for structured error responses.
 * Never expose SQL errors, stack traces, or internal details to clients.
 */

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class AuthError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403)
  }
}

export class ValidationError extends AppError {
  public readonly fields: Record<string, string>

  constructor(message = 'Validation failed', fields: Record<string, string> = {}) {
    super(message, 400)
    this.fields = fields
  }
}

export class NotFoundError extends AppError {
  constructor(entity = 'Resource') {
    super(`${entity} not found`, 404)
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'A database error occurred') {
    super(message, 500, false)
  }
}

export class UploadError extends AppError {
  constructor(message = 'File upload failed') {
    super(message, 400)
  }
}

/**
 * Format an error for safe client-side consumption.
 * Never exposes internal error details.
 */
export function formatErrorResponse(error: unknown): {
  error: string
  statusCode: number
} {
  if (error instanceof AppError) {
    return {
      error: error.message,
      statusCode: error.statusCode,
    }
  }

  // Generic error — don't expose details
  console.error('[Internal Error]', error)
  return {
    error: 'An unexpected error occurred. Please try again.',
    statusCode: 500,
  }
}
