#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function execCommand(command, description) {
  try {
    console.log(`\n🔄 ${description}...`);
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    console.log(`✅ ${description} completed`);
    if (output.trim()) {
      console.log(output.trim());
    }
    return true;
  } catch (error) {
    console.error(`❌ Error during ${description}:`);
    console.error(error.message);
    return false;
  }
}

function getDefaultCommitMessage() {
  const now = new Date();
  const date = now.toLocaleDateString('en-US');
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return `Auto save - ${date} ${time}`;
}

async function quickSave() {
  console.log('🚀 Quick Git Save Tool (Skip Hooks)');
  console.log('====================================');

  // Check if we're in a git repository
  try {
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ Not in a Git repository!');
    process.exit(1);
  }

  // Get commit message from user
  const defaultMessage = getDefaultCommitMessage();
  
  return new Promise((resolve) => {
    rl.question(`\n💬 Enter commit message (or press Enter for: "${defaultMessage}"): `, (input) => {
      const commitMessage = input.trim() || defaultMessage;
      
      console.log(`\n📝 Using commit message: "${commitMessage}"`);
      
      // Execute git operations with --no-verify to skip pre-commit hooks
      const success = (
        execCommand('git add .', 'Adding all changes') &&
        execCommand(`git commit --no-verify -m "${commitMessage}"`, 'Committing changes (skipping hooks)') &&
        execCommand('git push', 'Pushing to remote')
      );

      if (success) {
        console.log('\n🎉 All changes saved and pushed successfully!');
        console.log('📌 Note: Pre-commit hooks were skipped for faster saving.');
      } else {
        console.log('\n💥 Some operations failed. Please check the errors above.');
      }

      rl.close();
      resolve();
    });
  });
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.length > 0) {
  // Use provided message
  const commitMessage = args.join(' ');
  console.log('🚀 Quick Git Save Tool (Skip Hooks)');
  console.log('====================================');
  console.log(`\n📝 Using commit message: "${commitMessage}"`);
  
  const success = (
    execCommand('git add .', 'Adding all changes') &&
    execCommand(`git commit --no-verify -m "${commitMessage}"`, 'Committing changes (skipping hooks)') &&
    execCommand('git push', 'Pushing to remote')
  );

  if (success) {
    console.log('\n🎉 All changes saved and pushed successfully!');
    console.log('📌 Note: Pre-commit hooks were skipped for faster saving.');
  } else {
    console.log('\n💥 Some operations failed. Please check the errors above.');
    process.exit(1);
  }
} else {
  // Interactive mode
  quickSave();
}
