const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const totalPosts = await Post.countDocuments({ userId });
    const scheduled = await Post.countDocuments({ userId, status: 'scheduled' });
    const published = await Post.countDocuments({ userId, status: 'published' });

    const topPosts = await Post.find({ userId, status: 'published' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('caption platforms createdAt')
      .lean();

    // Mock metrics until real integrations
    const metrics = {
      engagement: 1247,
      reach: 45200,
      clicks: 980,
      shares: 312
    };

    res.json({ success: true, summary: { totalPosts, scheduled, published }, metrics, topPosts });
  } catch (e) {
    console.error('Analytics error:', e);
    res.status(500).json({ success: false, error: 'Failed to load analytics' });
  }
});

module.exports = router;
