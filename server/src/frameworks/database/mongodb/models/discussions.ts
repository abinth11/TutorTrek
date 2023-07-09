import { Schema, model } from 'mongoose';

const replySchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  message: {
    type: String,
    required: true
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

const discussionsSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'students'
  },
  message: {
    type: String,
    required: true
  },
  lessonId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  replies: [replySchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Discussions = model('Discussions', discussionsSchema, 'discussions');
export default Discussions;
