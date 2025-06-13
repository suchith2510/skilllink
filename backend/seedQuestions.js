const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    const questions = [
      { skill: 'javascript', question: 'What is a closure in JavaScript?' },
      { skill: 'javascript', question: 'Explain the difference between var, let, and const.' },
      { skill: 'javascript', question: 'What is the event loop in JavaScript?' },
      { skill: 'python', question: 'How does Python handle memory management?' },
      { skill: 'python', question: 'What are Python decorators?' },
      { skill: 'python', question: 'Explain list comprehensions in Python.' },
      { skill: 'java', question: 'What is the difference between an interface and an abstract class?' },
      { skill: 'java', question: 'Explain Java garbage collection.' },
      { skill: 'cpp', question: 'What are pointers and references in C++?' },
      { skill: 'cpp', question: 'Explain virtual functions in C++.' },
      { skill: 'sql', question: 'What is the difference between INNER JOIN and LEFT JOIN?' },
      { skill: 'sql', question: 'How do you optimize a SQL query?' },
      { skill: 'react', question: 'What are React hooks?' },
      { skill: 'react', question: 'Explain the React component lifecycle.' },
      { skill: 'node.js', question: 'What is the event loop in Node.js?' },
      { skill: 'node.js', question: 'How do you handle asynchronous operations in Node.js?' },
      { skill: 'mongodb', question: 'What are the advantages of MongoDB over SQL databases?' },
      { skill: 'mongodb', question: 'How do you create an index in MongoDB?' },
      { skill: 'html', question: 'What is the difference between semantic and non-semantic HTML?' },
      { skill: 'css', question: 'Explain the CSS box model.' },
    ];

    await Question.deleteMany({});
    await Question.insertMany(questions);
    console.log('Questions seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    mongoose.connection.close();
  });