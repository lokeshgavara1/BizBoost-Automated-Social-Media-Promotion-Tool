const axios = require('axios');
const InstagramConnection = require('../models/InstagramConnection');

// Initiate Facebook OAuth flow (which can access Instagram data)
const initiateInstagramAuth = (req, res) => {
  try {
    // Use Facebook Login with Instagram permissions
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=instagram_basic,instagram_content_publish,pages_show_list&response_type=code&state=instagram_oauth`;
    
    console.log('Redirecting to Facebook OAuth for Instagram access:', authUrl);
    res.redirect(authUrl);
  } catch (error) {
    console.error('Error generating Instagram auth URL:', error);
    res.status(500).json({ error: 'Failed to generate Instagram authentication URL' });
  }
};

// Handle Facebook OAuth callback for Instagram access
const handleInstagramCallback = async (req, res) => {
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
        client_id: process.env.INSTAGRAM_APP_ID,
        client_secret: process.env.INSTAGRAM_APP_SECRET,
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
        code: code
      }
    });

    const { access_token } = tokenResponse.data;
    console.log('Facebook access token received');

    // Get user's Facebook pages (which may include Instagram Business accounts)
    const pagesResponse = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
      params: {
        access_token: access_token
      }
    });

    console.log('Facebook pages:', pagesResponse.data);

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
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?instagram_connected=true&username=${userInfo.name || 'Social Media User'}`;
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Facebook OAuth callback error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Social media authentication failed' });
  }
};

// Get Instagram user details
const getInstagramUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const connection = await InstagramConnection.findOne({ userId, isActive: true });
    
    if (!connection) {
      return res.status(404).json({ error: 'Instagram account not connected' });
    }

    // Update last used timestamp
    connection.lastUsed = new Date();
    await connection.save();

    res.json({
      instagramId: connection.instagramId,
      username: connection.username,
      connectedAt: connection.connectedAt,
      lastUsed: connection.lastUsed
    });
  } catch (error) {
    console.error('Error getting Instagram user:', error);
    res.status(500).json({ error: 'Failed to get Instagram user details' });
  }
};

// Disconnect Instagram account
const disconnectInstagram = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const connection = await InstagramConnection.findOne({ userId });
    
    if (!connection) {
      return res.status(404).json({ error: 'Instagram account not connected' });
    }

    // Mark as inactive instead of deleting
    connection.isActive = false;
    await connection.save();

    res.json({ message: 'Instagram account disconnected successfully' });
  } catch (error) {
    console.error('Error disconnecting Instagram:', error);
    res.status(500).json({ error: 'Failed to disconnect Instagram account' });
  }
};

// Check if user has Instagram connected
const checkInstagramConnection = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const connection = await InstagramConnection.findOne({ userId, isActive: true });
    
    res.json({
      connected: !!connection,
      username: connection?.username || null
    });
  } catch (error) {
    console.error('Error checking Instagram connection:', error);
    res.status(500).json({ error: 'Failed to check Instagram connection' });
  }
};

module.exports = {
  initiateInstagramAuth,
  handleInstagramCallback,
  getInstagramUser,
  disconnectInstagram,
  checkInstagramConnection
};
