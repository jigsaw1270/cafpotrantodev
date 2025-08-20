const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
require('dotenv').config();

async function resetAdminLockout() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all locked accounts
    const lockedAdmins = await Admin.find({
      $or: [
        { lockUntil: { $exists: true } },
        { loginAttempts: { $gt: 0 } }
      ]
    });

    console.log(`Found ${lockedAdmins.length} admin(s) with login restrictions`);

    if (lockedAdmins.length > 0) {
      // Reset lockout for all accounts
      const result = await Admin.updateMany(
        {
          $or: [
            { lockUntil: { $exists: true } },
            { loginAttempts: { $gt: 0 } }
          ]
        },
        {
          $unset: { lockUntil: 1, loginAttempts: 1 }
        }
      );

      console.log(`✅ Reset login restrictions for ${result.modifiedCount} admin account(s)`);
      
      // Show admin accounts status
      const admins = await Admin.find({}, 'email name isActive loginAttempts lockUntil');
      console.log('\n📋 Current admin accounts status:');
      admins.forEach(admin => {
        console.log(`- ${admin.email} (${admin.name}) - Active: ${admin.isActive} - Attempts: ${admin.loginAttempts || 0} - Locked: ${admin.lockUntil ? 'Yes' : 'No'}`);
      });
    } else {
      console.log('✅ No admin accounts are currently locked');
    }

  } catch (error) {
    console.error('❌ Error resetting admin lockout:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the script
resetAdminLockout();
