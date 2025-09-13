const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://mahmudulhasan12700:adibio69@jigsawcluster.fnu3uuw.mongodb.net/cafpotranto';

console.log('Connecting to MongoDB to check current URLs...');

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB successfully!');
  
  const db = mongoose.connection.db;
  
  // Check all categories
  const categories = await db.collection('categories').find({}).toArray();
  
  console.log(`Found ${categories.length} categories:`);
  categories.forEach(cat => {
    if (cat.image && cat.image.url) {
      console.log(`Category: ${cat.name} -> ${cat.image.url}`);
    }
  });
  
  // Check all subservices
  const subservices = await db.collection('subservices').find({}).toArray();
  
  console.log(`\nFound ${subservices.length} subservices:`);
  subservices.forEach(sub => {
    if (sub.image && sub.image.url) {
      console.log(`Subservice: ${sub.name} -> ${sub.image.url}`);
    }
  });
  
  process.exit(0);
})
.catch(error => {
  console.error('Connection error:', error);
  process.exit(1);
});