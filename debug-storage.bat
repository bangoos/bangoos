@echo off
echo 🔍 Comprehensive Storage Debug + Force Creation
echo.

echo 📊 Step 1: Full storage analysis...
curl -X GET http://localhost:3000/api/debug/storage-full
echo.
echo.

echo 🪄 Step 2: Force bucket creation (multiple attempts)...
curl -X POST http://localhost:3000/api/debug/force-create ^
  -H "Content-Type: application/json" ^
  -d "{}"
echo.
echo.

echo 📋 Step 3: Verify results...
curl -X GET http://localhost:3000/api/debug/supabase
echo.

echo.
echo 🎯 If successful, test image upload in admin!
echo.

pause
