import mongoose from 'mongoose';

export interface IAttendance extends mongoose.Document {
  courseId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent' | 'late';
  markedBy: mongoose.Types.ObjectId;
  remarks?: string;
}

const attendanceSchema = new mongoose.Schema<IAttendance>({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required'],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: [true, 'Status is required'],
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Marked by is required'],
  },
  remarks: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Compound index to prevent duplicate attendance records
attendanceSchema.index({ courseId: 1, studentId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', attendanceSchema);
