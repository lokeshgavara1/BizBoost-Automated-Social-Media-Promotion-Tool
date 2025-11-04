// test-email.js
// Quick test script to verify email functionality
require('dotenv').config();
const { sendWelcomeEmail } = require('./utils/emailService');

console.log('🧪 Testing BizBoost Welcome Email Service...\n');

// Check environment variables
console.log('📋 Environment Configuration:');
console.log(`   EMAIL_USER: ${process.env.EMAIL_USER || '❌ NOT SET'}`);
console.log(`   EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? '✅ SET' : '❌ NOT SET'}`);
console.log(`   FRONTEND_URL: ${process.env.FRONTEND_URL || 'http://localhost:3000 (default)'}\n`);

// Get test email from command line or use default
const testEmail = process.argv[2] || 'test@example.com';
const testName = process.argv[3] || 'Test User';

console.log(`📧 Sending test email to: ${testEmail}`);
console.log(`👤 User name: ${testName}\n`);

// Send test email
sendWelcomeEmail(testEmail, testName)
  .then(result => {
    if (result.success) {
      console.log('✅ SUCCESS! Welcome email sent successfully');
      console.log(`   Message ID: ${result.messageId}`);
      console.log(`\n💡 Check the inbox of ${testEmail} for the welcome email!`);
    } else {
      console.log('❌ FAILED! Email was not sent');
      console.log(`   Error: ${result.error}`);
      console.log('\n💡 Troubleshooting tips:');
      console.log('   1. Make sure EMAIL_USER and EMAIL_PASSWORD are set in .env file');
      console.log('   2. If using Gmail, enable App Passwords');
      console.log('   3. Check if your email service allows SMTP access');
      console.log('   4. Review EMAIL_SETUP_GUIDE.md for detailed instructions');
    }
  })
  .catch(error => {
    console.log('❌ ERROR occurred while sending email:');
    console.error(error);
    console.log('\n💡 Make sure you have:');
    console.log('   1. Created a .env file in the backend directory');
    console.log('   2. Set EMAIL_USER and EMAIL_PASSWORD correctly');
    console.log('   3. Installed all dependencies: npm install');
  })
  .finally(() => {
    console.log('\n🏁 Test completed.\n');
  });
