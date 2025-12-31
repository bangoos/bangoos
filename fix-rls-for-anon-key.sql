-- Fix RLS untuk allow anon key operations
-- Run ini di Supabase SQL Editor

-- 1. Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON blog;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON portfolio;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON products;

-- 2. Create policies untuk anon key (public access)
CREATE POLICY "Enable all operations for anon users" ON blog
FOR ALL USING (true);

CREATE POLICY "Enable all operations for anon users" ON portfolio
FOR ALL USING (true);

CREATE POLICY "Enable all operations for anon users" ON products
FOR ALL USING (true);

-- 3. Enable RLS dengan policies baru
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. Test access
SELECT 'Blog table access test' as test, COUNT(*) as count FROM blog;
SELECT 'Portfolio table access test' as test, COUNT(*) as count FROM portfolio;
SELECT 'Products table access test' as test, COUNT(*) as count FROM products;
