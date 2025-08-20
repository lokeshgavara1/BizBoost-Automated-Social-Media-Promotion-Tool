const express = require('express');
const router = express.Router();
const {
  initiateLinkedInAuth,
  handleLinkedInCallback,
  getLinkedInStatus,
  disconnectLinkedIn
} = require('../controllers/linkedinAuthController');

// Initiate LinkedIn OAuth
router.get('/', initiateLinkedInAuth);

// Handle LinkedIn OAuth callback
router.get('/callback', handleLinkedInCallback);

// Get LinkedIn connection status
router.get('/status', getLinkedInStatus);

// Disconnect LinkedIn account
router.delete('/disconnect', disconnectLinkedIn);

module.exports = router;
