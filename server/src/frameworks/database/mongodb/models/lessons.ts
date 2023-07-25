import { Schema, model } from 'mongoose';

const MediaSchema = new Schema({
  key: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
});


const LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  contents: {
    type: Array<string>,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: 'instructor',
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: true
  },
  about:{
   type:String,
   required:true
  },
  media: {
    type: [MediaSchema]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Lessons = model('Lesson', LessonSchema, 'lessons');
export default Lessons;
