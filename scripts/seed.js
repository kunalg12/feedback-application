const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../src/models/User.js');
const Course = require('../src/models/Course.js');

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/faculty-feedback-system';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = new User({
      name: 'System Administrator',
      email: 'admin@university.edu',
      password: adminPassword,
      role: 'admin',
    });
    await admin.save();
    console.log('Created admin user');

    // Create faculty users
    const facultyData = [
      {
        name: 'Dr. John Smith',
        email: 'john.smith@university.edu',
        password: 'faculty123',
        role: 'faculty',
        department: 'Computer Science',
        facultyId: 'CS001',
      },
      {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        password: 'faculty123',
        role: 'faculty',
        department: 'Mathematics',
        facultyId: 'MATH001',
      },
      {
        name: 'Dr. Michael Brown',
        email: 'michael.brown@university.edu',
        password: 'faculty123',
        role: 'faculty',
        department: 'Physics',
        facultyId: 'PHYS001',
      },
    ];

    for (const facultyInfo of facultyData) {
      const hashedPassword = await bcrypt.hash(facultyInfo.password, 12);
      const faculty = new User({
        name: facultyInfo.name,
        email: facultyInfo.email,
        password: hashedPassword,
        role: facultyInfo.role,
        department: facultyInfo.department,
        facultyId: facultyInfo.facultyId,
      });
      await faculty.save();
    }
    console.log('Created faculty users');

    // Create student users
    const studentData = [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@student.university.edu',
        password: 'student123',
        role: 'student',
        studentId: 'STU001',
      },
      {
        name: 'Bob Wilson',
        email: 'bob.wilson@student.university.edu',
        password: 'student123',
        role: 'student',
        studentId: 'STU002',
      },
      {
        name: 'Carol Davis',
        email: 'carol.davis@student.university.edu',
        password: 'student123',
        role: 'student',
        studentId: 'STU003',
      },
    ];

    for (const studentInfo of studentData) {
      const hashedPassword = await bcrypt.hash(studentInfo.password, 12);
      const student = new User({
        name: studentInfo.name,
        email: studentInfo.email,
        password: hashedPassword,
        role: studentInfo.role,
        studentId: studentInfo.studentId,
      });
      await student.save();
    }
    console.log('Created student users');

    // Get faculty IDs for course creation
    const csFaculty = await User.findOne({ facultyId: 'CS001' });
    const mathFaculty = await User.findOne({ facultyId: 'MATH001' });
    const physFaculty = await User.findOne({ facultyId: 'PHYS001' });

    // Create courses
    const coursesData = [
      {
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
        department: 'Computer Science',
        facultyId: csFaculty._id,
        semester: 1,
        academicYear: '2024-2025',
        description: 'Fundamental concepts of computer science and programming',
        credits: 3,
      },
      {
        courseCode: 'CS201',
        courseName: 'Data Structures and Algorithms',
        department: 'Computer Science',
        facultyId: csFaculty._id,
        semester: 2,
        academicYear: '2024-2025',
        description: 'Advanced data structures and algorithm analysis',
        credits: 4,
      },
      {
        courseCode: 'MATH201',
        courseName: 'Calculus II',
        department: 'Mathematics',
        facultyId: mathFaculty._id,
        semester: 2,
        academicYear: '2024-2025',
        description: 'Advanced calculus concepts and applications',
        credits: 4,
      },
      {
        courseCode: 'PHYS101',
        courseName: 'Physics I',
        department: 'Physics',
        facultyId: physFaculty._id,
        semester: 1,
        academicYear: '2024-2025',
        description: 'Introduction to classical mechanics',
        credits: 4,
      },
    ];

    for (const courseInfo of coursesData) {
      const course = new Course(courseInfo);
      await course.save();
    }
    console.log('Created courses');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nDefault login credentials:');
    console.log('Admin: admin@university.edu / admin123');
    console.log('Faculty: john.smith@university.edu / faculty123');
    console.log('Student: alice.johnson@student.university.edu / student123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding function
seedDatabase();
