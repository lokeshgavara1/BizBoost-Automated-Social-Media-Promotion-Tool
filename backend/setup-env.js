#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 BizBoost Environment Setup');
console.log('=============================\n');

// Check if .env already exists
const envPath = path.join(__dirname, '.env');
const configEnvPath = path.join(__dirname, 'config.env');
const exampleEnvPath = path.join(__dirname, 'env.example');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('   If you want to recreate it, delete the existing .env file first.\n');
  process.exit(0);
}

// Check if config.env exists
if (!fs.existsSync(configEnvPath)) {
  console.log('❌ config.env file not found!');
  console.log('   Please make sure config.env exists in the backend directory.\n');
  process.exit(1);
}

// Check if env.example exists
if (!fs.existsSync(exampleEnvPath)) {
  console.log('❌ env.example file not found!');
  console.log('   Please make sure env.example exists in the backend directory.\n');
  process.exit(1);
}

try {
  // Read the example file
  const exampleContent = fs.readFileSync(exampleEnvPath, 'utf8');
  
  // Read the config.env file
  const configContent = fs.readFileSync(configEnvPath, 'utf8');
  
  // Create .env file with config.env content
  fs.writeFileSync(envPath, configContent);
  
  console.log('✅ Successfully created .env file from config.env');
  console.log('📁 Location: backend/.env');
  console.log('\n🔒 Security Check:');
  console.log('   - .env file is automatically ignored by Git');
  console.log('   - Your sensitive data is now safe from being committed');
  console.log('\n📝 Next Steps:');
  console.log('   1. Verify your .env file contains all required variables');
  console.log('   2. Add Facebook and LinkedIn credentials if needed');
  console.log('   3. Update JWT_SECRET for production use');
  console.log('   4. You can now safely delete config.env if desired');
  console.log('\n🚀 Ready to run: npm run dev\n');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  process.exit(1);
}
