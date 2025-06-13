const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(403).json({ error: 'Invalid token' });
  }
};

// POST /api/skills - Create a new skill listing
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { offeredSkill, desiredSkill, description, skillLevel, preferredSchedule, availability } = req.body;

    if (!offeredSkill || !desiredSkill || !description || !skillLevel || !preferredSchedule) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const skill = new Skill({
      userEmail: req.user.email,
      offeredSkill,
      desiredSkill,
      description,
      skillLevel,
      preferredSchedule,
      availability: availability || 'Available'
    });

    await skill.save();
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(201).json({ message: 'Skill listing created', skills });
  } catch (error) {
    console.error('Error creating skill listing:', error);
    res.status(500).json({ error: 'Failed to create skill listing' });
  }
});

// GET /api/skills - Get all skill listings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json({ skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// DELETE /api/skills/:id - Delete a skill listing
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill listing not found' });
    }

    if (skill.userEmail !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Skill.findByIdAndDelete(req.params.id);
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Skill listing deleted', skills });
  } catch (error) {
    console.error('Error deleting skill listing:', error);
    res.status(500).json({ error: 'Failed to delete skill listing' });
  }
});

// POST /api/skills/connect - Connect with a skill provider
router.post('/connect', authenticateToken, async (req, res) => {
  try {
    const { skillId, message } = req.body;
    
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ error: 'Skill listing not found' });
    }

    if (skill.availability === 'Not Available') {
      return res.status(400).json({ error: 'This user is currently not available for skill exchange' });
    }

    // Here you would typically implement the connection logic
    // For now, we'll just return a success message
    res.status(200).json({ 
      message: 'Connection request sent successfully',
      providerEmail: skill.userEmail
    });
  } catch (error) {
    console.error('Error connecting with skill provider:', error);
    res.status(500).json({ error: 'Failed to connect with skill provider' });
  }
});

// PATCH /api/skills/:id/availability - Update skill listing availability
router.patch('/:id/availability', authenticateToken, async (req, res) => {
  try {
    const { availability } = req.body;
    if (!availability || !['Available', 'Not Available'].includes(availability)) {
      return res.status(400).json({ error: 'Invalid availability status' });
    }

    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill listing not found' });
    }

    if (skill.userEmail !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    skill.availability = availability;
    await skill.save();
    
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Availability updated', skills });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

module.exports = router;