-- Create website_settings table
CREATE TABLE IF NOT EXISTS website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT NOT NULL DEFAULT 'BangOos - Digital Agency',
  site_description TEXT NOT NULL DEFAULT 'Digital agency yang menyediakan solusi teknologi modern',
  logo_url TEXT NOT NULL DEFAULT '/logo.png',
  favicon_url TEXT NOT NULL DEFAULT '/favicon.ico',
  footer_text TEXT NOT NULL DEFAULT '© 2024 BangOos. All rights reserved.',
  footer_links JSONB NOT NULL DEFAULT '[
    {"name": "Tentang", "url": "#tentang"},
    {"name": "Layanan", "url": "#layanan"},
    {"name": "Portofolio", "url": "#portofolio"},
    {"name": "Blog", "url": "#blog"},
    {"name": "Kontak", "url": "#kontak"}
  ]',
  social_media JSONB NOT NULL DEFAULT '{
    "facebook": "https://facebook.com/bangoos",
    "twitter": "https://twitter.com/bangoos",
    "instagram": "https://instagram.com/bangoos",
    "linkedin": "https://linkedin.com/company/bangoos",
    "youtube": "https://youtube.com/@bangoos"
  }',
  contact_info JSONB NOT NULL DEFAULT '{
    "email": "info@bangoos.com",
    "phone": "+62 812-3456-7890",
    "address": "Jakarta, Indonesia"
  }',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_website_settings_updated_at ON website_settings(updated_at);

-- RLS (Row Level Security) Policies
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for website display)
CREATE POLICY "Enable read access for all users" ON website_settings
  FOR SELECT USING (true);

-- Allow authenticated users to update settings
CREATE POLICY "Enable update for authenticated users" ON website_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert settings
CREATE POLICY "Enable insert for authenticated users" ON website_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete settings
CREATE POLICY "Enable delete for authenticated users" ON website_settings
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert default settings if table is empty
INSERT INTO website_settings (
  site_title, site_description, logo_url, favicon_url, 
  footer_text, footer_links, social_media, contact_info
) VALUES (
  'BangOos - Digital Agency',
  'Digital agency yang menyediakan solusi teknologi modern',
  '/logo.png',
  '/favicon.ico',
  '© 2024 BangOos. All rights reserved.',
  '[
    {"name": "Tentang", "url": "#tentang"},
    {"name": "Layanan", "url": "#layanan"},
    {"name": "Portofolio", "url": "#portofolio"},
    {"name": "Blog", "url": "#blog"},
    {"name": "Kontak", "url": "#kontak"}
  ]',
  '{
    "facebook": "https://facebook.com/bangoos",
    "twitter": "https://twitter.com/bangoos",
    "instagram": "https://instagram.com/bangoos",
    "linkedin": "https://linkedin.com/company/bangoos",
    "youtube": "https://youtube.com/@bangoos"
  }',
  '{
    "email": "info@bangoos.com",
    "phone": "+62 812-3456-7890",
    "address": "Jakarta, Indonesia"
  }'
) ON CONFLICT (id) DO NOTHING;
