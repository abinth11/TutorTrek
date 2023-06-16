import mongoose from 'mongoose';
import Admin from '../models/admin';
import { AdminSavedDbInterface } from '@src/types/admin/adminAuthInterface';
import { SavedInstructorInterface } from '@src/types/instructor/instructorInterface';
import Instructor from '../models/instructor';
export const adminRepoMongoDb = () => {
  const getAdminByEmail = async (email: string) => {
    const admin: AdminSavedDbInterface | null = await Admin.findOne({ email });
    return admin;
  };
  const getInstructorRequests = async () => {
    const instructors: SavedInstructorInterface[] | null =
      await Instructor.find({ isVerified: false });
    return instructors;
  };
  const acceptInstructorRequest = async (instructorId: string) => {
    const response = await Instructor.findOneAndUpdate({ _id: instructorId }, { isVerified: true });
    return response;
  };

  const checkRejected = async (instructorId: string) => {
    const result = await Instructor.findOne({
      $and: [
        { _id:new mongoose.Types.ObjectId(instructorId) },
        { rejected: true },
      ],
    });
    return result;
  };

  const rejectInstructorRequest = async (
    instructorId: string,
    reason: string
  ) => {
    const options = {
      upsert: true,
      new: true,
    };

    const update = {
      $set: { rejectedReason: reason, rejected: true },
    };
    const response = await Instructor.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(instructorId) },
      update,
      options
    );

    return response
  };

  return {
    getAdminByEmail,
    getInstructorRequests,
    acceptInstructorRequest,
    checkRejected,
    rejectInstructorRequest,
  };
};

export type AdminRepositoryMongoDb = typeof adminRepoMongoDb;
