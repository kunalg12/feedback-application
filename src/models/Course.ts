import mongoose from 'mongoose';

export interface ICourse extends mongoose.Document {
  courseCode: string;
  courseName: string;
  department: string;
  facultyId: mongoose.Types.ObjectId;
  semester: number;
  academicYear: string;
  description?: string;
  credits: number;
}

const courseSchema = new mongoose.Schema<ICourse>({
  courseCode: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    trim: true,
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Faculty ID is required'],
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: 1,
    max: 8,
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required'],
  },
  description: {
    type: String,
    trim: true,
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: 1,
    max: 6,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
