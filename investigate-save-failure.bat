@echo off
echo 🔍 Bangoos Web - Save Failure Investigation
echo.

echo 📊 Step 1: Deep Investigation of Save Issues...
curl -X GET http://localhost:3000/api/debug/save-fail-investigation
echo.
echo.

echo 🎯 What This Checks:
echo    ✅ Environment Variables Deep Check
echo    ✅ Supabase Clients Status
echo    ✅ Database Schema Check
echo    ✅ RLS Policies Check
echo    ✅ Individual Save Operations Test
echo    ✅ Database Functions Test
echo    ✅ Error Analysis & Recommendations
echo.

echo 🔍 Possible Issues:
echo    1. RLS policies blocking service role
echo    2. Missing required columns in tables
echo    3. Incorrect data types
echo    4. Service role key permissions
echo    5. Table constraints violations
echo    6. Network connectivity issues
echo    7. Supabase service limitations
echo.

echo 🚀 After Investigation:
echo    1. Review error messages in detail
echo    2. Check specific failure points
echo    3. Apply targeted fixes
echo    4. Test individual operations
echo    5. Verify complete save functionality
echo.

echo 📋 Expected Output:
echo    Detailed error messages for each operation
echo    Specific failure points identification
echo    Actionable recommendations
echo    Step-by-step fix guidance
echo.

pause
