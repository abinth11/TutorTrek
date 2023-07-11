import mongoose, { Schema, model, Document } from 'mongoose';

interface IStudent extends Document {
  firstName: string;
  lastName: string;
  email: string;
  profilePic:string;
  mobile?: string;
  password?: string;
  coursesEnrolled: mongoose.Schema.Types.ObjectId[];
  dateJoined: Date;
  isGoogleUser: boolean;
}

const studentSchema = new Schema<IStudent>({
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
    required: function(this: IStudent) {
      return !this.isGoogleUser;
    },
    trim: true,
    unique: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  password: {
    type: String,
    required: function(this: IStudent) {
      return !this.isGoogleUser;
    },
    minlength: 8
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  isGoogleUser: {
    type: Boolean,
    default: false
  }
});

const Students = model<IStudent>('Students', studentSchema, 'students');

export default Students;
