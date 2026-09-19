'use server'

import { createClient } from '@/lib/supabase/server'

export async function getCompanySettings() {
  const supabase = await createClient()
  const { data } = await supabase.from('company_settings').select('*')
  
  const settings: Record<string, string> = {}
  data?.forEach((s) => {
    if (s.value !== null) settings[s.key] = s.value
  })
  return settings
}

export async function updateCompanySetting(key: string, value: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('company_settings')
    .upsert({ key, value, updated_by: user.id, category: 'general' }, { onConflict: 'key' })
  if (error) throw new Error('Failed to update setting')

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'updated',
    p_entity_type: 'setting',
    p_description: `Updated setting: ${key}`,
  })
}

export async function updateCompanySettings(settings: Record<string, string>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const updates = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updated_by: user.id,
    category: 'general',
  }))

  for (const update of updates) {
    await supabase
      .from('company_settings')
      .upsert(update, { onConflict: 'key' })
  }
}
