// models/BusinessProfile.js
const mongoose = require('mongoose');

const BusinessProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    }
  },
  logo: {
    type: String, // This will store the file path or URL
    required: false
  },
  website: {
    type: String,
    trim: true
  },
  socialLinks: {
    facebook: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    }
  },
  industry: {
    type: String,
    trim: true
  },
  foundedYear: {
    type: Number
  },
  employeeCount: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '500+']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BusinessProfile', BusinessProfileSchema);
