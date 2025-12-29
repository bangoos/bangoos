@echo off
echo 🪄 Creating Supabase Storage Bucket Automatically...
echo.

curl -X POST http://localhost:3000/api/debug/create-bucket ^
  -H "Content-Type: application/json" ^
  -d "{}"

echo.
echo.
echo 📋 After creation, test again:
echo    http://localhost:3000/api/debug/supabase
echo.

pause
