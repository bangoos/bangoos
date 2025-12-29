@echo off
echo 🔄 Restarting Development Server...
echo.
echo ⚠️  IMPORTANT: Environment variables have been updated!
echo ⚠️  You MUST restart the server for changes to take effect!
echo.

echo 🛑 Stopping any existing server...
taskkill /F /IM node.exe 2>nul
timeout /T 2 /NOBREAK >nul

echo 🚀 Starting fresh development server...
echo.
echo 📋 After server starts, test Supabase connection:
echo    http://localhost:3000/api/debug/supabase
echo.
echo 🎯 Expected result should show:
echo    - supabase_url: "SET"
echo    - supabase_key: "SET" 
echo    - supabase_client: "CREATED"
echo    - connection_test: "SUCCESS"
echo.

npm run dev

pause
