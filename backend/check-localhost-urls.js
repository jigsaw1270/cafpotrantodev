const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://mahmudulhasan12700:adibio69@jigsawcluster.fnu3uuw.mongodb.net/cafpotranto';

console.log('Connecting to MongoDB to check for localhost URLs...');

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB successfully!');
  
  const db = mongoose.connection.db;
  
  // Check for localhost URLs in categories
  const localhostCategories = await db.collection('categories').find({
    'image.url': { $regex: 'localhost' }
  }).toArray();
  
  console.log(`Found ${localhostCategories.length} categories with localhost URLs:`);
  localhostCategories.forEach(cat => {
    console.log(`Category: ${cat.name} -> ${cat.image.url}`);
  });
  
  // Check for localhost URLs in subservices
  const localhostSubservices = await db.collection('subservices').find({
    'image.url': { $regex: 'localhost' }
  }).toArray();
  
  console.log(`Found ${localhostSubservices.length} subservices with localhost URLs:`);
  localhostSubservices.forEach(sub => {
    console.log(`Subservice: ${sub.name} -> ${sub.image.url}`);
  });
  
  process.exit(0);
})
.catch(error => {
  console.error('Connection error:', error);
  process.exit(1);
});