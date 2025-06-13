const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Question = require('./models/Question');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config({ path: 'E:\\skilllink\\backend\\.env' });

// Log JWT_SECRET to verify it's loaded
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Ensure JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in .env file');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Log MongoDB connection status
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Protected route: Analyze resume (requires authentication)
app.post('/api/analyze-resume', authenticateToken, upload.single('resume'), async (req, res) => {
  try {
    console.log('Received request to analyze resume');
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Processing PDF...');
    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer);
    console.log('PDF text extracted:', pdfData.text);

    const text = pdfData.text.toLowerCase();
    const skillsInDb = ['javascript', 'python', 'java', 'cpp', 'sql', 'react', 'node.js', 'mongodb', 'html', 'css'];
    const foundSkills = skillsInDb.filter(skill => {
      const regex = new RegExp(`\\b${skill}\\b`, 'i');
      return regex.test(text);
    });

    console.log('Found skills:', foundSkills);

    let questions = [];
    if (foundSkills.length > 0) {
      console.log('Fetching questions from database...');
      questions = await Question.find({ skill: { $in: foundSkills } });
      console.log('Questions fetched:', questions);
    }

    if (questions.length > 0) {
      res.json({ questions });
    } else {
      res.json({ message: 'No matching skills found in resume' });
    }
  } catch (error) {
    console.error('Error analyzing resume:', error.message, error.stack);
    res.status(500).json({ error: 'Error analyzing resume' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});