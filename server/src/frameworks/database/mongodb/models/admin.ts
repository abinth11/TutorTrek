import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email',
    ],
  },

  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

const Admin = model('Admin', adminSchema, 'admin');

export default Admin;
