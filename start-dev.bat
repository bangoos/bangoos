@echo off
echo Starting BangOos Web Development Server...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies first...
    npm install
    echo.
)

REM Start development server
echo Starting Next.js development server...
echo Server will run on: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
