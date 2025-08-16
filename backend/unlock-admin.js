const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Admin model
const Admin = require('./src/models/Admin');

async function unlockAdminAccount() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Find and unlock the admin account
    const result = await Admin.updateOne(
      { email: process.env.ADMIN_EMAIL },
      {
        $unset: {
          lockUntil: 1,
          loginAttempts: 1
        }
      }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Admin account unlocked successfully!');
      console.log('You can now try logging in again with:');
      console.log('- Email:', process.env.ADMIN_EMAIL);
      console.log('- Password:', process.env.ADMIN_PASSWORD);
    } else {
      console.log('ℹ️ Admin account was not locked or does not exist.');
    }

    // Verify the admin user status
    const admin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (admin) {
      console.log('\n📊 Admin Account Status:');
      console.log('- Email:', admin.email);
      console.log('- Active:', admin.isActive);
      console.log('- Login Attempts:', admin.loginAttempts || 0);
      console.log('- Locked Until:', admin.lockUntil || 'Not locked');
      console.log('- Last Login:', admin.lastLogin || 'Never');
    }

  } catch (error) {
    console.error('❌ Failed to unlock admin account:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the unlock script
unlockAdminAccount();
