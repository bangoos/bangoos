-- Fix Supabase RLS for Vercel Production
-- Run this in Supabase SQL Editor

-- 1. Disable RLS temporarily for testing
ALTER TABLE blog DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- 2. Or create permissive policies for service role
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON blog;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON portfolio;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON products;

CREATE POLICY "Allow service role full access" ON blog
FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON portfolio
FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON products
FOR ALL USING (auth.role() = 'service_role');

-- 3. Enable RLS back with new policies
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. Test connection
SELECT 'Blog table access test' as test, COUNT(*) as count FROM blog;
SELECT 'Portfolio table access test' as test, COUNT(*) as count FROM portfolio;
SELECT 'Products table access test' as test, COUNT(*) as count FROM products;
