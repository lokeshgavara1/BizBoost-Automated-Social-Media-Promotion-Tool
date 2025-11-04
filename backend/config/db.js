const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB Atlas connection - ensure MONGO_URI is set in config.env
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables. Please check config.env file.');
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Atlas connected successfully 🚀');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err && err.message ? err.message : err);
    console.error('\n⚠️  TROUBLESHOOTING STEPS:');
    console.error('1. Check if MONGO_URI is set in config.env file');
    console.error('2. Verify MongoDB Atlas credentials are correct');
    console.error('3. Ensure your IP address is whitelisted in MongoDB Atlas Network Access');
    console.error('4. Check the database user password is correct');
    console.error('5. Ensure connection string format: mongodb+srv://username:password@cluster.mongodb.net/database');
    console.error('\n💡 The app will continue running, but database features won\'t work.\n');
    // Do not crash the whole app; allow routes that don't need DB to work and allow hot fixes
  }
};

module.exports = connectDB;
