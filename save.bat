@echo off
:: Quick Git Save Batch File
:: Usage: save.bat "Your commit message"
:: Or: save.bat (for interactive mode)

echo 🚀 Quick Git Save Tool
echo ======================

:: Check if we're in a git repository
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo ❌ Not in a Git repository!
    pause
    exit /b 1
)

:: Get commit message
if "%~1"=="" (
    :: No arguments provided, use interactive mode
    set /p "message=💬 Enter commit message (or press Enter for auto message): "
    if "!message!"=="" (
        for /f "tokens=1-4 delims=/ " %%a in ('date /t') do set mydate=%%c-%%a-%%b
        for /f "tokens=1-2 delims=: " %%a in ('time /t') do set mytime=%%a:%%b
        set "message=Auto save - !mydate! !mytime!"
    )
) else (
    :: Use provided arguments as commit message
    set "message=%*"
)

echo.
echo 📝 Using commit message: "%message%"
echo.

:: Execute git operations
echo 🔄 Adding all changes...
git add .
if errorlevel 1 (
    echo ❌ Failed to add changes
    pause
    exit /b 1
)
echo ✅ Changes added

echo 🔄 Committing changes...
git commit -m "%message%"
if errorlevel 1 (
    echo ❌ Failed to commit changes
    pause
    exit /b 1
)
echo ✅ Changes committed

echo 🔄 Pushing to remote...
git push
if errorlevel 1 (
    echo ❌ Failed to push changes
    pause
    exit /b 1
)
echo ✅ Changes pushed

echo.
echo 🎉 All changes saved and pushed successfully!
echo.
pause
