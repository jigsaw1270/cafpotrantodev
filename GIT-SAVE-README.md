# Quick Git Save Tools 🚀

Simple, hassle-free Git operations without dealing with staging, commit details, or push commands manually.

## Available Methods

### 1. NPM Scripts (Recommended)
```bash
# Interactive mode - asks for commit message
npm run save
npm run quick-save
npm run qs

# With commit message
npm run save "Fixed authentication bug"
npm run qs "Added new feature"
```

### 2. Direct Node.js Script
```bash
# Interactive mode
node git-save.js

# With commit message
node git-save.js "Your commit message here"
```

### 3. PowerShell Script
```powershell
# Interactive mode
.\git-save.ps1

# With commit message
.\git-save.ps1 "Your commit message here"
```

### 4. Batch File (Windows)
```cmd
# Interactive mode
save.bat

# With commit message
save.bat "Your commit message here"
```

## What These Tools Do

1. **Automatically stage all changes** (`git add .`)
2. **Commit with your message** (`git commit -m "message"`)
3. **Push to remote repository** (`git push`)

## Auto-Generated Commit Messages

If you don't provide a commit message, the tools will automatically generate one with the current date and time:
- Example: `Auto save - 08/19/2025 14:30`

## Quick Start

The easiest way to save your work:

```bash
npm run qs
```

Then just press Enter to use the auto-generated message, or type your own message.

## Features

- ✅ **No staging required** - automatically stages all changes
- ✅ **Auto-generated commit messages** - no thinking required
- ✅ **Automatic push** - changes go straight to remote
- ✅ **Error handling** - shows clear error messages if something fails
- ✅ **Multiple interfaces** - use whatever you prefer (npm, node, PowerShell, batch)
- ✅ **Interactive and command-line modes** - flexible usage

## Error Handling

If any step fails (add, commit, or push), the script will:
- Show a clear error message
- Stop execution to prevent further issues
- Display the Git error output for debugging

## Examples

```bash
# Quick save with auto message
npm run qs

# Save with custom message
npm run save "Implemented user authentication"

# Multiple word messages work fine
npm run qs Fixed bug in category display and added validation

# PowerShell version
.\git-save.ps1 "Updated API endpoints"

# Batch file version
save.bat "Final touches before deployment"
```

## Tips

- **Use `npm run qs`** for the fastest save operation
- **Auto messages are fine** for regular work-in-progress saves
- **Custom messages are better** for significant features or fixes
- **All tools do the same thing** - pick what feels most comfortable
