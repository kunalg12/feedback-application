import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Feedback from '@/models/Feedback';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const facultyId = searchParams.get('facultyId');
    const studentId = searchParams.get('studentId');

    let query: any = {};
    if (courseId) query.courseId = courseId;
    if (facultyId) query.facultyId = facultyId;
    if (studentId) query.studentId = studentId;

    const feedback = await Feedback.find(query)
      .populate('courseId', 'courseCode courseName')
      .populate('facultyId', 'name department')
      .populate('studentId', 'name studentId')
      .sort({ createdAt: -1 });

    return NextResponse.json(feedback);
  } catch (error: any) {
    console.error('Get feedback error:', error);
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
    const {
      courseId,
      facultyId,
      studentId,
      teachingQuality,
      communicationSkills,
      subjectKnowledge,
      punctuality,
      comments,
      isAnonymous,
    } = body;

    // Check if feedback already exists for this student and course
    const existingFeedback = await Feedback.findOne({
      courseId,
      studentId,
    });

    if (existingFeedback) {
      return NextResponse.json(
        { error: 'Feedback already submitted for this course' },
        { status: 400 }
      );
    }

    const feedback = new Feedback({
      courseId,
      facultyId,
      studentId,
      teachingQuality,
      communicationSkills,
      subjectKnowledge,
      punctuality,
      comments,
      isAnonymous,
    });

    await feedback.save();

    const populatedFeedback = await Feedback.findById(feedback._id)
      .populate('courseId', 'courseCode courseName')
      .populate('facultyId', 'name department')
      .populate('studentId', 'name studentId');

    return NextResponse.json(
      { message: 'Feedback submitted successfully', feedback: populatedFeedback },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Submit feedback error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
