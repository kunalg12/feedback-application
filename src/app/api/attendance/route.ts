import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Attendance from '@/models/Attendance';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const studentId = searchParams.get('studentId');
    const date = searchParams.get('date');

    let query: any = {};
    if (courseId) query.courseId = courseId;
    if (studentId) query.studentId = studentId;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    const attendance = await Attendance.find(query)
      .populate('courseId', 'courseCode courseName')
      .populate('studentId', 'name studentId')
      .populate('markedBy', 'name')
      .sort({ date: -1 });

    return NextResponse.json(attendance);
  } catch (error: any) {
    console.error('Get attendance error:', error);
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
    const { courseId, studentId, date, status, markedBy, remarks } = body;

    // Check if attendance already exists for this student, course, and date
    const existingAttendance = await Attendance.findOne({
      courseId,
      studentId,
      date: new Date(date),
    });

    if (existingAttendance) {
      return NextResponse.json(
        { error: 'Attendance already marked for this student on this date' },
        { status: 400 }
      );
    }

    const attendance = new Attendance({
      courseId,
      studentId,
      date: new Date(date),
      status,
      markedBy,
      remarks,
    });

    await attendance.save();

    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate('courseId', 'courseCode courseName')
      .populate('studentId', 'name studentId')
      .populate('markedBy', 'name');

    return NextResponse.json(
      { message: 'Attendance marked successfully', attendance: populatedAttendance },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Mark attendance error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
