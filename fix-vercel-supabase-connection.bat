@echo off
echo 🔧 Bangoos Web - Fix Vercel Supabase Connection
echo.

echo 🎯 ISSUE IDENTIFIED:
echo    ✅ Environment Variables: PERFECT
echo    ✅ Import Functions: SUCCESS
echo    ✅ Save Functions: WORKING
echo    ❌ Supabase Connection: FAILING
echo    ❌ Database Functions: FAILING
echo.

echo 🔍 Root Cause: Supabase RLS policies blocking Vercel production
echo.

echo 🚀 SOLUTION STEPS:
echo    1. Open Supabase Dashboard: https://supabase.com/dashboard
echo    2. Select Bangoos project
echo    3. Go to SQL Editor
echo    4. Copy and run the SQL from: fix-vercel-supabase-rls.sql
echo    5. Test connection again
echo.

echo 📋 What the SQL does:
echo    ✅ Disables RLS temporarily for testing
echo    ✅ Creates permissive policies for service role
echo    ✅ Enables RLS back with new policies
echo    ✅ Tests table access
echo.

echo 🔧 Alternative Quick Fix:
echo    If SQL doesn't work, temporarily disable RLS:
echo    ALTER TABLE blog DISABLE ROW LEVEL SECURITY;
echo    ALTER TABLE portfolio DISABLE ROW LEVEL SECURITY;
echo    ALTER TABLE products DISABLE ROW LEVEL SECURITY;
echo.

echo 🚀 After Fix:
echo    1. Test debug endpoint again: https://bangoos.vercel.app/api/debug/vercel-deployment
echo    2. Test admin panel: https://bangoos.vercel.app/admin
echo    3. Verify save operations work
echo.

echo 📋 Expected Results After Fix:
echo    ✅ supabase_connection: { "success": true }
echo    ✅ db_functions_test: { "success": true }
echo    ✅ Save operations working in admin panel
echo.

pause
