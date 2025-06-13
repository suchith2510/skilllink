const express = require('express');
const router = express.Router();

console.log('Registering /tutorials route...');

// Static list of tutorials with course links
const tutorials = [
  {
    id: 1,
    title: 'Master JavaScript Fundamentals',
    description: 'Learn the core concepts of JavaScript, including variables, functions, and DOM manipulation.',
    category: 'Technical',
    courseLink: 'https://www.udemy.com/course/javascript-basics-for-beginners/',
    createdAt: new Date('2025-01-15'),
  },
  {
    id: 2,
    title: 'Behavioral Interview Mastery',
    description: 'Ace your behavioral interviews with proven strategies and example answers.',
    category: 'Behavioral',
    courseLink: 'https://www.coursera.org/learn/behavioral-interviewing',
    createdAt: new Date('2025-02-10'),
  },
  {
    id: 3,
    title: 'React for Beginners',
    description: 'Build dynamic web applications using React, a popular JavaScript library.',
    category: 'Technical',
    courseLink: 'https://www.pluralsight.com/courses/react-js-getting-started',
    createdAt: new Date('2025-03-20'),
  },
  {
    id: 4,
    title: 'Effective Communication Skills',
    description: 'Improve your communication skills for better teamwork and leadership.',
    category: 'General',
    courseLink: 'https://www.linkedin.com/learning/effective-communication',
    createdAt: new Date('2025-04-05'),
  },
];

// GET /tutorials - Fetch all tutorials
router.get('/', (req, res) => {
  console.log('Handling GET /tutorials');
  res.status(200).json({ tutorials });
});

module.exports = router;