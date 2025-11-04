const axios = require('axios');

// Initiate Facebook OAuth flow
const initiateFacebookAuth = async (req, res) => {
  try {
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&scope=pages_manage_posts,pages_read_engagement&response_type=code&state=facebook_oauth`;
    
    console.log('Redirecting to Facebook OAuth:', authUrl);
    res.redirect(authUrl);
  } catch (error) {
    console.error('Error generating Facebook auth URL:', error);
    res.status(500).json({ error: 'Failed to initiate Facebook authentication' });
  }
};

// Handle Facebook OAuth callback
const handleFacebookCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    
    if (!code) {
      console.error('No authorization code received');
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    console.log('Facebook OAuth callback - Exchanging code for access token...');

    // Exchange authorization code for access token
    const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
        code: code
      }
    });

    const { access_token } = tokenResponse.data;
    console.log('Facebook access token received');

    // Get user profile
    const userResponse = await axios.get('https://graph.facebook.com/v18.0/me', {
      params: {
        fields: 'id,name,email',
        access_token: access_token
      }
    });

    const userInfo = userResponse.data;
    console.log('User info:', userInfo);

    // For now, redirect to frontend with success message
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?facebook_connected=true&username=${userInfo.name || 'Facebook User'}&platform=Facebook`;
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Facebook OAuth callback error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Facebook authentication failed' });
  }
};

// Get Facebook connection status
const getFacebookStatus = async (req, res) => {
  try {
    // TODO: Check database for user's Facebook connection
    res.json({ 
      connected: false, 
      username: null 
    });
  } catch (error) {
    console.error('Error checking Facebook status:', error);
    res.status(500).json({ error: 'Failed to check Facebook connection status' });
  }
};

// Disconnect Facebook account
const disconnectFacebook = async (req, res) => {
  try {
    // TODO: Remove Facebook connection from database
    res.json({ success: true, message: 'Facebook account disconnected successfully' });
  } catch (error) {
    console.error('Error disconnecting Facebook:', error);
    res.status(500).json({ error: 'Failed to disconnect Facebook account' });
  }
};

module.exports = {
  initiateFacebookAuth,
  handleFacebookCallback,
  getFacebookStatus,
  disconnectFacebook
};
