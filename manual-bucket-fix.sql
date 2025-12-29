-- 🔧 Alternative Fix - Manual Bucket Creation (No Owner Required)
-- Use this if you get "must be owner of table buckets" error

-- 🎯 Option 1: Manual Dashboard Creation (Recommended)
-- 1. Go to Supabase Dashboard → Storage
-- 2. Click "New bucket"
-- 3. Settings:
--    - Name: images
--    - Public bucket: ✅ YES
--    - File size limit: 50MB (52428800)
--    - Allowed MIME types: image/jpeg, image/png, image/gif, image/webp
-- 4. Click "Save"

-- 🎯 Option 2: Try Different Bucket Names (if 'images' fails)
-- Try creating these names manually in Dashboard:
-- - uploads
-- - public  
-- - media
-- - files

-- 🎯 Option 3: Check Existing Policies
-- Run this to see current policies:
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('buckets', 'objects');

-- 🎯 Option 4: Simplified Policy Creation (if you have some permissions)
-- Try these one by one:

-- Allow public reads (most permissive)
CREATE POLICY "Public Read Access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Allow public uploads
CREATE POLICY "Public Upload Access" ON storage.objects  
FOR INSERT WITH CHECK (bucket_id = 'images');

-- Allow public updates
CREATE POLICY "Public Update Access" ON storage.objects
FOR UPDATE USING (bucket_id = 'images');

-- Allow public deletes
CREATE POLICY "Public Delete Access" ON storage.objects
FOR DELETE USING (bucket_id = 'images');

-- 🎯 After Manual Creation:
-- 1. Test: http://localhost:3000/api/debug/supabase
-- 2. Should show: storage_bucket: "FOUND"
-- 3. Test image upload in admin

-- ✅ Manual Dashboard Creation is the most reliable solution!
