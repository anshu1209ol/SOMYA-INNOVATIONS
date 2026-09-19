'use server'

import { createClient } from '@/lib/supabase/server'
import type { DocumentVisibility } from '@/types'

export async function getDocuments(filters?: {
  project_id?: string; client_id?: string; visibility?: DocumentVisibility; limit?: number
}) {
  const supabase = await createClient()
  let query = supabase
    .from('documents')
    .select('*, profiles!documents_uploaded_by_fkey(full_name), projects(name)')
    .order('created_at', { ascending: false })

  if (filters?.project_id) query = query.eq('project_id', filters.project_id)
  if (filters?.client_id) query = query.eq('client_id', filters.client_id)
  if (filters?.visibility) query = query.eq('visibility', filters.visibility)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data } = await query
  return data ?? []
}

export async function createDocumentRecord(doc: {
  name: string; file_path: string; file_size?: number; mime_type?: string
  bucket: string; visibility?: DocumentVisibility; project_id?: string
  client_id?: string; description?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('documents')
    .insert({ ...doc, uploaded_by: user.id })
    .select().single()
  if (error) throw new Error('Failed to create document record')

  await supabase.rpc('log_activity', {
    p_user_id: user.id, p_action: 'uploaded', p_entity_type: 'document',
    p_entity_id: data.id, p_description: `Uploaded: ${doc.name}`,
  })

  return data
}

export async function deleteDocumentRecord(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('documents').delete().eq('id', id)
  if (error) throw new Error('Failed to delete document')
}
