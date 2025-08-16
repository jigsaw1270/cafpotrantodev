const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mahmudulhasan12700:adibio69@jigsawcluster.fnu3uuw.mongodb.net/cafpotranto')
.then(async () => {
  console.log('Connected to MongoDB');
  
  const db = mongoose.connection.db;
  const categories = await db.collection('categories').find({image: {$exists: true}}).limit(1).toArray();
  
  if (categories.length > 0) {
    console.log('Sample category with image:');
    console.log('Name:', categories[0].name);
    console.log('Image data:');
    console.log(JSON.stringify(categories[0].image, null, 2));
  } else {
    console.log('No categories with images found');
  }
  
  mongoose.connection.close();
})
.catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
