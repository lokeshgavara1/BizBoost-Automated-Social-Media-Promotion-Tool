// routes/businessProfile.js
const express = require('express');
const router = express.Router();
const businessProfileController = require('../controllers/businessProfileController');
const auth = require('../middleware/auth');
const validateBusinessProfile = require('../middleware/businessProfileValidation');
const upload = require('../middleware/upload');

// Create business profile (with image upload)
router.post(
  '/',
  auth,
  upload.single('logo'),
  validateBusinessProfile,
  businessProfileController.createProfile
);

// Get business profile
router.get('/', auth, businessProfileController.getProfile);

// Update business profile (with image upload)
router.put(
  '/',
  auth,
  upload.single('logo'),
  validateBusinessProfile,
  businessProfileController.updateProfile
);

// Delete business profile
router.delete('/', auth, businessProfileController.deleteProfile);

module.exports = router;
