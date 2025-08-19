# Quick Git Save PowerShell Script
# Usage: .\git-save.ps1 "Your commit message"
# Or: .\git-save.ps1 (for interactive mode)

param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$CommitMessage
)

function Write-Step {
    param([string]$Message, [string]$Status = "INFO")
    
    switch ($Status) {
        "INFO" { Write-Host "🔄 $Message..." -ForegroundColor Cyan }
        "SUCCESS" { Write-Host "✅ $Message" -ForegroundColor Green }
        "ERROR" { Write-Host "❌ $Message" -ForegroundColor Red }
        "WARNING" { Write-Host "⚠️ $Message" -ForegroundColor Yellow }
    }
}

function Invoke-GitCommand {
    param([string]$Command, [string]$Description)
    
    Write-Step $Description
    try {
        $output = Invoke-Expression $Command 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Step "$Description completed" "SUCCESS"
            if ($output) {
                Write-Host $output -ForegroundColor Gray
            }
            return $true
        } else {
            Write-Step "$Description failed" "ERROR"
            Write-Host $output -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Step "$Description failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Get-DefaultCommitMessage {
    $now = Get-Date
    return "Auto save - $($now.ToString('MM/dd/yyyy HH:mm'))"
}

# Main script
Write-Host "🚀 Quick Git Save Tool" -ForegroundColor Magenta
Write-Host "======================" -ForegroundColor Magenta

# Check if we're in a git repository
try {
    git rev-parse --git-dir 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Not in a Git repository"
    }
} catch {
    Write-Step "Not in a Git repository!" "ERROR"
    exit 1
}

# Determine commit message
if ($CommitMessage -and $CommitMessage.Length -gt 0) {
    $message = $CommitMessage -join " "
} else {
    $defaultMessage = Get-DefaultCommitMessage
    $userInput = Read-Host "`n💬 Enter commit message (or press Enter for: '$defaultMessage')"
    $message = if ($userInput.Trim()) { $userInput.Trim() } else { $defaultMessage }
}

Write-Host "`n📝 Using commit message: '$message'" -ForegroundColor Yellow

# Execute git operations
$success = $true
$success = $success -and (Invoke-GitCommand "git add ." "Adding all changes")
$success = $success -and (Invoke-GitCommand "git commit -m `"$message`"" "Committing changes")
$success = $success -and (Invoke-GitCommand "git push" "Pushing to remote")

if ($success) {
    Write-Host "`n🎉 All changes saved and pushed successfully!" -ForegroundColor Green
} else {
    Write-Host "`n💥 Some operations failed. Please check the errors above." -ForegroundColor Red
    exit 1
}
