const express = require('express');
const router = express.Router();
const { 
  initiateGoogleAuth, 
  handleGoogleCallback, 
  verifyToken,
  getUserProfile 
} = require('../controllers/googleAuthController');
const auth = require('../middleware/auth');

// Initiate Google OAuth flow
router.get('/google', initiateGoogleAuth);

// Handle Google OAuth callback
router.get('/google/callback', handleGoogleCallback);

// Verify JWT token
router.get('/verify', verifyToken);

// Get user profile (protected route)
router.get('/profile', auth, getUserProfile);

module.exports = router;
