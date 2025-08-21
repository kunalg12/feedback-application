import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get('facultyId');
    const department = searchParams.get('department');

    let query: any = {};
    if (facultyId) query.facultyId = facultyId;
    if (department) query.department = department;

    const courses = await Course.find(query)
      .populate('facultyId', 'name email department')
      .sort({ createdAt: -1 });

    return NextResponse.json(courses);
  } catch (error: any) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { courseCode, courseName, department, facultyId, semester, academicYear, description, credits } = body;

    // Check if course already exists
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return NextResponse.json(
        { error: 'Course with this code already exists' },
        { status: 400 }
      );
    }

    const course = new Course({
      courseCode,
      courseName,
      department,
      facultyId,
      semester,
      academicYear,
      description,
      credits,
    });

    await course.save();

    const populatedCourse = await Course.findById(course._id)
      .populate('facultyId', 'name email department');

    return NextResponse.json(
      { message: 'Course created successfully', course: populatedCourse },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
