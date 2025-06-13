const express = require('express');
const router = express.Router();
const User = require('../models/User');
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

// POST /api/subscription/upgrade - Upgrade user to premium
router.post('/upgrade', authenticateToken, async (req, res) => {
  try {
    const { plan } = req.body;
    if (!plan || !['monthly', 'yearly'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid subscription plan' });
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate subscription end date
    const startDate = new Date();
    const endDate = new Date();
    if (plan === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Update user's premium status
    user.isPremium = true;
    user.premiumFeatures = {
      skillSwapEnabled: true,
      subscriptionStartDate: startDate,
      subscriptionEndDate: endDate,
      subscriptionPlan: plan
    };

    await user.save();

    // In a real application, you would:
    // 1. Process payment through a payment gateway
    // 2. Handle subscription management
    // 3. Send confirmation emails
    // 4. Update user's payment history

    res.json({
      message: 'Successfully upgraded to premium',
      subscription: {
        plan,
        startDate,
        endDate
      }
    });
  } catch (error) {
    console.error('Error upgrading subscription:', error);
    res.status(500).json({ error: 'Failed to process subscription upgrade' });
  }
});

// GET /api/subscription/status - Get user's subscription status
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      isPremium: user.isPremium,
      subscription: user.premiumFeatures
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    res.status(500).json({ error: 'Failed to fetch subscription status' });
  }
});

// POST /api/subscription/cancel - Cancel premium subscription
router.post('/cancel', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // In a real application, you would:
    // 1. Cancel the subscription with the payment provider
    // 2. Handle prorated refunds if applicable
    // 3. Send confirmation emails
    // 4. Update user's payment history

    // For now, we'll just update the user's status
    user.isPremium = false;
    user.premiumFeatures = {
      skillSwapEnabled: false,
      subscriptionStartDate: null,
      subscriptionEndDate: null,
      subscriptionPlan: 'none'
    };

    await user.save();

    res.json({
      message: 'Successfully cancelled premium subscription',
      subscription: user.premiumFeatures
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

module.exports = router; 