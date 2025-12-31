@echo off
echo 🔍 Bangoos Web - Supabase Connection Deep Debug
echo.

echo 📊 Step 1: Deep Connection Analysis...
echo 🌐 Testing: https://bangoos.vercel.app/api/debug/supabase-connection-deep
echo.

echo 🎯 What This Tests:
echo    ✅ Anon Client Creation & Connection
echo    ✅ Service Role Client Creation & Connection
echo    ✅ Direct HTTP Request (Anon)
echo    ✅ Direct HTTP Request (Service Role)
echo    ✅ Environment Variables Verification
echo    ✅ Network Diagnostics
echo.

echo 🔍 Connection Methods:
echo    1. Supabase JS Client (Anon)
echo    2. Supabase JS Client (Service Role)
echo    3. Direct HTTP Request (Anon)
echo    4. Direct HTTP Request (Service Role)
echo    5. Environment Variables Check
echo    6. Network & Platform Diagnostics
echo.

echo 🚀 Expected Results:
echo    ✅ anon_connection: { "success": true }
echo    ✅ service_connection: { "success": true }
echo    ✅ http_request: { "success": true }
echo    ✅ service_http_request: { "success": true }
echo    ✅ env_verification: { "url_starts_with_https": true }
echo.

echo 🔍 If Still Failing:
echo    1. Check Supabase project status
echo    2. Verify API keys are valid
echo    3. Check Supabase service status
echo    4. Test network connectivity
echo    5. Verify CORS settings
echo.

echo 🌐 Test URLs:
echo    Local: http://localhost:3000/api/debug/supabase-connection-deep
echo    Vercel: https://bangoos.vercel.app/api/debug/supabase-connection-deep
echo.

pause
