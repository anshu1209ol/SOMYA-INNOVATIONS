import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

/**
 * Subscribe to a user's notification channel for realtime updates.
 * Returns the channel for cleanup.
 */
export function subscribeToNotifications(
  userId: string,
  onInsert: (notification: Record<string, unknown>) => void,
): RealtimeChannel {
  const supabase = createClient()

  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onInsert(payload.new)
      }
    )
    .subscribe()

  return channel
}

/**
 * Subscribe to task updates for a project.
 */
export function subscribeToTaskUpdates(
  projectId: string,
  onUpdate: (task: Record<string, unknown>) => void,
): RealtimeChannel {
  const supabase = createClient()

  const channel = supabase
    .channel(`tasks:${projectId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: `project_id=eq.${projectId}`,
      },
      (payload) => {
        onUpdate(payload.new)
      }
    )
    .subscribe()

  return channel
}

/**
 * Subscribe to lead pipeline updates.
 */
export function subscribeToLeadUpdates(
  onUpdate: (lead: Record<string, unknown>) => void,
): RealtimeChannel {
  const supabase = createClient()

  const channel = supabase
    .channel('leads:all')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'leads',
      },
      (payload) => {
        onUpdate(payload.new)
      }
    )
    .subscribe()

  return channel
}

/**
 * Cleanup: unsubscribe from a channel.
 */
export function unsubscribe(channel: RealtimeChannel) {
  const supabase = createClient()
  supabase.removeChannel(channel)
}
