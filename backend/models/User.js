// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: false }, // Optional for Google OAuth users
  googleId: { type: String, unique: true, sparse: true },
  isGoogleUser: { type: Boolean, default: false },
  role: { type: String, enum: ['admin', 'member', 'viewer'], default: 'member' },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
