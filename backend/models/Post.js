const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  description: { type: String, default: '' },
  caption: { type: String, default: '' },
  hashtags: { type: String, default: '' },
  mediaUrls: { type: [String], default: [] },
  platforms: { type: [String], default: [] }, // e.g., ['Instagram','Facebook']
  status: { type: String, enum: ['draft', 'scheduled', 'published'], default: 'draft', index: true },
  scheduledAt: { type: Date },
  publishedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
