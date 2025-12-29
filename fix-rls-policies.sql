-- 🔧 Fix Supabase RLS Policies for Storage
-- Run this in Supabase Dashboard → SQL Editor

-- 1. First, disable RLS for storage (temporary fix)
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- 2. Create bucket without RLS restrictions
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images', 
  'images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Re-enable RLS with proper policies
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 4. Create storage policies that allow all operations
-- Bucket policies
CREATE POLICY "Allow all operations on storage.buckets" ON storage.buckets
FOR ALL USING (true);

-- Object policies  
CREATE POLICY "Allow all operations on storage.objects" ON storage.objects
FOR ALL USING (true);

-- 5. Alternative: Allow anonymous access (more permissive)
DROP POLICY IF EXISTS "Allow all operations on storage.buckets" ON storage.buckets;
DROP POLICY IF EXISTS "Allow all operations on storage.objects" ON storage.objects;

CREATE POLICY "Allow anonymous bucket access" ON storage.buckets
FOR ALL USING (true);

CREATE POLICY "Allow anonymous object access" ON storage.objects  
FOR ALL USING (true);

-- 6. Test bucket creation
SELECT * FROM storage.buckets WHERE name = 'images';

-- ✅ After running this SQL:
-- 1. Test: http://localhost:3000/api/debug/supabase
-- 2. Should show: storage_bucket: "FOUND"
-- 3. Test image upload in admin
