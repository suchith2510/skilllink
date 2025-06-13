const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const SentimentAnalyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new SentimentAnalyzer('English', stemmer, 'afinn');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  }
});

// Common industry keywords for different categories
const keywordCategories = {
  technical: [
    'javascript', 'python', 'java', 'c++', 'react', 'node.js', 'sql', 'aws',
    'docker', 'kubernetes', 'git', 'agile', 'scrum', 'ci/cd', 'rest api',
    'microservices', 'machine learning', 'artificial intelligence', 'data analysis'
  ],
  softSkills: [
    'leadership', 'communication', 'teamwork', 'problem solving', 'time management',
    'adaptability', 'creativity', 'critical thinking', 'collaboration', 'project management'
  ],
  education: [
    'bachelor', 'master', 'phd', 'degree', 'certification', 'diploma', 'gpa',
    'university', 'college', 'coursework', 'thesis', 'research'
  ],
  experience: [
    'experience', 'years', 'senior', 'junior', 'lead', 'manager', 'director',
    'coordinator', 'specialist', 'analyst', 'engineer', 'developer', 'designer'
  ]
};

// Function to extract text from PDF
async function extractTextFromPDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

// Function to extract text from DOCX
async function extractTextFromDOCX(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer: dataBuffer });
  return result.value;
}

// Function to calculate keyword score
function calculateKeywordScore(text, keywords) {
  const words = tokenizer.tokenize(text.toLowerCase());
  const wordCount = words.length;
  const matchedKeywords = keywords.filter(keyword => 
    words.includes(keyword.toLowerCase())
  );
  return (matchedKeywords.length / keywords.length) * 100;
}

// Function to analyze resume structure
function analyzeStructure(text) {
  const sections = {
    hasContact: /(email|phone|address|contact)/i.test(text),
    hasEducation: /(education|university|college|degree|gpa)/i.test(text),
    hasExperience: /(experience|work|employment|job)/i.test(text),
    hasSkills: /(skills|expertise|proficient|competent)/i.test(text),
    hasSummary: /(summary|profile|objective)/i.test(text)
  };
  
  const score = Object.values(sections).filter(Boolean).length / Object.keys(sections).length * 100;
  return { score, sections };
}

// Function to check formatting
function analyzeFormatting(text) {
  const formatting = {
    hasBulletPoints: /[•\-\*]\s/g.test(text),
    hasDates: /\d{4}\s*[-–]\s*(present|\d{4})/i.test(text),
    hasHeadings: /^[A-Z][A-Z\s]+$/m.test(text),
    hasConsistentSpacing: !/\n{3,}/.test(text)
  };
  
  const score = Object.values(formatting).filter(Boolean).length / Object.keys(formatting).length * 100;
  return { score, formatting };
}

// Function to generate recommendations
function generateRecommendations(scores, structure, formatting) {
  const recommendations = [];

  // Keyword recommendations
  if (scores.keywordScore < 70) {
    recommendations.push('Add more industry-specific keywords to improve ATS matching');
  }
  if (scores.technicalScore < 60) {
    recommendations.push('Include more technical skills relevant to your target role');
  }
  if (scores.softSkillsScore < 60) {
    recommendations.push('Highlight your soft skills and interpersonal abilities');
  }

  // Structure recommendations
  if (!structure.sections.hasSummary) {
    recommendations.push('Add a professional summary or objective statement');
  }
  if (!structure.sections.hasSkills) {
    recommendations.push('Include a dedicated skills section');
  }
  if (!structure.sections.hasContact) {
    recommendations.push('Add your contact information');
  }

  // Formatting recommendations
  if (!formatting.formatting.hasBulletPoints) {
    recommendations.push('Use bullet points for better readability');
  }
  if (!formatting.formatting.hasDates) {
    recommendations.push('Include dates for your work experience and education');
  }
  if (!formatting.formatting.hasHeadings) {
    recommendations.push('Use clear section headings');
  }
  if (!formatting.formatting.hasConsistentSpacing) {
    recommendations.push('Maintain consistent spacing throughout the document');
  }

  return recommendations;
}

