const Admin = require('../models/Admin');

const createDefaultAdmin = async () => {
  try {
    // Check if any admin exists
    const existingAdmin = await Admin.findOne();
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create default admin
    const defaultAdminData = {
      email: process.env.ADMIN_EMAIL || 'admin@cafpotranto.it',
      password: process.env.ADMIN_PASSWORD || 'Admin123!',
      name: 'CafPotranto Admin',
      role: 'superadmin',
    };

    const admin = new Admin(defaultAdminData);
    await admin.save();

    console.log('✅ Default admin user created successfully');
    console.log(`📧 Email: ${defaultAdminData.email}`);
    console.log(`🔑 Password: ${defaultAdminData.password}`);
    console.log('⚠️  Please change the default password after first login');

  } catch (error) {
    console.error('❌ Error creating default admin:', error.message);
  }
};

module.exports = {
  createDefaultAdmin,
};
