const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
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

// POST /api/messages - Send a message
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { receiverEmail, content } = req.body;

    if (!receiverEmail || !content) {
      return res.status(400).json({ error: 'Receiver email and message content are required' });
    }

    const message = new Message({
      senderEmail: req.user.email,
      receiverEmail,
      content,
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET /api/messages - Get messages for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderEmail: req.user.email },
        { receiverEmail: req.user.email },
      ],
    }).sort({ timestamp: -1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;