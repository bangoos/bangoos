@echo off
echo 🔍 Bangoos Web - Supabase Save Operations Debug
echo.

echo 📊 Step 1: Testing Save Operations Deep Debug...
echo 🌐 Testing: https://bangoos.vercel.app/api/debug/supabase-save-operations
echo.

echo 🎯 What This Tests:
echo    ✅ Service Client Creation
echo    ✅ Service Role Authentication
echo    ✅ Blog Save Operation (upsert)
echo    ✅ Portfolio Save Operation (upsert)
echo    ✅ Delete Operations
echo    ✅ Environment Variables Check
echo    ✅ Error Analysis & Recommendations
echo.

echo 🔍 Save Operations Analysis:
echo    1. Service role key validation
echo    2. RLS policies for service role
echo    3. Table permissions check
echo    4. Network connectivity test
echo    5. Actual save/delete operations
echo.

echo 🚀 Expected Results:
echo    ✅ service_client: "CREATED"
echo    ✅ service_auth: { "success": true }
echo    ✅ blog_save_test: { "success": true }
echo    ✅ portfolio_save_test: { "success": true }
echo    ✅ delete_test: { "success": true }
echo.

echo 🔍 If Save Fails:
echo    1. Service role key invalid/expired
echo    2. RLS policies blocking service role
echo    3. Table permissions incorrect
echo    4. Network connectivity issues
echo    5. Supabase service restrictions
echo.

echo 🚀 After Debug:
echo    1. Review specific error messages
echo    2. Apply targeted fixes
echo    3. Test admin panel save operations
echo    4. Verify data persistence
echo.

echo 🌐 Test URLs:
echo    Local: http://localhost:3000/api/debug/supabase-save-operations
echo    Vercel: https://bangoos.vercel.app/api/debug/supabase-save-operations
echo.

pause
