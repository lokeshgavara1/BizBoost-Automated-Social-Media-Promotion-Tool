const mongoose = require('mongoose');

const InstagramConnectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  instagramId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  tokenExpiry: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  connectedAt: {
    type: Date,
    default: Date.now
  },
  lastUsed: {
    type: Date,
    default: Date.now
  }
});

// Ensure one Instagram connection per user
InstagramConnectionSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('InstagramConnection', InstagramConnectionSchema);