// Resume analysis endpoint
router.post('/analyze-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract text based on file type
    let text;
    if (req.file.mimetype === 'application/pdf') {
      text = await extractTextFromPDF(req.file.path);
    } else {
      text = await extractTextFromDOCX(req.file.path);
    }

    // Calculate scores
    const keywordScore = calculateKeywordScore(text, [...keywordCategories.technical, ...keywordCategories.softSkills]);
    const technicalScore = calculateKeywordScore(text, keywordCategories.technical);
    const softSkillsScore = calculateKeywordScore(text, keywordCategories.softSkills);
    const structure = analyzeStructure(text);
    const formatting = analyzeFormatting(text);

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      (keywordScore * 0.3) +
      (technicalScore * 0.25) +
      (softSkillsScore * 0.15) +
      (structure.score * 0.15) +
      (formatting.score * 0.15)
    );

    // Generate recommendations
    const recommendations = generateRecommendations(
      { keywordScore, technicalScore, softSkillsScore },
      structure,
      formatting
    );

    // Clean up uploaded file
    await fs.unlink(req.file.path);

    // Send response
    res.json({
      overallScore,
      scores: {
        'Keyword Optimization': Math.round(keywordScore),
        'Technical Skills': Math.round(technicalScore),
        'Soft Skills': Math.round(softSkillsScore),
        'Content Structure': Math.round(structure.score),
        'Format Compatibility': Math.round(formatting.score)
      },
      recommendations
    });

  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

// Mock interview questions
const mockQuestions = [
  {
    id: 1,
    question: 'Tell me about yourself.',
    category: 'Behavioral',
  },
  {
    id: 2,
    question: 'What is the difference between let, const, and var in JavaScript?',
    category: 'Technical',
  },
  {
    id: 3,
    question: 'How do you handle conflict in a team?',
    category: 'Behavioral',
  },
];

// GET /api/interview/questions - Fetch all interview questions
router.get('/questions', (req, res) => {
  try {
    res.status(200).json({ questions: mockQuestions });
  } catch (error) {
    console.error('Error fetching interview questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// POST /api/interview/predict - Predict if an answer is good (NLP-based)
router.post('/predict', (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({ error: 'Answer is required' });
    }

    // NLP Analysis
    const answerLower = answer.toLowerCase();

    // 1. Sentiment Analysis
    const sentimentScore = analyzer.getSentiment(answerLower.split(/\s+/));
    const sentiment = sentimentScore > 0 ? 'positive' : sentimentScore < 0 ? 'negative' : 'neutral';

    // 2. Keyword Detection
    const goodKeywords = ['experience', 'skills', 'team', 'project', 'communication', 'javascript', 'scope', 'resolve', 'collaboration'];
    const badKeywords = ['bad', 'poor', 'hate', 'conflict', 'fail'];

    let keywordScore = 0;
    goodKeywords.forEach(keyword => {
      if (answerLower.includes(keyword)) keywordScore += 1;
    });
    badKeywords.forEach(keyword => {
      if (answerLower.includes(keyword)) keywordScore -= 1;
    });

    // 3. Answer Length (normalized between 0 and 1)
    const answerLength = answer.length;
    const lengthScore = Math.min(answerLength / 200, 1); // Max score at 200 characters

    // Combined Score (weights: sentiment 40%, keywords 40%, length 20%)
    const finalScore = (sentimentScore * 0.4) + (keywordScore * 0.4) + (lengthScore * 0.2);
    const isGoodAnswer = finalScore > 0.5;

    // Feedback based on analysis
    let feedback = isGoodAnswer ? 'Good answer! ' : 'Answer could be improved. ';
    if (sentiment === 'positive') {
      feedback += 'Your answer has a positive tone, which is great. ';
    } else if (sentiment === 'negative') {
      feedback += 'Try to use more positive language. ';
    }
    if (keywordScore > 0) {
      feedback += 'You included relevant keywords, which strengthens your answer. ';
    } else if (keywordScore < 0) {
      feedback += 'Avoid negative terms and include more relevant keywords. ';
    }
    if (lengthScore < 0.5) {
      feedback += 'Consider adding more details to your answer.';
    }

    res.status(200).json({
      prediction: isGoodAnswer ? 'Good' : 'Needs Improvement',
      sentiment,
      keywordScore,
      lengthScore,
      finalScore,
      feedback,
    });
  } catch (error) {
    console.error('Error predicting answer:', error);
    res.status(500).json({ error: 'Failed to predict answer' });
  }
});

module.exports = router;