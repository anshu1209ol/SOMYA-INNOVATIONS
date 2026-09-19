'use server'

import { createClient } from '@/lib/supabase/server'

export async function getNotifications(limit = 20) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  return data ?? []
}

export async function getUnreadCount() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0

  const { count } = await supabase
    .from('notifications')
    .select('id', { count: 'exact' })
    .eq('user_id', user.id)
    .eq('is_read', false)

  return count ?? 0
}

export async function markAsRead(notificationId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
  if (error) throw new Error('Failed to mark notification as read')
}

export async function markAllAsRead() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false)
  if (error) throw new Error('Failed to mark all as read')
}

export async function createNotification(notification: {
  user_id: string
  type: string
  title: string
  message?: string
  link?: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.from('notifications').insert(notification)
  if (error) throw new Error('Failed to create notification')
}
