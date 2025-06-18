const mongoose = require('mongoose');

const loginSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  loginAt: {
    type: Date,
    default: Date.now,
  },
  logoutAt: {
    type: Date,
    default: null,
  },
  ipAddress: {
    type: String,
    default: null,
  },
  userAgent: {
    type: String,
    default: null,
  },
  sessionDuration: {
    type: Number, // in minutes
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  deviceInfo: {
    browser: String,
    os: String,
    device: String,
  },
});

// Index for better query performance
loginSessionSchema.index({ userId: 1, loginAt: -1 });
loginSessionSchema.index({ isActive: 1 });

module.exports = mongoose.models.LoginSession || mongoose.model('LoginSession', loginSessionSchema); 