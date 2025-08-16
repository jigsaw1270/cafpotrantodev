// Test script to verify login API
const test = async () => {
  try {
    console.log('Testing login API...');
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@cafpotranto.it',
        password: 'Admin123!'
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (response.ok) {
      console.log('✅ Login successful!');
    } else {
      console.log('❌ Login failed:', data.message);
    }
  } catch (error) {
    console.error('🚨 Test failed:', error);
  }
};

test();
