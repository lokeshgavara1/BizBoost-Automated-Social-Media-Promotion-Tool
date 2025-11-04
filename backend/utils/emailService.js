// utils/emailService.js
const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // Check if email credentials are configured
  const emailUser = process.env.EMAIL_USER || 'bizboost@yopmail.com';
  const emailPassword = process.env.EMAIL_PASSWORD;

  // If using YopMail or no password configured, use test mode
  if (!emailPassword || emailUser.includes('yopmail.com')) {
    console.log('⚠️  No email password configured or using YopMail.');
    console.log('💡 Using test mode - emails will be logged to console only.');
    console.log('📧 To send real emails, configure EMAIL_USER and EMAIL_PASSWORD in .env file.');
    console.log('📖 See EMAIL_SETUP_GUIDE.md for instructions.\n');
    
    // Return null to indicate test mode
    return null;
  }

  // Create real transporter with provided credentials
  return nodemailer.createTransport({
    service: 'gmail', // or use your preferred email service
    auth: {
      user: emailUser,
      pass: emailPassword
    }
  });
};

// Send welcome email to new users
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'BizBoost Team',
        address: process.env.EMAIL_USER || 'bizboost@yopmail.com'
      },
      to: userEmail,
      subject: 'Welcome to BizBoost! 🚀',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #ffffff;
              padding: 40px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: bold;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #667eea;
              font-size: 24px;
              margin-top: 0;
            }
            .content p {
              font-size: 16px;
              margin: 15px 0;
            }
            .features {
              background-color: #f9f9f9;
              border-left: 4px solid #667eea;
              padding: 20px;
              margin: 25px 0;
            }
            .features ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            .features li {
              margin: 10px 0;
              font-size: 15px;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #ffffff;
              padding: 15px 40px;
              text-decoration: none;
              border-radius: 50px;
              font-weight: bold;
              margin: 20px 0;
              transition: transform 0.3s;
            }
            .cta-button:hover {
              transform: scale(1.05);
            }
            .footer {
              background-color: #f4f4f4;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #777;
            }
            .footer a {
              color: #667eea;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>🎉 Welcome to BizBoost!</h1>
            </div>
            
            <div class="content">
              <h2>Hi ${userName}! 👋</h2>
              
              <p>We're thrilled to have you join the BizBoost family! You've just taken the first step towards revolutionizing your social media marketing with AI-powered automation.</p>
              
              <p>BizBoost is your all-in-one solution for managing and automating your social media presence across multiple platforms. Here's what you can do:</p>
              
              <div class="features">
                <ul>
                  <li>🤖 <strong>AI-Powered Content Generation</strong> - Create engaging captions, hashtags, and images instantly</li>
                  <li>📱 <strong>Multi-Platform Integration</strong> - Connect Facebook, Instagram, LinkedIn, and Google</li>
                  <li>📊 <strong>Analytics Dashboard</strong> - Track your performance with detailed insights</li>
                  <li>📅 <strong>Campaign Scheduling</strong> - Plan and schedule your posts in advance</li>
                  <li>💼 <strong>Business Profile Management</strong> - Manage multiple business profiles seamlessly</li>
                </ul>
              </div>
              
              <p>Ready to get started? Log in to your dashboard and explore all the amazing features we've built for you!</p>
              
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" class="cta-button">
                  Get Started Now
                </a>
              </div>
              
              <p style="margin-top: 30px;">If you have any questions or need assistance, our support team is here to help. Just reply to this email!</p>
              
              <p>Happy posting! 🚀</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The BizBoost Team</strong>
              </p>
            </div>
            
            <div class="footer">
              <p>You received this email because you registered for a BizBoost account.</p>
              <p>
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}">Visit our website</a> | 
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/settings">Manage preferences</a>
              </p>
              <p>&copy; ${new Date().getFullYear()} BizBoost. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to BizBoost, ${userName}!
        
        We're thrilled to have you join the BizBoost family! You've just taken the first step towards revolutionizing your social media marketing with AI-powered automation.
        
        What you can do with BizBoost:
        - AI-Powered Content Generation: Create engaging captions, hashtags, and images instantly
        - Multi-Platform Integration: Connect Facebook, Instagram, LinkedIn, and Google
        - Analytics Dashboard: Track your performance with detailed insights
        - Campaign Scheduling: Plan and schedule your posts in advance
        - Business Profile Management: Manage multiple business profiles seamlessly
        
        Ready to get started? Log in to your dashboard and explore all the amazing features we've built for you!
        
        If you have any questions or need assistance, our support team is here to help. Just reply to this email!
        
        Happy posting!
        
        Best regards,
        The BizBoost Team
      `
    };

    // If no real transporter (test mode), just log the email
    if (!transporter) {
      console.log('\n📧 [TEST MODE] Welcome email would be sent to:', userEmail);
      console.log('Subject:', mailOptions.subject);
      console.log('From:', mailOptions.from.name, '<' + mailOptions.from.address + '>');
      console.log('✅ Email logged successfully (test mode)\n');
      return { success: true, messageId: 'test-mode-' + Date.now(), testMode: true };
    }

    // Send real email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    // Don't throw error - we don't want registration to fail if email fails
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail
};
