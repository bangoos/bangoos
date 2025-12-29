@echo off
echo Installing Supabase for BangOos Web...
echo.

REM Try different npm approaches
echo 1. Using npm directly...
npm install @supabase/supabase-js

echo.
echo 2. Using npx...
npx @supabase/supabase-js@latest install

echo.
echo Installation complete!
echo.
pause
