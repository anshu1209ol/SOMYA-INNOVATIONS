import { createClient } from '@/lib/supabase/server'

/**
 * Get a signed URL for a private file in Supabase Storage.
 * Signed URLs expire after the specified duration (default 1 hour).
 */
export async function getSignedUrl(
  bucket: string,
  path: string,
  expiresIn = 3600,
): Promise<string | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn)

  if (error) return null
  return data.signedUrl
}

/**
 * Get the public URL for a file in a public bucket (avatars, blog-media, product-media).
 */
export function getPublicUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}

/**
 * Delete a file from Supabase Storage.
 */
export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.storage.from(bucket).remove([path])
  return !error
}
