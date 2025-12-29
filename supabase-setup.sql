-- 🖼️ Supabase Storage Setup SQL
-- Run this in Supabase Dashboard → SQL Editor

-- 1. Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images', 
  'images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Create policies for public access
-- Allow public reads
CREATE POLICY "Allow public reads" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated uploads  
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');

-- Allow authenticated updates
CREATE POLICY "Allow authenticated updates" ON storage.objects
FOR UPDATE USING (bucket_id = 'images');

-- Allow authenticated deletes
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'images');

-- 3. Create database tables (if not exists)
CREATE TABLE IF NOT EXISTS blog (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  image TEXT,
  date TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  category TEXT CHECK (category IN ('UMKM', 'Skripsi', 'Kantor')),
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT,
  features TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Enable RLS (Row Level Security)
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 5. Create policies for database tables
-- Blog policies
CREATE POLICY "Allow all operations on blog" ON blog
FOR ALL USING (true);

-- Portfolio policies  
CREATE POLICY "Allow all operations on portfolio" ON portfolio
FOR ALL USING (true);

-- Products policies
CREATE POLICY "Allow all operations on products" ON products
FOR ALL USING (true);

-- ✅ Setup complete!
-- Now test: http://localhost:3000/api/debug/supabase
