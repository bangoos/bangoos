@echo off
echo 🗄️ Testing Service Role Storage - Real Supabase Images
echo.

echo 📊 Step 1: Test service role connection...
curl -X GET http://localhost:3000/api/debug/supabase
echo.
echo.

echo 🎯 Step 2: Test image upload with service role...
echo    1. Go to admin: http://localhost:3000/admin
echo    2. Add new blog/portfolio item
echo    3. Upload a real image file
echo    4. Check console for upload messages
echo.
echo    Expected console messages:
echo    - "Creating bucket with service role..."
echo    - "Bucket created successfully"
echo    - "✅ Image uploaded to Supabase with service role: [URL]"
echo.
echo.

echo 🔍 Step 3: Verify in Supabase Dashboard
echo    1. Go to Storage section
echo    2. Check if 'images' bucket exists
echo    3. Check if uploaded files appear
echo.
echo.

echo 📋 Expected Results:
echo    ✅ Real images uploaded to Supabase
echo    ✅ Public URLs working
echo    ✅ Images appear in admin and frontend
echo    ✅ Fallback to Unsplash if fails
echo.

pause
