const express = require('express');
const router = express.Router();
const { 
  initiateInstagramAuth, 
  handleInstagramCallback, 
  getInstagramUser,
  disconnectInstagram,
  checkInstagramConnection
} = require('../controllers/instagramAuthController');
const auth = require('../middleware/auth');

// Initiate Instagram OAuth flow (no auth required - user will be authenticated via OAuth)
router.get('/instagram', initiateInstagramAuth);

// Handle Instagram OAuth callback (no auth required - handles the OAuth flow)
router.get('/instagram/callback', handleInstagramCallback);

// Get Instagram user details (protected route)
router.get('/instagram/me', auth, getInstagramUser);

// Check Instagram connection status (protected route)
router.get('/instagram/status', auth, checkInstagramConnection);

// Disconnect Instagram account (protected route)
router.delete('/instagram/disconnect', auth, disconnectInstagram);

module.exports = router;
