const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Google OAuth2 client
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Store tokens in memory (in production, use Redis or database)
const tokenStore = new Map();

// Initiate Google OAuth flow
const initiateGoogleAuth = (req, res) => {
  try {
    const authUrl = googleClient.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email'
      ],
      prompt: 'consent'
    });
    
    // Redirect directly to Google's consent screen to avoid CORS/XHR issues
    res.redirect(authUrl);
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate authentication URL' });
  }
};

// Handle Google OAuth callback
const handleGoogleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      console.error('No authorization code received');
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    console.log('Received authorization code, exchanging for tokens...');

    // Exchange authorization code for tokens
    const { tokens } = await googleClient.getToken(code);
    console.log('Tokens received successfully');

    // Set credentials on the OAuth2 client
    googleClient.setCredentials(tokens);

    console.log('Fetching user info from Google...');

    // Get minimal user info from Google using the correct method
    const userInfoResponse = await googleClient.request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo'
    });

    const userInfo = userInfoResponse.data;
    console.log('User info received:', { email: userInfo.email, id: userInfo.id });

    // Check if user exists, if not create new user with minimal data
    let user = await User.findOne({ email: userInfo.email });
    
    if (!user) {
      console.log('Creating new user...');
      user = new User({
        email: userInfo.email,
        googleId: userInfo.id,
        isGoogleUser: true
      });
      await user.save();
      console.log('New user created:', user._id);
    } else {
      console.log('Updating existing user...');
      // Update existing user's Google ID only
      user.googleId = userInfo.id;
      user.isGoogleUser = true;
      await user.save();
      console.log('Existing user updated:', user._id);
    }

    // Store tokens securely (in production, encrypt and store in database)
    tokenStore.set(user._id.toString(), {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiry: tokens.expiry_date
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('JWT token generated, redirecting to frontend...');

    // Redirect to frontend with minimal user data
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: user._id,
      email: user.email
    }))}`;
    
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Google OAuth callback error details:', {
      message: error.message,
      stack: error.stack,
      code: req.query.code ? 'present' : 'missing'
    });
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Verify JWT token and return minimal user info
const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({ 
      user: {
        id: user._id,
        email: user.email,
        isGoogleUser: user.isGoogleUser
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get minimal user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -profilePicture -name');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: user._id,
      email: user.email,
      isGoogleUser: user.isGoogleUser
    });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

module.exports = {
  initiateGoogleAuth,
  handleGoogleCallback,
  verifyToken,
  getUserProfile
};
