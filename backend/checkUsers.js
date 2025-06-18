const mongoose = require('mongoose');
const User = require('./models/User');
const LoginSession = require('./models/LoginSession');
require('dotenv').config();

async function checkUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skilllink');
    console.log('Connected to MongoDB\n');

    // Get all users
    console.log('=== ALL USERS ===');
    const users = await User.find({}).select('-password');
    console.log(`Total users: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Online: ${user.isOnline ? 'Yes' : 'No'}`);
      console.log(`   Last Login: ${user.lastLoginAt ? user.lastLoginAt.toLocaleString() : 'Never'}`);
      console.log(`   Login Count: ${user.loginCount || 0}`);
      console.log(`   Premium: ${user.isPremium ? 'Yes' : 'No'}`);
      console.log(`   Created: ${user.createdAt.toLocaleString()}`);
      console.log('');
    });

    // Get recent login sessions
    console.log('=== RECENT LOGIN SESSIONS ===');
    const sessions = await LoginSession.find({})
      .populate('userId', 'name email')
      .sort({ loginAt: -1 })
      .limit(10);
    
    console.log(`Recent sessions: ${sessions.length}\n`);
    
    sessions.forEach((session, index) => {
      console.log(`${index + 1}. ${session.userId?.name || session.userEmail}`);
      console.log(`   Login: ${session.loginAt.toLocaleString()}`);
      console.log(`   Logout: ${session.logoutAt ? session.logoutAt.toLocaleString() : 'Active'}`);
      console.log(`   Duration: ${session.sessionDuration ? session.sessionDuration + ' minutes' : 'N/A'}`);
      console.log(`   Device: ${session.deviceInfo?.browser || 'Unknown'} on ${session.deviceInfo?.os || 'Unknown'}`);
      console.log(`   Status: ${session.isActive ? 'Active' : 'Ended'}`);
      console.log('');
    });

    // Get statistics
    console.log('=== STATISTICS ===');
    const totalUsers = await User.countDocuments();
    const onlineUsers = await User.countDocuments({ isOnline: true });
    const premiumUsers = await User.countDocuments({ isPremium: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const todayLogins = await LoginSession.countDocuments({
      loginAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    console.log(`Total Users: ${totalUsers}`);
    console.log(`Online Users: ${onlineUsers}`);
    console.log(`Premium Users: ${premiumUsers}`);
    console.log(`Admin Users: ${adminUsers}`);
    console.log(`Today's Logins: ${todayLogins}`);
    console.log(`Premium Percentage: ${totalUsers > 0 ? ((premiumUsers / totalUsers) * 100).toFixed(2) : 0}%`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

checkUsers(); 