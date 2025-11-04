const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create post (draft/scheduled)
router.post('/', auth, async (req, res) => {
  try {
    const { description, caption, hashtags, mediaUrls = [], platforms = [], status = 'draft', scheduledAt } = req.body;
    const post = await Post.create({
      userId: req.user.userId,
      description,
      caption,
      hashtags,
      mediaUrls,
      platforms,
      status,
      scheduledAt: status === 'scheduled' ? scheduledAt : undefined
    });
    res.status(201).json({ success: true, post });
  } catch (e) {
    console.error('Create post error:', e);
    res.status(500).json({ success: false, error: 'Failed to create post' });
  }
});

// List upcoming scheduled posts
router.get('/upcoming', auth, async (req, res) => {
  try {
    const now = new Date();
    const posts = await Post.find({ userId: req.user.userId, status: 'scheduled', scheduledAt: { $gte: now } })
      .sort({ scheduledAt: 1 })
      .lean();
    res.json({ success: true, posts });
  } catch (e) {
    console.error('List upcoming error:', e);
    res.status(500).json({ success: false, error: 'Failed to list upcoming posts' });
  }
});

// Reschedule a post
router.patch('/:id/reschedule', auth, async (req, res) => {
  try {
    const { scheduledAt } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { scheduledAt, status: 'scheduled' },
      { new: true }
    );
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.json({ success: true, post });
  } catch (e) {
    console.error('Reschedule error:', e);
    res.status(500).json({ success: false, error: 'Failed to reschedule post' });
  }
});

module.exports = router;
// List/search posts
router.get('/', auth, async (req, res) => {
  try {
    const { q = '', status, platform } = req.query;
    const filter = { userId: req.user.userId };
    if (status) filter.status = status;
    if (platform) filter.platforms = platform;
    if (q) filter.$or = [
      { caption: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { hashtags: { $regex: q, $options: 'i' } }
    ];
    const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, posts });
  } catch (e) {
    console.error('List/search posts error:', e);
    res.status(500).json({ success: false, error: 'Failed to load posts' });
  }
});

// Delete one
router.delete('/:id', auth, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id, userId: req.user.userId });
    res.json({ success: true });
  } catch (e) {
    console.error('Delete post error:', e);
    res.status(500).json({ success: false, error: 'Failed to delete post' });
  }
});

// Bulk delete
router.post('/bulk-delete', auth, async (req, res) => {
  try {
    const { ids = [] } = req.body;
    await Post.deleteMany({ _id: { $in: ids }, userId: req.user.userId });
    res.json({ success: true });
  } catch (e) {
    console.error('Bulk delete error:', e);
    res.status(500).json({ success: false, error: 'Failed to bulk delete' });
  }
});
