const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function testLogin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skilllink');
    console.log('Connected to MongoDB\n');

    // Test with a few users
    const testUsers = [
      'suchithpuppala@gmail.com',
      'student@gmail.com',
      'admin@skilllink.com'
    ];

    for (const email of testUsers) {
      console.log(`Testing login for: ${email}`);
      
      try {
        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
          console.log('  ❌ User not found');
          continue;
        }

        console.log(`  ✅ User found: ${user.name || 'No name'} (${user.role})`);
        console.log(`  - Has password: ${user.password ? 'Yes' : 'No'}`);
        console.log(`  - Password length: ${user.password ? user.password.length : 0}`);
        console.log(`  - Has required fields:`);
        console.log(`    * lastLoginAt: ${user.hasOwnProperty('lastLoginAt')}`);
        console.log(`    * loginCount: ${user.hasOwnProperty('loginCount')}`);
        console.log(`    * isOnline: ${user.hasOwnProperty('isOnline')}`);
        console.log(`    * isPremium: ${user.hasOwnProperty('isPremium')}`);
        console.log(`    * premiumFeatures: ${user.hasOwnProperty('premiumFeatures')}`);

        // Test password verification (we'll use a dummy password since we don't know the real ones)
        console.log('  - Password verification: Cannot test without knowing actual passwords');
        
      } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
      }
      
      console.log('');
    }

    // Show all users for reference
    console.log('📋 All users in database:');
    const allUsers = await User.find({}).select('name email role');
    allUsers.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.name || 'No name'} (${user.email}) - ${user.role}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

testLogin(); 