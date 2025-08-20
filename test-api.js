// Simple test to verify the API fix
const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing subservices API with active=true...');
    
    const response = await fetch('http://localhost:5000/api/subservices?active=true&limit=10');
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Success:', data.success);
    
    if (data.success) {
      console.log('✅ API call successful!');
      console.log('Number of subservices:', data.data.subservices.length);
    } else {
      console.log('❌ API call failed:', data.message);
      if (data.errors) {
        console.log('Validation errors:', data.errors);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
