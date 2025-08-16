const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Admin model
const Admin = require('./src/models/Admin');

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Check if admin user already exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      console.log('Admin user details:');
      console.log('- Email:', existingAdmin.email);
      console.log('- Name:', existingAdmin.name);
      console.log('- Role:', existingAdmin.role);
      console.log('- Active:', existingAdmin.isActive);
    } else {
      // Create default admin user
      console.log('Creating default admin user...');
      
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);
      
      const adminUser = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Administrator',
        role: 'superadmin',
        isActive: true
      });

      await adminUser.save();
      console.log('✅ Default admin user created successfully!');
      console.log('Login credentials:');
      console.log('- Email:', process.env.ADMIN_EMAIL);
      console.log('- Password:', process.env.ADMIN_PASSWORD);
    }

    // Create some sample categories if none exist
    const Category = require('./src/models/Category');
    const categoryCount = await Category.countDocuments();
    
    if (categoryCount === 0) {
      console.log('Creating sample categories...');
      
      const sampleCategories = [
        {
          name: 'Family Law',
          description: 'Legal services related to family matters including divorce, custody, and domestic relations.',
          slug: 'family-law',
          isActive: true,
          displayOrder: 1,
          metadata: {
            seoTitle: 'Family Law Services - Expert Legal Assistance',
            seoDescription: 'Professional family law services including divorce, child custody, and domestic relations legal support.',
            seoKeywords: ['family law', 'divorce lawyer', 'child custody', 'legal services']
          }
        },
        {
          name: 'Corporate Law',
          description: 'Business legal services including contracts, compliance, and corporate governance.',
          slug: 'corporate-law',
          isActive: true,
          displayOrder: 2,
          metadata: {
            seoTitle: 'Corporate Law Services - Business Legal Solutions',
            seoDescription: 'Comprehensive corporate law services for businesses including contracts, compliance, and legal consultation.',
            seoKeywords: ['corporate law', 'business lawyer', 'contracts', 'legal compliance']
          }
        },
        {
          name: 'Real Estate Law',
          description: 'Legal services for property transactions, landlord-tenant issues, and real estate disputes.',
          slug: 'real-estate-law',
          isActive: true,
          displayOrder: 3,
          metadata: {
            seoTitle: 'Real Estate Law Services - Property Legal Assistance',
            seoDescription: 'Expert real estate legal services for property transactions, disputes, and landlord-tenant matters.',
            seoKeywords: ['real estate law', 'property lawyer', 'real estate transactions', 'property disputes']
          }
        }
      ];

      await Category.insertMany(sampleCategories);
      console.log('✅ Sample categories created successfully!');
    } else {
      console.log(`Found ${categoryCount} existing categories in database.`);
    }

    console.log('\n🎉 Database initialization completed successfully!');
    console.log('\nYou can now:');
    console.log('1. Start the backend server: npm start');
    console.log('2. Login to admin panel with the credentials above');
    console.log('3. Manage categories and subservices through the admin interface');

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Make sure MongoDB Atlas connection string is correct in .env file');
      console.log('2. Check if your IP address is whitelisted in MongoDB Atlas');
      console.log('3. Verify the database user credentials');
    }
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

// Run the initialization
initializeDatabase();
