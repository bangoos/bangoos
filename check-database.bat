@echo off
echo 🔍 Bangoos Web - Database Connection Check
echo.

echo 📊 Step 1: Testing database operations...
curl -X GET http://localhost:3000/api/debug/database-check
echo.
echo.

echo 🎯 Expected Results:
echo    ✅ supabase_url: SET
echo    ✅ supabase: CREATED
echo    ✅ supabaseService: CREATED
echo    ✅ blog_test: success
echo    ✅ portfolio_test: success
echo    ✅ products_test: success
echo    ✅ insert_test: success
echo    ✅ delete_test: success
echo    ✅ vercel_blob: connected
echo    ✅ save_test: success
echo.

echo 🔍 What This Checks:
echo    ✅ Environment variables configuration
echo    ✅ Supabase client creation
echo    ✅ Database table access
echo    ✅ Write operations (insert/delete)
echo    ✅ Vercel Blob integration
echo    ✅ Save operations to local JSON
echo.

echo 🚀 If Issues Found:
echo    1. Check .env.local variables
echo    2. Verify Supabase project access
echo    3. Check RLS policies
echo    4. Verify Vercel Blob token
echo    5. Check network connectivity
echo.

echo 📋 Debug Info:
echo    This test will show exactly where save/delete operations fail
echo    and provide specific error messages for troubleshooting.
echo.

pause
