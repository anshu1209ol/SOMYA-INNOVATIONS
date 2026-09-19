import { createClient } from '@/lib/supabase/server'

const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  avatars: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  documents: [
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain', 'text/csv',
  ],
  quotations: ['application/pdf'],
  'project-files': [
    'application/pdf', 'application/zip', 'image/jpeg', 'image/png',
    'image/webp', 'text/plain', 'text/csv', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  'blog-media': ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  'product-media': ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  'career-documents': [
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
}

const MAX_FILE_SIZES: Record<string, number> = {
  avatars: 2 * 1024 * 1024,        // 2MB
  documents: 10 * 1024 * 1024,     // 10MB
  quotations: 10 * 1024 * 1024,    // 10MB
  'project-files': 50 * 1024 * 1024, // 50MB
  'blog-media': 5 * 1024 * 1024,   // 5MB
  'product-media': 5 * 1024 * 1024, // 5MB
  'career-documents': 5 * 1024 * 1024, // 5MB
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 200)
}

function validateFile(file: File, bucket: string): string | null {
  const allowedTypes = ALLOWED_MIME_TYPES[bucket]
  const maxSize = MAX_FILE_SIZES[bucket]

  if (!allowedTypes) return `Invalid bucket: ${bucket}`
  if (!allowedTypes.includes(file.type)) return `File type "${file.type}" not allowed for ${bucket}`
  if (maxSize && file.size > maxSize) return `File exceeds maximum size of ${Math.round(maxSize / 1024 / 1024)}MB`

  return null
}

/**
 * Upload a file to Supabase Storage.
 * Validates MIME type and file size before upload.
 */
export async function uploadFile(
  file: File,
  bucket: string,
  path: string,
): Promise<{ url: string; path: string; error?: string }> {
  const validationError = validateFile(file, bucket)
  if (validationError) {
    return { url: '', path: '', error: validationError }
  }

  const safeName = sanitizeFilename(file.name)
  const fullPath = `${path}/${Date.now()}_${safeName}`

  const supabase = await createClient()
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fullPath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    return { url: '', path: '', error: error.message }
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fullPath)
  return { url: urlData.publicUrl, path: fullPath }
}
