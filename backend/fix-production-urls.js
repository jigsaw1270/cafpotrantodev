const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://mahmudulhasan12700:adibio69@jigsawcluster.fnu3uuw.mongodb.net/cafpotranto';
const PRODUCTION_BACKEND_URL = 'https://backend-q0oh7kgy7-jigsaw1270s-projects.vercel.app';

console.log('Connecting to MongoDB to fix production URLs...');

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB successfully!');
  
  const db = mongoose.connection.db;
  
  // Fix categories with localhost URLs
  const categories = await db.collection('categories').find({
    'image.url': { $regex: 'localhost:5000' }
  }).toArray();
  
  console.log(`Found ${categories.length} categories with localhost URLs`);
  
  for (const category of categories) {
    const oldUrl = category.image.url;
    const newUrl = oldUrl.replace('http://localhost:5000', PRODUCTION_BACKEND_URL);
    
    console.log(`Fixing category "${category.name}": ${oldUrl} -> ${newUrl}`);
    
    await db.collection('categories').updateOne(
      { _id: category._id },
      { $set: { 'image.url': newUrl } }
    );
  }
  
  // Fix subservices with localhost URLs
  const subservices = await db.collection('subservices').find({
    'image.url': { $regex: 'localhost:5000' }
  }).toArray();
  
  console.log(`Found ${subservices.length} subservices with localhost URLs`);
  
  for (const subservice of subservices) {
    const oldUrl = subservice.image.url;
    const newUrl = oldUrl.replace('http://localhost:5000', PRODUCTION_BACKEND_URL);
    
    console.log(`Fixing subservice "${subservice.name}": ${oldUrl} -> ${newUrl}`);
    
    await db.collection('subservices').updateOne(
      { _id: subservice._id },
      { $set: { 'image.url': newUrl } }
    );
  }
  
  console.log('URL fix completed!');
  process.exit(0);
})
.catch(error => {
  console.error('Connection error:', error);
  process.exit(1);
});