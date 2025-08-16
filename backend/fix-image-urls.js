const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://mahmudulhasan12700:adibio69@jigsawcluster.fnu3uuw.mongodb.net/cafpotranto';

console.log('Connecting to MongoDB to fix image URLs...');

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB successfully!');
  
  const db = mongoose.connection.db;
  
  // Find all categories with images that have malformed URLs
  const categories = await db.collection('categories').find({
    'image.url': { $regex: '/uploadsuploads/' }
  }).toArray();
  
  console.log(`Found ${categories.length} categories with malformed image URLs`);
  
  for (const category of categories) {
    const oldUrl = category.image.url;
    const newUrl = oldUrl.replace('/uploadsuploads/', '/uploads/');
    
    console.log(`Fixing category "${category.name}": ${oldUrl} -> ${newUrl}`);
    
    await db.collection('categories').updateOne(
      { _id: category._id },
      { $set: { 'image.url': newUrl } }
    );
  }
  
  // Also check subservices if they exist
  const subservices = await db.collection('subservices').find({
    'image.url': { $regex: '/uploadsuploads/' }
  }).toArray();
  
  console.log(`Found ${subservices.length} subservices with malformed image URLs`);
  
  for (const subservice of subservices) {
    const oldUrl = subservice.image.url;
    const newUrl = oldUrl.replace('/uploadsuploads/', '/uploads/');
    
    console.log(`Fixing subservice "${subservice.name}": ${oldUrl} -> ${newUrl}`);
    
    await db.collection('subservices').updateOne(
      { _id: subservice._id },
      { $set: { 'image.url': newUrl } }
    );
  }
  
  console.log('✅ Image URL fixing completed!');
  mongoose.connection.close();
})
.catch(error => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});
