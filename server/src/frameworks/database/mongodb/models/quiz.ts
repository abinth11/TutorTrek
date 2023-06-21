import { Schema, model } from 'mongoose';

const quizSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  questions: [{
    question: {
      type: String,
      required: true,
      minlength: 5
    },
    options: [{
      type: String,
      required: true
    }],
    correctOptionIndex: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quiz = model('Quiz', quizSchema, 'quiz');
export default Quiz;
