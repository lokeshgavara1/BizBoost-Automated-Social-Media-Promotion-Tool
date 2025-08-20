const express = require('express');
const router = express.Router();
const {
  initiateFacebookAuth,
  handleFacebookCallback,
  getFacebookStatus,
  disconnectFacebook
} = require('../controllers/facebookAuthController');

// Initiate Facebook OAuth
router.get('/', initiateFacebookAuth);

// Handle Facebook OAuth callback
router.get('/callback', handleFacebookCallback);

// Get Facebook connection status
router.get('/status', getFacebookStatus);

// Disconnect Facebook account
router.delete('/disconnect', disconnectFacebook);

module.exports = router;
