@echo off
echo 🔍 Service Role Storage Debug - Complete Analysis
echo.

echo 📊 Step 1: Testing service role storage...
curl -X GET http://localhost:3000/api/debug/service-storage
echo.
echo.

echo 🎯 Expected Results:
echo    ✅ supabaseService: CREATED
echo    ✅ bucket_creation: success
echo    ✅ upload_test: success
echo.
echo 🔍 If successful:
echo    1. Go to admin: http://localhost:3000/admin
echo    2. Add new blog/portfolio item
echo    3. Upload real image file
echo    4. Check console for messages
echo.
echo    Expected console:
echo    - "Creating bucket with service role..."
echo    - "✅ Image uploaded to Supabase with service role: [URL]"
echo.
echo 🔍 If failed:
echo    - Check SUPABASE_SERVICE_ROLE_KEY in .env.local
echo    - Verify RLS is disabled
echo    - Check service role permissions
echo.

pause
