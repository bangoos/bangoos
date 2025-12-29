@echo off
echo 🔍 Image Display Debug - Complete Analysis
echo.

echo 📊 Step 1: Testing image URLs and database...
curl -X GET http://localhost:3000/api/debug/images
echo.
echo.

echo 🎯 Check these in browser:
echo    1. Frontend: http://localhost:3000
echo    2. Admin: http://localhost:3000/admin
echo    3. Blog: http://localhost:3000/blog
echo    4. Portfolio: http://localhost:3000/portofolio
echo.
echo 🔍 Browser Debug Steps:
echo    1. Open Developer Tools (F12)
echo    2. Check Console tab for errors
echo    3. Check Network tab for failed image requests
echo    4. Check Elements tab for img tags
echo.
echo 📋 Expected Issues:
echo    - Console errors (CORS, 404, etc)
echo    - Network failures (red requests)
echo    - Missing img tags
echo    - CSS display issues
echo.

pause
