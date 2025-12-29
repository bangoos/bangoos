# 🚀 BangOos Web - Development Server Instructions

## 📋 Quick Start Guide

### 🔧 Method 1: VS Code Terminal (Recommended)

1. **Open VS Code**
2. **Open Terminal**: `Ctrl + ` `(backtick) or`View → Terminal`
3. **Navigate to project**: `cd c:\Users\Admin\Documents\trae_projects\bangoos\bangoos-fresh`
4. **Start server**: `npm run dev`
5. **Open browser**: `http://localhost:3000`

### 🔧 Method 2: Command Prompt (CMD)

1. **Open CMD**: `Win + R` → `cmd` → Enter
2. **Navigate to project**: `cd c:\Users\Admin\Documents\trae_projects\bangoos\bangoos-fresh`
3. **Start server**: `npm run dev`
4. **Open browser**: `http://localhost:3000`

### 🔧 Method 3: PowerShell

1. **Open PowerShell**: `Win + X` → `PowerShell`
2. **Navigate to project**: `cd c:\Users\Admin\Documents\trae_projects\bangoos\bangoos-fresh`
3. **Start server**: `npm run dev`
4. **Open browser**: `http://localhost:3000`

### 🔧 Method 4: Git Bash (If installed)

1. **Open Git Bash**
2. **Navigate to project**: `cd /c/Users/Admin/Documents/trae_projects/bangoos/bangoos-fresh`
3. **Start server**: `npm run dev`
4. **Open browser**: `http://localhost:3000`

## 🛠️ Troubleshooting

### ❌ "npm not found" Error

**Solution:**

1. Install Node.js from [nodejs.org](https://nodejs.org)
2. Download LTS version (recommended)
3. Install with default settings
4. Restart computer
5. Try again

### ❌ "node not found" Error

**Solution:**

1. Check Node.js installation: `node --version`
2. Add Node.js to PATH:
   - Right-click "This PC" → Properties
   - Advanced system settings → Environment Variables
   - Edit PATH → Add `C:\Program Files\nodejs`
3. Restart terminal

### ❌ Permission Issues

**Solution:**

1. Run terminal as Administrator
2. Or use VS Code (usually works better)

### ❌ Port 3000 already in use

**Solution:**

1. Kill process: `taskkill /F /IM node.exe`
2. Or use different port: `npm run dev -- -p 3001`

## 🎯 What to Expect

When server starts successfully:

```
> bangoos-fresh@0.1.0 dev
> next dev

- Ready! Started on http://localhost:3000
```

## 📱 Access Points

- **Homepage**: `http://localhost:3000`
- **Admin**: `http://localhost:3000/admin`
- **Blog**: `http://localhost:3000/blog`
- **Portfolio**: `http://localhost:3000/portofolio`
- **Products**: `http://localhost:3000/products`

## 🔍 Debugging

Check console for:

- "Fetching database from Supabase..."
- "Database loaded successfully from Supabase"
- Any error messages

## 📞 Need Help?

If still having issues:

1. Check Node.js installation: `node --version`
2. Check npm installation: `npm --version`
3. Check project directory: `ls`
4. Check package.json exists: `cat package.json`

## 🚀 Quick Command Summary

```bash
# Start development server
npm run dev

# Install dependencies (if needed)
npm install

# Check versions
node --version
npm --version

# Install Supabase (if needed)
npm install @supabase/supabase-js
```
