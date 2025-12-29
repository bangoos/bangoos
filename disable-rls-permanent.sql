-- 🔧 Disable RLS Permanently for Storage
-- Run this in Supabase Dashboard → SQL Editor

-- Disable RLS for storage tables (permanent fix)
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'storage' 
AND tablename IN ('buckets', 'objects');

-- After this, create bucket manually in dashboard:
-- 1. Go to Storage
-- 2. Click New bucket
-- 3. Name: images, Public: YES
-- 4. Save

-- Test: http://localhost:3000/api/debug/supabase
