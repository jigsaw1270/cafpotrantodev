const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Admin model
const Admin = require('./src/models/Admin');

async function resetAdminPassword() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Find the admin user
    const admin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      return;
    }

    console.log('📊 Current Admin User:');
    console.log('- Email:', admin.email);
    console.log('- Name:', admin.name);
    console.log('- Role:', admin.role);
    console.log('- Active:', admin.isActive);

    // Test the current password
    console.log('\n🔍 Testing current password...');
    const isCurrentPasswordValid = await admin.comparePassword(process.env.ADMIN_PASSWORD);
    console.log('Current password valid:', isCurrentPasswordValid);

    if (!isCurrentPasswordValid) {
      console.log('\n🔧 Resetting password...');
      
      // Hash the new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);
      
      // Update the admin password
      await Admin.updateOne(
        { email: process.env.ADMIN_EMAIL },
        { 
          password: hashedPassword,
          $unset: {
            lockUntil: 1,
            loginAttempts: 1
          }
        }
      );

      console.log('✅ Password reset successfully!');
      
      // Test the new password
      const updatedAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
      const isNewPasswordValid = await updatedAdmin.comparePassword(process.env.ADMIN_PASSWORD);
      console.log('New password valid:', isNewPasswordValid);
    }

    console.log('\n🎯 Login Credentials:');
    console.log('- Email:', process.env.ADMIN_EMAIL);
    console.log('- Password:', process.env.ADMIN_PASSWORD);

  } catch (error) {
    console.error('❌ Failed to reset admin password:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the reset script
resetAdminPassword();
