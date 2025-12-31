@echo off
echo 🌐 Bangoos Web - Vercel Deployment Debug
echo.

echo 📊 Step 1: Testing Vercel Deployment Issues...
echo 🌐 If running locally, this simulates Vercel environment
echo 🌐 If on Vercel, this shows actual environment
echo.

echo 🌐 Testing on: http://localhost:3000/api/debug/vercel-deployment
curl -X GET http://localhost:3000/api/debug/vercel-deployment
echo.
echo.

echo 🎯 What This Checks:
echo    ✅ Environment Variables (Vercel vs Local)
echo    ✅ Runtime Information
echo    ✅ Import Test (supabase-database functions)
echo    ✅ Supabase Connection Test
echo    ✅ Database Functions Test
echo    ✅ Vercel-Specific Issues Analysis
echo.

echo 🔍 Vercel-Specific Issues:
echo    1. Environment variables not set in Vercel dashboard
echo    2. Supabase keys not configured for production
echo    3. Network restrictions on Vercel edge
echo    4. Build process not including new files
echo    5. Import path resolution issues on Vercel
echo    6. Service role key permissions in production
echo    7. Supabase RLS policies blocking Vercel IP ranges
echo.

echo 🚀 After Debug:
echo    1. Check environment variables in Vercel dashboard
echo    2. Verify Supabase project settings
echo    3. Review Vercel build logs
echo    4. Test with production Supabase keys
echo    5. Deploy and test on actual Vercel URL
echo.

echo 📋 Expected Results:
echo    Environment variables status
echo    Import success/failure
echo    Supabase connection status
echo    Database functions test results
echo    Vercel-specific recommendations
echo.

echo 🌐 For Actual Vercel Testing:
echo    Deploy to Vercel first
echo    Then visit: https://your-domain.vercel.app/api/debug/vercel-deployment
echo.

pause
