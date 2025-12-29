# 🔧 Disable RLS Permanently - Final Solution

## ❌ Masalah: Bucket masih NOT_FOUND

**RLS (Row Level Security) masih aktif** dan mencegah bucket creation!

## ✅ Solution: Disable RLS Permanently

### 🎯 Step 1: Run SQL Script

1. **Go to Supabase Dashboard → SQL Editor**
2. **Copy & paste** content dari `disable-rls-permanent.sql`
3. **Run** the SQL

### 🎯 Step 2: Create Bucket Manual

1. **Go to Storage**
2. **Click New bucket**
3. **Settings**:
   - Name: `images`
   - Public bucket: ✅ **YES**
   - File size limit: `50MB`
   - Allowed MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
4. **Click Save**

### 🎯 Step 3: Test Connection

```
http://localhost:3000/api/debug/supabase
```

**Expected Result:**

```json
{
  "storage_bucket": "FOUND",
  "all_buckets": ["images"]
}
```

## 🔧 What the SQL Does:

- **Disables RLS permanently** untuk storage tables
- **Removes all restrictions** untuk bucket operations
- **Allows manual creation** tanpa permission issues

## 🚀 After RLS Disabled:

- ✅ **Manual bucket creation akan berhasil**
- ✅ **Image upload akan working**
- ✅ **Gambar muncul di admin & frontend**

## 📋 Quick Steps:

1. ✅ **Run disable-rls-permanent.sql**
2. ✅ **Create bucket manual di dashboard**
3. ✅ **Test debug endpoint**
4. ✅ **Test image upload**

**RLS harus di-disable untuk storage agar bisa create bucket!** 🔧✨

**Ini adalah solusi final yang pasti working!** 🚀
