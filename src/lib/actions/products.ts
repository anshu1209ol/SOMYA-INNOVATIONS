'use server'

import { createClient } from '@/lib/supabase/server'

/** Get active products for public display */
export async function getProducts(filters?: { category_id?: string; limit?: number }) {
  const supabase = await createClient()
  let query = supabase
    .from('products')
    .select('*, product_categories(name, slug)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (filters?.category_id) query = query.eq('category_id', filters.category_id)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data } = await query
  return data ?? []
}

/** Get all products including inactive (admin) */
export async function getAllProducts() {
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('*, product_categories(name, slug)').order('created_at', { ascending: false })
  return data ?? []
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('*, product_categories(name, slug)').eq('slug', slug).single()
  return data
}

export async function getProductCategories() {
  const supabase = await createClient()
  const { data } = await supabase.from('product_categories').select('*').order('display_order', { ascending: true })
  return data ?? []
}

export async function createProduct(product: {
  name: string; slug: string; category_id?: string; description?: string
  specifications?: Record<string, string>; images?: string[]; brand?: string; model?: string
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('products').insert(product).select().single()
  if (error) throw new Error('Failed to create product')
  return data
}

export async function updateProduct(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update product')
  return data
}
