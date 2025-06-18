const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function fixUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skilllink');
    console.log('Connected to MongoDB\n');

    // Get all users
    const users = await User.find({});
    console.log(`Found ${users.length} users in database\n`);

    // Fix each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log(`Processing user ${i + 1}: ${user.email}`);
      
      // Check what fields are missing
      const updates = {};
      
      if (!user.hasOwnProperty('lastLoginAt')) {
        updates.lastLoginAt = null;
        console.log('  - Adding lastLoginAt field');
      }
      
      if (!user.hasOwnProperty('loginCount')) {
        updates.loginCount = 0;
        console.log('  - Adding loginCount field');
      }
      
      if (!user.hasOwnProperty('isOnline')) {
        updates.isOnline = false;
        console.log('  - Adding isOnline field');
      }
      
      if (!user.hasOwnProperty('isPremium')) {
        updates.isPremium = false;
        console.log('  - Adding isPremium field');
      }
      
      if (!user.hasOwnProperty('premiumFeatures')) {
        updates.premiumFeatures = {
          skillSwapEnabled: false,
          subscriptionStartDate: null,
          subscriptionEndDate: null,
          subscriptionPlan: 'none'
        };
        console.log('  - Adding premiumFeatures field');
      }
      
      // Update user if there are missing fields
      if (Object.keys(updates).length > 0) {
        await User.findByIdAndUpdate(user._id, updates);
        console.log('  ✅ User updated successfully');
      } else {
        console.log('  ✅ User already has all required fields');
      }
      
      console.log('');
    }

    // Show final user count
    const finalCount = await User.countDocuments();
    console.log(`✅ Database fix completed! Total users: ${finalCount}`);

  } catch (error) {
    console.error('Error fixing users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixUsers(); 