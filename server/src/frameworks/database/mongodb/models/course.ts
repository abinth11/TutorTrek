import { Schema, model } from 'mongoose';
import { AddCourseInfoInterface } from '@src/types/courseInterface';
const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  thumbnail: {
    type: String,
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
  isPaid: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: function(this:AddCourseInfoInterface) {
      return this.isPaid;
    },
    min: 0
  },
  enrollmentCount: {
    type: Number,
    required: true,
    min: 0,
    default:0
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
  completionStatus: {
    type: Number,
    min: 0,
    max: 100,
    default:0
  }
});

const Course = model('Course', courseSchema, 'course');
export default Course;
