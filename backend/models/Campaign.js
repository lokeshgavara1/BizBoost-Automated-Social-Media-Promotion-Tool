const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'active', 'paused', 'completed'], default: 'draft', index: true },
  startDate: { type: Date },
  endDate: { type: Date },
  platforms: { type: [String], default: [] },
  postIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  metrics: {
    totalPosts: { type: Number, default: 0 },
    publishedPosts: { type: Number, default: 0 },
    totalEngagement: { type: Number, default: 0 },
    totalReach: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
