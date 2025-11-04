// MongoDB Connection Test Script
// Run this to test your MongoDB connection without starting the full server

const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const testConnection = async () => {
  console.log('\n==================================================');
  console.log('   🧪 MongoDB Connection Test');
  console.log('==================================================\n');

  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/bizboost';
  
  // Hide password in output for security
  const safeUri = mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
  console.log('📍 Testing connection to:');
  console.log(`   ${safeUri}\n`);

  console.log('⏳ Connecting...\n');

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });

    console.log('✅ SUCCESS! MongoDB connected successfully 🚀\n');
    console.log('Connection Details:');
    console.log(`   📊 Database Name: ${mongoose.connection.name}`);
    console.log(`   🌐 Host: ${mongoose.connection.host}`);
    console.log(`   🔌 Port: ${mongoose.connection.port || 'N/A (Atlas)'}`);
    console.log(`   ⚡ Ready State: ${mongoose.connection.readyState} (1 = connected)`);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`\n   📁 Collections (${collections.length}):`);
    if (collections.length > 0) {
      collections.forEach(col => {
        console.log(`      • ${col.name}`);
      });
    } else {
      console.log('      (no collections yet - this is normal for a new database)');
    }

    console.log('\n==================================================');
    console.log('✅ Your MongoDB is working perfectly!');
    console.log('==================================================\n');

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.log('❌ CONNECTION FAILED!\n');
    console.log('Error Details:');
    console.log(`   Type: ${error.name}`);
    console.log(`   Message: ${error.message}\n`);

    console.log('==================================================');
    console.log('⚠️  TROUBLESHOOTING STEPS');
    console.log('==================================================\n');

    if (error.message.includes('bad auth') || error.message.includes('authentication failed')) {
      console.log('🔐 Authentication Error:');
      console.log('   1. Check if your username and password are correct');
      console.log('   2. Make sure there are no special characters in password');
      console.log('   3. If password has special chars, URL-encode them:');
      console.log('      @ → %40, # → %23, % → %25, / → %2F');
      console.log('   4. Reset password in MongoDB Atlas → Database Access');
      console.log('   5. Make sure user has correct permissions\n');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('🌐 Network/DNS Error:');
      console.log('   1. Check your internet connection');
      console.log('   2. Verify the cluster URL is correct');
      console.log('   3. Try using 8.8.8.8 as DNS (Google DNS)');
      console.log('   4. Check if a firewall is blocking the connection\n');
    } else if (error.message.includes('IP') || error.message.includes('not authorized')) {
      console.log('🚫 IP Whitelist Error:');
      console.log('   1. Go to MongoDB Atlas → Network Access');
      console.log('   2. Add your IP address');
      console.log('   3. Or use 0.0.0.0/0 to allow all IPs (development only)\n');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('🔌 Connection Refused (Local MongoDB):');
      console.log('   1. Make sure MongoDB is installed');
      console.log('   2. Start MongoDB service: net start MongoDB');
      console.log('   3. Or run: mongod --dbpath C:\\data\\db\n');
    } else {
      console.log('📋 General Troubleshooting:');
      console.log('   1. Check MONGO_URI in config.env file');
      console.log('   2. Verify no typos in connection string');
      console.log('   3. Try using local MongoDB for testing');
      console.log('   4. Check MongoDB Atlas status page\n');
    }

    console.log('==================================================');
    console.log('📖 For detailed help, see: MONGODB_FIX_GUIDE.md');
    console.log('==================================================\n');

    process.exit(1);
  }
};

// Run the test
testConnection();
