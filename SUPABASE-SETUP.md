# 🗄️ Supabase Setup Instructions

## ✅ Current Status

- ✅ Supabase URL: SET
- ✅ Supabase Key: SET
- ✅ Supabase Client: CREATED
- ✅ Database Connection: SUCCESS
- ❌ Storage Bucket: NOT_FOUND

## 🔧 Setup Required

### Option 1: Easy Setup (Recommended)

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: wnawidjgedkiiystwuuq
3. **Go to Storage**: Click "Storage" in left menu
4. **Create bucket**:
   - Click "New bucket"
   - Name: `images`
   - Public bucket: ✅ YES
   - File size limit: 50MB
   - Allowed MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`

### Option 2: SQL Setup

1. **Go to SQL Editor**: In Supabase Dashboard
2. **Copy & paste** content from `supabase-setup.sql`
3. **Run** the SQL

### Option 3: Manual Setup

1. **Create bucket manually** in Storage section
2. **Set policies** for public access:
   ```sql
   CREATE POLICY "Allow public reads" ON storage.objects
   FOR SELECT USING (bucket_id = 'images');
   ```

## 🎯 After Setup

**Test again**: `http://localhost:3000/api/debug/supabase`

**Expected result**:

```json
{
  "storage_bucket": "FOUND",
  "storage_error": null
}
```

## 🖼️ Image Upload Will Work After Setup

Once storage bucket is ready:

- ✅ Real image uploads to Supabase
- ✅ Persistent image storage
- ✅ Public URL access
- ✅ Fallback to Unsplash if fails

## 🚀 Quick Test

After setting up storage:

1. Add new blog item
2. Upload any image
3. Check if image appears
4. Both upload and fallback should work

**Choose Option 1 for easiest setup!** 🎯
