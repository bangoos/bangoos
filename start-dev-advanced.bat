@echo off
echo ========================================
echo BangOos Web - Development Server
echo ========================================
echo.

REM Try different npm paths
echo Looking for npm...

REM Method 1: Check if npm is in PATH
where npm >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Found npm in PATH
    goto :run_server
)

REM Method 2: Check common npm locations
if exist "C:\Program Files\nodejs\npm.cmd" (
    echo Found npm at: C:\Program Files\nodejs\npm.cmd
    set NPM_PATH="C:\Program Files\nodejs\npm.cmd"
    goto :run_server_with_path
)

if exist "C:\Program Files (x86)\nodejs\npm.cmd" (
    echo Found npm at: C:\Program Files (x86)\nodejs\npm.cmd
    set NPM_PATH="C:\Program Files (x86)\nodejs\npm.cmd"
    goto :run_server_with_path
)

REM Method 3: Check if node is available
where node >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Found Node.js, trying npm...
    goto :run_server
)

echo ========================================
echo ERROR: npm or Node.js not found!
echo ========================================
echo.
echo Please install Node.js first:
echo 1. Download from: https://nodejs.org
echo 2. Install Node.js (includes npm)
echo 3. Restart your computer
echo 4. Run this script again
echo.
echo Alternative: Use VS Code Terminal
echo 1. Open VS Code
echo 2. Open Terminal (Ctrl+`)
echo 3. Run: npm run dev
echo.
pause
exit /b 1

:run_server_with_path
echo Using npm from: %NPM_PATH%
%NPM_PATH% run dev
goto :end

:run_server
echo Starting development server...
npm run dev
goto :end

:end
pause
