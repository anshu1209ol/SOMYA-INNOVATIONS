'use server'

import { createClient } from '@/lib/supabase/server'
import type { BlogPostStatus } from '@/types'

/** Get published blog posts for public resources page */
export async function getPublishedPosts(filters?: { category_id?: string; limit?: number }) {
  const supabase = await createClient()
  let query = supabase
    .from('blog_posts')
    .select('*, profiles!blog_posts_author_id_fkey(full_name), blog_categories(name, slug)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (filters?.category_id) query = query.eq('category_id', filters.category_id)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data } = await query
  return data ?? []
}

/** Get all posts including drafts (admin) */
export async function getAllPosts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*, profiles!blog_posts_author_id_fkey(full_name), blog_categories(name, slug)')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*, profiles!blog_posts_author_id_fkey(full_name, avatar_url), blog_categories(name, slug)')
    .eq('slug', slug)
    .single()
  return data
}

export async function createPost(post: {
  title: string; slug: string; excerpt?: string; content?: string
  cover_image?: string; category_id?: string; status?: BlogPostStatus
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      ...post,
      author_id: user.id,
      published_at: post.status === 'published' ? new Date().toISOString() : null,
    })
    .select().single()
  if (error) throw new Error('Failed to create post')
  return data
}

export async function updatePost(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()

  // Set published_at on first publish
  if (updates.status === 'published') {
    const { data: existing } = await supabase.from('blog_posts').select('published_at').eq('id', id).single()
    if (!existing?.published_at) {
      updates.published_at = new Date().toISOString()
    }
  }

  const { data, error } = await supabase.from('blog_posts').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update post')
  return data
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw new Error('Failed to delete post')
}

export async function getBlogCategories() {
  const supabase = await createClient()
  const { data } = await supabase.from('blog_categories').select('*').order('name')
  return data ?? []
}
