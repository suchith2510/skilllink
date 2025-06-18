const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student',
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  premiumFeatures: {
    skillSwapEnabled: {
      type: Boolean,
      default: false,
    },
    subscriptionStartDate: {
      type: Date,
      default: null,
    },
    subscriptionEndDate: {
      type: Date,
      default: null,
    },
    subscriptionPlan: {
      type: String,
      enum: ['none', 'monthly', 'yearly'],
      default: 'none',
    }
  },
  // New fields for login tracking
  lastLoginAt: {
    type: Date,
    default: null,
  },
  loginCount: {
    type: Number,
    default: 0,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Only create the model if it hasn't been created yet
module.exports = mongoose.models.User || mongoose.model('User', userSchema);