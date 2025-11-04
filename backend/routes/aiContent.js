const express = require('express');
const router = express.Router();
const { 
  generateInstagramContent,
  generateContentVariations,
  generateHashtagSuggestions,
  generateImage
} = require('../controllers/aiContentController');
const auth = require('../middleware/auth');

// Generate Instagram caption and hashtags
router.post('/instagram/generate', auth, generateInstagramContent);

// Generate multiple content variations
router.post('/instagram/variations', auth, generateContentVariations);

// Generate hashtag suggestions only
router.post('/instagram/hashtags', auth, generateHashtagSuggestions);

// Generate AI image
router.post('/images/generate', auth, generateImage);

module.exports = router;
