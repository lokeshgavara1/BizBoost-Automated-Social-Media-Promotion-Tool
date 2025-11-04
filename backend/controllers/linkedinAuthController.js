const axios = require('axios');

// Initiate LinkedIn OAuth flow
const initiateLinkedInAuth = async (req, res) => {
  try {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress%20w_member_social&state=linkedin_oauth`;
    
    console.log('Redirecting to LinkedIn OAuth:', authUrl);
    res.redirect(authUrl);
  } catch (error) {
    console.error('Error generating LinkedIn auth URL:', error);
    res.status(500).json({ error: 'Failed to initiate LinkedIn authentication' });
  }
};

// Handle LinkedIn OAuth callback
const handleLinkedInCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    
    if (!code) {
      console.error('No authorization code received');
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    console.log('LinkedIn OAuth callback - Exchanging code for access token...');

    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token } = tokenResponse.data;
    console.log('LinkedIn access token received');

    // Get user profile
    const userResponse = await axios.get('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,emailAddress)', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    const userInfo = userResponse.data;
    const fullName = `${userInfo.firstName?.localized?.en_US || ''} ${userInfo.lastName?.localized?.en_US || ''}`.trim();
    console.log('User info:', { id: userInfo.id, name: fullName });

    // For now, redirect to frontend with success message
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?linkedin_connected=true&username=${fullName || 'LinkedIn User'}&platform=LinkedIn`;
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error('LinkedIn OAuth callback error:', error.response?.data || error.message);
    res.status(500).json({ error: 'LinkedIn authentication failed' });
  }
};

// Get LinkedIn connection status
const getLinkedInStatus = async (req, res) => {
  try {
    // TODO: Check database for user's LinkedIn connection
    res.json({ 
      connected: false, 
      username: null 
    });
  } catch (error) {
    console.error('Error checking LinkedIn status:', error);
    res.status(500).json({ error: 'Failed to check LinkedIn connection status' });
  }
};

// Disconnect LinkedIn account
const disconnectLinkedIn = async (req, res) => {
  try {
    // TODO: Remove LinkedIn connection from database
    res.json({ success: true, message: 'LinkedIn account disconnected successfully' });
  } catch (error) {
    console.error('Error disconnecting LinkedIn:', error);
    res.status(500).json({ error: 'Failed to disconnect LinkedIn account' });
  }
};

module.exports = {
  initiateLinkedInAuth,
  handleLinkedInCallback,
  getLinkedInStatus,
  disconnectLinkedIn
};
