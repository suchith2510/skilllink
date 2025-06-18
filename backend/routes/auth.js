const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoginSession = require('../models/LoginSession');

// Protected route middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Admin middleware
const adminAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Login endpoint with session tracking
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update user login tracking
    user.lastLoginAt = new Date();
    user.loginCount += 1;
    user.isOnline = true;
    await user.save();

    // Create login session
    const loginSession = new LoginSession({
      userId: user._id,
      userEmail: user.email,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      deviceInfo: {
        browser: req.get('User-Agent')?.includes('Chrome') ? 'Chrome' : 
                req.get('User-Agent')?.includes('Firefox') ? 'Firefox' : 
                req.get('User-Agent')?.includes('Safari') ? 'Safari' : 'Other',
        os: req.get('User-Agent')?.includes('Windows') ? 'Windows' : 
            req.get('User-Agent')?.includes('Mac') ? 'MacOS' : 
            req.get('User-Agent')?.includes('Linux') ? 'Linux' : 'Other',
        device: req.get('User-Agent')?.includes('Mobile') ? 'Mobile' : 'Desktop'
      }
    });
    await loginSession.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role,
        sessionId: loginSession._id 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLoginAt: user.lastLoginAt,
        loginCount: user.loginCount,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Logout endpoint
router.post('/logout', auth, async (req, res) => {
  try {
    // Update user online status
    await User.findByIdAndUpdate(req.user.userId, { isOnline: false });

    // Update login session
    if (req.user.sessionId) {
      await LoginSession.findByIdAndUpdate(req.user.sessionId, {
        logoutAt: new Date(),
        isActive: false,
        sessionDuration: Math.floor((new Date() - req.user.loginAt) / (1000 * 60)) // minutes
      });
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Protected route example
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get user statistics
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const onlineUsers = await User.countDocuments({ isOnline: true });
    const premiumUsers = await User.countDocuments({ isPremium: true });
    const todayLogins = await LoginSession.countDocuments({
      loginAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    res.json({
      totalUsers,
      onlineUsers,
      premiumUsers,
      todayLogins,
      premiumPercentage: totalUsers > 0 ? ((premiumUsers / totalUsers) * 100).toFixed(2) : 0
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get recent login sessions
router.get('/sessions', adminAuth, async (req, res) => {
  try {
    const sessions = await LoginSession.find({})
      .populate('userId', 'name email')
      .sort({ loginAt: -1 })
      .limit(50);
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get user by ID with sessions
router.get('/users/:userId', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sessions = await LoginSession.find({ userId: req.params.userId })
      .sort({ loginAt: -1 })
      .limit(10);

    res.json({ user, sessions });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;