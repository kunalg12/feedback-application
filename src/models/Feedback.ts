import mongoose from 'mongoose';

export interface IFeedback extends mongoose.Document {
  courseId: mongoose.Types.ObjectId;
  facultyId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  teachingQuality: number;
  communicationSkills: number;
  subjectKnowledge: number;
  punctuality: number;
  overallRating: number;
  comments: string;
  isAnonymous: boolean;
}

const feedbackSchema = new mongoose.Schema<IFeedback>({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required'],
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Faculty ID is required'],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required'],
  },
  teachingQuality: {
    type: Number,
    required: [true, 'Teaching quality rating is required'],
    min: 1,
    max: 5,
  },
  communicationSkills: {
    type: Number,
    required: [true, 'Communication skills rating is required'],
    min: 1,
    max: 5,
  },
  subjectKnowledge: {
    type: Number,
    required: [true, 'Subject knowledge rating is required'],
    min: 1,
    max: 5,
  },
  punctuality: {
    type: Number,
    required: [true, 'Punctuality rating is required'],
    min: 1,
    max: 5,
  },
  overallRating: {
    type: Number,
    required: [true, 'Overall rating is required'],
    min: 1,
    max: 5,
  },
  comments: {
    type: String,
    required: [true, 'Comments are required'],
    trim: true,
    maxlength: 1000,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Compound index to prevent duplicate feedback from same student for same course
feedbackSchema.index({ courseId: 1, studentId: 1 }, { unique: true });

// Calculate overall rating before saving
feedbackSchema.pre('save', function(next) {
  this.overallRating = Math.round(
    (this.teachingQuality + this.communicationSkills + this.subjectKnowledge + this.punctuality) / 4
  );
  next();
});

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', feedbackSchema);
