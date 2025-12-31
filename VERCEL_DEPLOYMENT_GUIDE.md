# Bangoos Web - Vercel Deployment Guide

## 🔍 Vercel vs Local Issues

### **📊 Problem Analysis:**

- ✅ **Local testing**: Database operations working
- ❌ **Vercel deployment**: Save operations failing
- **Root cause**: Environment/configuration differences

## 🎯 Vercel-Specific Debug Steps

### **🚀 Step 1: Run Debug Tool**

```bash
# Local simulation
debug-vercel-deployment.bat

# After deployment
https://your-domain.vercel.app/api/debug/vercel-deployment
```

### **🔧 Step 2: Check Vercel Environment Variables**

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required Variables:**

```
NEXT_PUBLIC_SUPABASE_URL=https://wnawidjgedkiiystwuuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### **🔍 Step 3: Common Vercel Issues**

#### **1. Environment Variables Not Set**

- **Symptom**: Functions not found, connection errors
- **Fix**: Add variables in Vercel dashboard
- **Redeploy**: After adding variables

#### **2. Import Path Issues**

- **Symptom**: Module not found errors
- **Fix**: Check build includes new files
- **Verify**: `lib/supabase-database.ts` is deployed

#### **3. Supabase RLS in Production**

- **Symptom**: Permission denied errors
- **Fix**: Update RLS policies for production
- **Add**: Vercel IP ranges to allowed list

#### **4. Network Restrictions**

- **Symptom**: Timeout/connection errors
- **Fix**: Check Supabase network settings
- **Verify**: CORS configuration

## 🚀 Deployment Checklist

### **Before Deploy:**

- [ ] All environment variables set in Vercel
- [ ] `supabase-database.ts` included in build
- [ ] Admin actions updated to use new functions
- [ ] Local testing successful

### **After Deploy:**

- [ ] Run debug endpoint on Vercel URL
- [ ] Test admin panel save operations
- [ ] Check Vercel function logs
- [ ] Verify data persistence in Supabase

## 🔧 Quick Fixes

### **Environment Variables Setup:**

1. **Vercel Dashboard** → Project → Settings → Environment Variables
2. **Add all required variables**
3. **Redeploy** project

### **Supabase RLS for Production:**

```sql
-- Allow service role from Vercel
CREATE POLICY "Allow service role" ON blog
FOR ALL USING (auth.role() = 'service_role');

-- Or disable RLS for service role
ALTER TABLE blog DISABLE ROW LEVEL SECURITY;
```

### **Import Issues Fix:**

```json
// vercel.json
{
  "functions": {
    "lib/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

## 📊 Debug Results Interpretation

### **Success Indicators:**

```json
{
  "environment": { "NEXT_PUBLIC_SUPABASE_URL": "SET" },
  "import_test": { "supabase_database": "SUCCESS" },
  "supabase_connection": { "success": true },
  "save_db_test": { "success": true }
}
```

### **Failure Indicators:**

```json
{
  "environment": { "NEXT_PUBLIC_SUPABASE_URL": "NOT_SET" },
  "import_test": { "supabase_database": "FAILED" },
  "supabase_connection": { "success": false }
}
```

## 🚀 Next Steps

1. **Run local debug** to simulate Vercel
2. **Deploy to Vercel** with proper environment variables
3. **Test on actual Vercel URL**
4. **Check function logs** for specific errors
5. **Apply targeted fixes** based on debug results

---

**Status: Vercel deployment debug tools ready** 🚀
