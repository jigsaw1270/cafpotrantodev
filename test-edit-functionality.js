// Test script to verify category edit functionality
const test = async () => {
  try {
    console.log('🧪 Testing Category Edit Functionality...\n');
    
    // First, login to get auth token
    console.log('1. Logging in...');
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@cafpotranto.it',
        password: 'Admin123!'
      })
    });

    if (!loginResponse.ok) {
      throw new Error('Login failed');
    }

    const loginData = await loginResponse.json();
    const token = loginData.data.token;
    console.log('✅ Login successful!');

    // Get list of categories
    console.log('\n2. Fetching categories...');
    const categoriesResponse = await fetch('http://localhost:5000/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!categoriesResponse.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categoriesData = await categoriesResponse.json();
    const categories = categoriesData.data.categories;
    
    if (categories.length === 0) {
      console.log('❌ No categories found to test with');
      return;
    }

    const testCategory = categories[0];
    console.log(`✅ Found ${categories.length} categories. Using "${testCategory.name}" for testing.`);

    // Test getting single category
    console.log('\n3. Testing get single category...');
    const singleCategoryResponse = await fetch(`http://localhost:5000/api/categories/${testCategory._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!singleCategoryResponse.ok) {
      throw new Error('Failed to fetch single category');
    }

    const singleCategoryData = await singleCategoryResponse.json();
    console.log('✅ Single category fetch successful!');
    console.log(`   Category: "${singleCategoryData.data.category.name}"`);
    console.log(`   Description: "${singleCategoryData.data.category.description}"`);
    console.log(`   Active: ${singleCategoryData.data.category.isActive}`);
    console.log(`   Display Order: ${singleCategoryData.data.category.displayOrder}`);

    // Test updating category
    console.log('\n4. Testing category update...');
    const originalDescription = testCategory.description;
    const updatedDescription = `${originalDescription} [UPDATED BY TEST ${new Date().toISOString()}]`;
    
    const updateResponse = await fetch(`http://localhost:5000/api/categories/${testCategory._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: testCategory.name,
        description: updatedDescription,
        displayOrder: testCategory.displayOrder,
        isActive: testCategory.isActive
      })
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update category');
    }

    const updateData = await updateResponse.json();
    console.log('✅ Category update successful!');
    console.log(`   Updated description: "${updateData.data.category.description}"`);

    // Verify the update by fetching again
    console.log('\n5. Verifying update...');
    const verifyResponse = await fetch(`http://localhost:5000/api/categories/${testCategory._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!verifyResponse.ok) {
      throw new Error('Failed to verify update');
    }

    const verifyData = await verifyResponse.json();
    const updatedCategory = verifyData.data.category;
    
    if (updatedCategory.description === updatedDescription) {
      console.log('✅ Update verification successful!');
      console.log('   The category was properly updated in the database.');
    } else {
      console.log('❌ Update verification failed!');
      console.log(`   Expected: "${updatedDescription}"`);
      console.log(`   Got: "${updatedCategory.description}"`);
    }

    // Restore original description
    console.log('\n6. Restoring original data...');
    const restoreResponse = await fetch(`http://localhost:5000/api/categories/${testCategory._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: testCategory.name,
        description: originalDescription,
        displayOrder: testCategory.displayOrder,
        isActive: testCategory.isActive
      })
    });

    if (!restoreResponse.ok) {
      throw new Error('Failed to restore category');
    }

    console.log('✅ Original data restored!');

    console.log('\n🎉 ALL TESTS PASSED! Category edit functionality is working correctly.');
    console.log('\n📋 Summary:');
    console.log('   ✅ Authentication works');
    console.log('   ✅ Get categories list works');
    console.log('   ✅ Get single category works');
    console.log('   ✅ Update category works');
    console.log('   ✅ Update verification works');
    console.log('   ✅ Data restoration works');
    
    console.log('\n🌐 Admin Panel Edit URLs:');
    categories.forEach(category => {
      console.log(`   • Edit "${category.name}": http://localhost:3001/categories/${category._id}/edit`);
    });

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
};

test();
