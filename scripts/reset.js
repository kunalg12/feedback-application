const mongoose = require('mongoose');
const { config } = require('dotenv');

// Load environment variables
config({ path: '.env.local' });

// Import models
const User = require('../src/models/User.js');
const Course = require('../src/models/Course.js');
const Attendance = require('../src/models/Attendance.js');
const Feedback = require('../src/models/Feedback.js');

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

async function resetDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear all collections
    await User.deleteMany({});
    await Course.deleteMany({});
    await Attendance.deleteMany({});
    await Feedback.deleteMany({});
    
    console.log('✅ Database reset successfully!');
    console.log('All collections have been cleared.');

  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the reset function
resetDatabase();
