// Check all users in the database
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config({ path: './config.env' });

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('\n✅ Connected to MongoDB\n');

    const users = await User.find({}).select('-password');
    
    console.log('==================================================');
    console.log(`   👥 Users in Database: ${users.length}`);
    console.log('==================================================\n');

    if (users.length === 0) {
      console.log('📭 No users found in database.');
      console.log('\n💡 This is normal for a fresh installation.');
      console.log('   Register a new user from the frontend to get started.\n');
    } else {
      users.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`   ID: ${user._id}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Google User: ${user.isGoogleUser || false}`);
        console.log(`   Created: ${user.createdAt}`);
        console.log('');
      });
    }

    console.log('==================================================\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
