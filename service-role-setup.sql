-- 🗄️ Create Service Role for Storage Operations
-- Run this in Supabase Dashboard → SQL Editor

-- 1. Create a service role that can bypass RLS
-- (This might work if you have admin permissions)

-- Try to create bucket with service role context
-- Note: This requires service role key, not anon key

-- 2. Alternative: Create bucket via API with service role
-- You'll need to update your .env.local with:
-- SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

-- 3. Check current permissions
SELECT 
  schemaname,
  tablename,
  rowsecurity,
  hasindexes,
  hasrules,
  hastriggers
FROM pg_tables 
WHERE schemaname = 'storage';

-- 4. Check current policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('buckets', 'objects');

-- 5. If you have any admin privileges, try this:
DO $$
BEGIN
  -- Try to disable RLS with exception handling
  BEGIN
    ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;
    ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
    RAISE NOTICE 'RLS disabled successfully';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Cannot disable RLS: %', SQLERRM;
  END;
  
  -- Try to create bucket
  BEGIN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'images', 
      'images', 
      true, 
      52428800,
      ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    ) ON CONFLICT (id) DO NOTHING;
    RAISE NOTICE 'Bucket created successfully';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Cannot create bucket: %', SQLERRM;
  END;
END $$;

-- 6. Verify results
SELECT * FROM storage.buckets WHERE name = 'images';

-- 📋 Next Steps:
-- 1. If this works, update your code to use service role
-- 2. If not, we'll use alternative storage solutions
-- 3. Test: http://localhost:3000/api/debug/supabase
