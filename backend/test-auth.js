// Test authentication endpoints
const axios = require('axios');
require('dotenv').config({ path: './config.env' });

const BASE_URL = 'http://localhost:5000/api';

// Test user data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'test123456'
};

async function testAuth() {
  console.log('\n==================================================');
  console.log('   🧪 Testing Authentication Endpoints');
  console.log('==================================================\n');

  try {
    // Test 1: Register
    console.log('📝 Test 1: User Registration');
    console.log('-----------------------------------');
    try {
      const registerResponse = await axios.post(`${BASE_URL}/auth/register`, testUser);
      console.log('✅ Registration successful!');
      console.log('   Token:', registerResponse.data.token ? '✓ Generated' : '✗ Missing');
      console.log('   User:', registerResponse.data.user.name);
      console.log('   Email:', registerResponse.data.user.email);
      console.log('');
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('⚠️  User already exists (this is OK for testing)');
        console.log('   Will test login instead...\n');
      } else {
        console.log('❌ Registration failed!');
        console.log('   Status:', error.response?.status);
        console.log('   Message:', error.response?.data?.msg || error.message);
        console.log('');
      }
    }

    // Test 2: Login
    console.log('🔑 Test 2: User Login');
    console.log('-----------------------------------');
    try {
      const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ Login successful!');
      console.log('   Token:', loginResponse.data.token ? '✓ Generated' : '✗ Missing');
      console.log('   User:', loginResponse.data.user.name);
      console.log('   Email:', loginResponse.data.user.email);
      console.log('');

      // Test 3: Verify Token
      const token = loginResponse.data.token;
      console.log('🔍 Test 3: Token Verification');
      console.log('-----------------------------------');
      try {
        const verifyResponse = await axios.get(`${BASE_URL}/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('✅ Token verification successful!');
        console.log('   User:', verifyResponse.data.user.name);
        console.log('   Email:', verifyResponse.data.user.email);
        console.log('');
      } catch (error) {
        console.log('❌ Token verification failed!');
        console.log('   Status:', error.response?.status);
        console.log('   Message:', error.response?.data?.msg || error.message);
        console.log('');
      }

      // Test 4: Wrong Password
      console.log('🔒 Test 4: Wrong Password (Should Fail)');
      console.log('-----------------------------------');
      try {
        await axios.post(`${BASE_URL}/auth/login`, {
          email: testUser.email,
          password: 'wrongpassword'
        });
        console.log('❌ Should have failed but didn\'t!');
        console.log('');
      } catch (error) {
        if (error.response?.status === 400) {
          console.log('✅ Correctly rejected wrong password');
          console.log('   Message:', error.response?.data?.msg);
          console.log('');
        } else {
          console.log('⚠️  Unexpected error');
          console.log('   Status:', error.response?.status);
          console.log('   Message:', error.response?.data?.msg || error.message);
          console.log('');
        }
      }

    } catch (error) {
      console.log('❌ Login failed!');
      console.log('   Status:', error.response?.status);
      console.log('   Message:', error.response?.data?.msg || error.message);
      console.log('');
      
      if (error.response?.status === 400) {
        console.log('💡 Possible causes:');
        console.log('   • User doesn\'t exist (try registration first)');
        console.log('   • Wrong password');
        console.log('   • Email validation failed');
        console.log('');
      }
    }

    console.log('==================================================');
    console.log('✅ Authentication Tests Complete');
    console.log('==================================================\n');

  } catch (error) {
    console.log('\n❌ Test suite failed!');
    console.log('Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Backend server is running (npm start)');
    console.log('   2. MongoDB is connected');
    console.log('   3. Server is on http://localhost:5000\n');
  }
}

// Check if server is running
axios.get(`${BASE_URL}/auth/verify`)
  .catch(() => {
    console.log('\n⚠️  Starting tests (server check failed but continuing)...\n');
  })
  .finally(() => {
    testAuth();
  });
