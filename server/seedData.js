const mongoose = require('mongoose');
const Student = require('./models/Student');
const { mockStudents } = require('../src/data/mockData');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Student.deleteMany({});
    console.log('🗑️  Cleared existing students');

    // Insert mock data
    await Student.insertMany(mockStudents);
    console.log(`✅ Seeded ${mockStudents.length} students`);

    // Close connection
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
