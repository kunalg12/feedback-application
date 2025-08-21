import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, password, role, department, studentId, facultyId } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Validate required fields based on role
    if (role === 'faculty' && !department) {
      return NextResponse.json(
        { error: 'Department is required for faculty' },
        { status: 400 }
      );
    }

    if (role === 'student' && !studentId) {
      return NextResponse.json(
        { error: 'Student ID is required for students' },
        { status: 400 }
      );
    }

    if (role === 'faculty' && !facultyId) {
      return NextResponse.json(
        { error: 'Faculty ID is required for faculty' },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      department,
      studentId,
      facultyId,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      studentId: user.studentId,
      facultyId: user.facultyId,
    };

    return NextResponse.json(
      { message: 'User registered successfully', user: userResponse, token },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
