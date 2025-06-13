const mongoose = require('mongoose');
const SkillSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  offeredSkill: {
    type: String,
    required: true,
  },
  desiredSkill: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    enum: ['Available', 'Not Available'],
    default: 'Available',
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional', 'Native'],
    required: true,
  },
  preferredSchedule: {
    type: String,
    enum: ['Weekdays', 'Weekends', 'Evenings', 'Flexible'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Skill', SkillSchema);