-- ==============================================================================
-- SOMYA INNOVATIONS — Storage Buckets
-- Migration: 00002_storage_buckets.sql
-- ==============================================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('avatars', 'avatars', true, 2097152, -- 2MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('documents', 'documents', false, 10485760, -- 10MB
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain', 'text/csv']),
  ('quotations', 'quotations', false, 10485760, -- 10MB
    ARRAY['application/pdf']),
  ('project-files', 'project-files', false, 52428800, -- 50MB
    ARRAY['application/pdf', 'application/zip', 'application/x-zip-compressed', 'image/jpeg', 'image/png', 'image/webp', 'text/plain', 'text/csv', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('blog-media', 'blog-media', true, 5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']),
  ('product-media', 'product-media', true, 5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('career-documents', 'career-documents', false, 5242880, -- 5MB
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;


-- ─── STORAGE POLICIES ──────────────────────────────────────────────────────

-- AVATARS (public read, authenticated upload own)
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- DOCUMENTS (private, admin + uploaders + project members)
CREATE POLICY "Admin can access all documents"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'documents'
    AND public.is_admin(auth.uid())
  );

CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can view documents they uploaded"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- QUOTATIONS (private, admin only)
CREATE POLICY "Admin can access all quotation files"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'quotations'
    AND public.is_admin(auth.uid())
  );

-- PROJECT FILES (admin + project-scoped)
CREATE POLICY "Admin can access all project files"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'project-files'
    AND public.is_admin(auth.uid())
  );

CREATE POLICY "Internal users can upload project files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'project-files'
    AND public.is_internal_user(auth.uid())
  );

CREATE POLICY "Internal users can view project files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'project-files'
    AND public.is_internal_user(auth.uid())
  );

-- BLOG MEDIA (public read, admin write)
CREATE POLICY "Anyone can view blog media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-media');

CREATE POLICY "Admin can manage blog media"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'blog-media'
    AND public.is_admin(auth.uid())
  );

-- PRODUCT MEDIA (public read, admin write)
CREATE POLICY "Anyone can view product media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-media');

CREATE POLICY "Admin can manage product media"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'product-media'
    AND public.is_admin(auth.uid())
  );

-- CAREER DOCUMENTS (applicant upload, admin read)
CREATE POLICY "Anyone can upload career documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'career-documents');

CREATE POLICY "Admin can access career documents"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'career-documents'
    AND public.is_admin(auth.uid())
  );
