# 🗄️ Supabase Image Storage - Service Role Solution

## ❌ Current Issue:

```
❌ must be owner of table buckets
❌ RLS blocking storage operations
❌ Anon key insufficient for storage
```

## ✅ Solution: Use Service Role Key

### 🎯 Option 1: Get Service Role Key

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select project**: wnawidjgedkiiystwuuq
3. **Go to Settings → API**
4. **Copy Service Role Key** (not anon key!)
5. **Add to .env.local**:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### 🎯 Option 2: Update Code for Service Role

**Update `lib/supabase.ts`:**

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client (for reads)
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Service client (for writes/storage)
export const supabaseService =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
        },
      })
    : null;
```

### 🎯 Option 3: Update uploadImage Function

**Update `actions/admin-actions.ts`:**

```typescript
import { supabaseService } from "@/lib/supabase";

export async function uploadImage(fd: FormData): Promise<string> {
  const f = fd.get("file") as File;
  if (!f) throw new Error("No file");

  // Try service role for storage operations
  if (supabaseService) {
    try {
      const fileName = `${Date.now()}-${f.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
      const { data, error } = await supabaseService.storage.from("images").upload(fileName, f, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) {
        console.warn("Service role upload failed:", error);
        return getFallbackImage();
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabaseService.storage.from("images").getPublicUrl(fileName);

      console.log("Image uploaded to Supabase with service role:", publicUrl);
      return publicUrl;
    } catch (storageError) {
      console.warn("Service role storage error:", storageError);
      return getFallbackImage();
    }
  }

  // Fallback to Unsplash
  return getFallbackImage();
}
```

## 🔧 What Service Role Provides:

### ✅ Service Role Can:

- **Bypass RLS policies**
- **Create storage buckets**
- **Upload files without restrictions**
- **Manage storage permissions**

### ❌ Anon Role Cannot:

- **Create buckets**
- **Bypass RLS**
- **Upload without policies**

## 📋 Implementation Steps:

### 1. Get Service Role Key

- Dashboard → Settings → API
- Copy Service Role (secret) Key
- Add to .env.local

### 2. Update Code

- Add supabaseService client
- Update uploadImage function
- Test with service role

### 3. Test Storage

- Create bucket with service role
- Upload images
- Verify in dashboard

## 🚀 Expected Result:

**With Service Role:**

- ✅ Bucket creation succeeds
- ✅ Image upload works
- ✅ Real images in Supabase
- ✅ Public URLs working

**Fallback:**

- ✅ Unsplash images still work
- ✅ No storage setup required

## 🎯 Why This Works:

**Service Role Key = Admin Access**

- Bypasses all RLS restrictions
- Full storage permissions
- Can create buckets and upload files

**Anon Role Key = Public Access**

- Limited by RLS policies
- Cannot create buckets
- Cannot upload without permissions

## 📋 Action Steps:

1. ✅ **Get service role key from dashboard**
2. ✅ **Add to .env.local**
3. ✅ **Update code for service role**
4. ✅ **Test image upload**
5. ✅ **Verify images in Supabase**

**Service role adalah solusi untuk storage permissions!** 🔑✨

**Silakan coba dapatkan service role key dari Supabase Dashboard!** 🚀
