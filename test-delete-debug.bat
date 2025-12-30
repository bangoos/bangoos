@echo off
echo 🔍 Test Delete Function with Debug
echo.

echo 📊 Step 1: Test delete with debug endpoint...
curl -X POST http://localhost:3000/api/debug/delete-test ^
  -H "Content-Type: application/json" ^
  -d "{\"type\":\"blog\",\"id\":\"blog-1767056040430-dsi25d\"}"
echo.
echo.

echo 🎯 Step 2: Manual test in admin...
echo    1. Go to admin: http://localhost:3000/admin
echo    2. Try deleting any item
echo    3. Check for success popup
echo    4. Check if item disappears from list
echo    5. Refresh page to verify persistence
echo.
echo 📋 Expected Results:
echo    ✅ Success popup appears: "Berhasil! Data dihapus"
echo    ✅ Item disappears from admin list
echo    ✅ Item disappears from frontend
echo    ✅ Changes persist after refresh
echo.
echo 🔍 Debug Analysis:
echo    - delete_successful: true/false
echo    - item_removed: true/false
echo    - database_updated: true/false
echo    - likely_issue: description
echo.

pause
