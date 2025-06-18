const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/skilllink');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skilllink');
    console.log('✅ Connected to MongoDB successfully!');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Collections in database:');
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`);
    });
    
    // Check if users collection exists
    if (collections.some(c => c.name === 'users')) {
      const userCount = await mongoose.connection.db.collection('users').countDocuments();
      console.log(`\n👥 Users in database: ${userCount}`);
      
      if (userCount > 0) {
        const users = await mongoose.connection.db.collection('users').find({}).limit(3).toArray();
        console.log('\n📋 Sample users:');
        users.forEach((user, index) => {
          console.log(`   ${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
        });
      }
    }
    
    // Check if loginsessions collection exists
    if (collections.some(c => c.name === 'loginsessions')) {
      const sessionCount = await mongoose.connection.db.collection('loginsessions').countDocuments();
      console.log(`\n🔐 Login sessions: ${sessionCount}`);
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

testConnection(); 