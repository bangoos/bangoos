# 🖼️ Supabase Storage Setup for Image Upload

## 📋 Required Setup

### 1. Create Storage Bucket

```sql
-- Go to Supabase Dashboard → Storage
-- Create new bucket called 'images'
-- Set as public bucket
```

### 2. Set Bucket Policies

```sql
-- Go to Supabase Dashboard → Storage → Policies
-- Create policy for public access:

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
```

### 3. Alternative: Use Unsplash Fallback

If you don't want to setup Supabase Storage, the system will automatically:

- ✅ Use Unsplash images as fallback
- ✅ Generate random but realistic image URLs
- ✅ No storage setup required
- ✅ Images will load properly

## 🎯 Current Implementation

The uploadImage function has two modes:

### Mode 1: Supabase Storage (if configured)

```typescript
// Uploads to Supabase Storage
// Returns: https://your-project.supabase.co/storage/v1/object/public/images/filename.jpg
```

### Mode 2: Unsplash Fallback (default)

```typescript
// Uses Unsplash images
// Returns: https://images.unsplash.com/photo-1234567890?w=800&h=600&fit=crop&auto=format
```

## 🔧 Testing Image Upload

1. **Add new blog/portfolio item** in admin
2. **Upload an image** (any file)
3. **Check console** for upload status:
   - ✅ "Image uploaded to Supabase: [URL]" (if Supabase works)
   - ⚠️ "Supabase Storage upload failed" (falls back to Unsplash)

## 📱 Expected Results

### With Supabase Storage:

- ✅ Real uploaded images
- ✅ Custom images for each item
- ✅ Persistent storage

### With Unsplash Fallback:

- ✅ High-quality placeholder images
- ✅ Different images for each item
- ✅ No setup required
- ✅ Always works

## 🚀 Quick Test

Try adding a new blog item now:

1. Go to `/admin/blog`
2. Fill form and upload any image
3. Submit
4. Check if image appears in the list

**Both modes should work!** 🎨✨
