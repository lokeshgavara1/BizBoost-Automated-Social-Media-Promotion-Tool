const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Campaign = require('../models/Campaign');
const Post = require('../models/Post');

// Create campaign
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, startDate, endDate, platforms = [] } = req.body;
    const campaign = await Campaign.create({
      userId: req.user.userId,
      name,
      description,
      startDate,
      endDate,
      platforms
    });
    res.status(201).json({ success: true, campaign });
  } catch (e) {
    console.error('Create campaign error:', e);
    res.status(500).json({ success: false, error: 'Failed to create campaign' });
  }
});

// List campaigns
router.get('/', auth, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, campaigns });
  } catch (e) {
    console.error('List campaigns error:', e);
    res.status(500).json({ success: false, error: 'Failed to load campaigns' });
  }
});

// Get campaign details
router.get('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ _id: req.params.id, userId: req.user.userId })
      .populate('postIds')
      .lean();
    if (!campaign) return res.status(404).json({ success: false, error: 'Campaign not found' });
    res.json({ success: true, campaign });
  } catch (e) {
    console.error('Get campaign error:', e);
    res.status(500).json({ success: false, error: 'Failed to load campaign' });
  }
});

// Update campaign
router.patch('/:id', auth, async (req, res) => {
  try {
    const { name, description, status, startDate, endDate, platforms } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (status !== undefined) update.status = status;
    if (startDate !== undefined) update.startDate = startDate;
    if (endDate !== undefined) update.endDate = endDate;
    if (platforms !== undefined) update.platforms = platforms;
    
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      update,
      { new: true }
    );
    if (!campaign) return res.status(404).json({ success: false, error: 'Campaign not found' });
    res.json({ success: true, campaign });
  } catch (e) {
    console.error('Update campaign error:', e);
    res.status(500).json({ success: false, error: 'Failed to update campaign' });
  }
});

// Add posts to campaign
router.post('/:id/posts', auth, async (req, res) => {
  try {
    const { postIds = [] } = req.body;
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { $addToSet: { postIds: { $each: postIds } } },
      { new: true }
    );
    if (!campaign) return res.status(404).json({ success: false, error: 'Campaign not found' });
    res.json({ success: true, campaign });
  } catch (e) {
    console.error('Add posts to campaign error:', e);
    res.status(500).json({ success: false, error: 'Failed to add posts to campaign' });
  }
});

// Delete campaign
router.delete('/:id', auth, async (req, res) => {
  try {
    await Campaign.deleteOne({ _id: req.params.id, userId: req.user.userId });
    res.json({ success: true });
  } catch (e) {
    console.error('Delete campaign error:', e);
    res.status(500).json({ success: false, error: 'Failed to delete campaign' });
  }
});

module.exports = router;
