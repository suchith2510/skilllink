const mongoose = require('mongoose');
const User = require('./models/User');
const LoginSession = require('./models/LoginSession');
require('dotenv').config();

async function deleteAllUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skilllink');
    console.log('Connected to MongoDB\n');

    // Get current user count
    const userCount = await User.countDocuments();
    console.log(`Found ${userCount} users in database\n`);

    if (userCount === 0) {
      console.log('No users to delete.');
      return;
    }

    // Show users that will be deleted
    console.log('Users that will be deleted:');
    const users = await User.find({}).select('name email role');
    users.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.name || 'No name'} (${user.email}) - ${user.role}`);
    });

    console.log('\n⚠️  WARNING: This will permanently delete ALL users!');
    console.log('⚠️  This action cannot be undone!');
    
    // Delete all users
    const deleteResult = await User.deleteMany({});
    console.log(`\n✅ Deleted ${deleteResult.deletedCount} users successfully!`);

    // Also delete all login sessions
    const sessionCount = await LoginSession.countDocuments();
    if (sessionCount > 0) {
      const sessionDeleteResult = await LoginSession.deleteMany({});
      console.log(`✅ Deleted ${sessionDeleteResult.deletedCount} login sessions!`);
    }

    // Verify deletion
    const remainingUsers = await User.countDocuments();
    const remainingSessions = await LoginSession.countDocuments();
    
    console.log(`\n📊 Final database state:`);
    console.log(`  - Users: ${remainingUsers}`);
    console.log(`  - Login Sessions: ${remainingSessions}`);

    if (remainingUsers === 0) {
      console.log('\n🎉 All users have been successfully deleted!');
      console.log('You can now create new users or run the admin creation script.');
    }

  } catch (error) {
    console.error('❌ Error deleting users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

deleteAllUsers(); 