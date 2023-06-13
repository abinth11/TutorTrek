import mongoose, { Schema, model } from 'mongoose';


const instructorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  profilePic:{
    type:String,
    required:false
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  coursesCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Courses'
    }
  ],
  dateJoined: {
    type: Date,
    default: Date.now
  }
});

const Instructor = model('Instructors', instructorSchema, 'instructor');

export default Instructor;
