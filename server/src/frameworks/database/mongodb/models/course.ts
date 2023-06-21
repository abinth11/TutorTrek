import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  thumbnail: {
    type: String,
    required: true,
    match: /^(https?|data):\/\/[^\s/$.?#].[^\s]*$/i
  },
  introductionVideo: {
    type: String,
    match: /^(https?|data):\/\/[^\s/$.?#].[^\s]*$/i
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  category: {
    type: String,
    required: true
  },
  instructorId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  enrollmentCount: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default:0
  },
  lessons: {
    type: [String],
    required: true
  },
  isVerified: {
    type: Boolean,
    default:false,
  },
  isPaid: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required:true,
    min: 0
  },
  requirements: {
    type: [String]
  },
  tags: {
    type: [String]
  },
  reviews: [{
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    comment: {
      type: String,
      minlength: 10
    },
    userId: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  enrollmentLimit: {
    type: Number,
    min: 0
  },
  completionStatus: {
    type: Number,
    min: 0,
    max: 100
  }
});

const Course = model('Course', courseSchema, 'course');
export default Course;
