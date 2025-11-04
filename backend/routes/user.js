const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user });
  } catch (e) {
    console.error('Get profile error:', e);
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

// Update profile basic fields & preferences
router.patch('/me', auth, async (req, res) => {
  try {
    const { name, preferences } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (preferences) update.preferences = preferences;
    const user = await User.findByIdAndUpdate(req.user.userId, update, { new: true }).select('-password');
    res.json({ success: true, user });
  } catch (e) {
    console.error('Update profile error:', e);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;


