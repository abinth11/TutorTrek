import mongoose from 'mongoose';
import Admin from '../models/admin';
import { AdminSavedDbInterface } from '@src/types/adminAuthInterface';
import { SavedInstructorInterface } from '@src/types/instructorInterface';
import Instructor from '../models/instructor';
export const adminRepoMongoDb = () => {
  const getAdminByEmail = async (email: string) => {
    const admin: AdminSavedDbInterface | null = await Admin.findOne({ email });
    return admin;
  };

  //? INSTRUCTOR MANAGEMENT
  const getInstructorRequests = async () => {
    const instructors: SavedInstructorInterface[] | null =
      await Instructor.find({ isVerified: false });
    return instructors;
  };

  const acceptInstructorRequest = async (instructorId: string) => {
    const response = await Instructor.findOneAndUpdate(
      { _id: instructorId },
      { isVerified: true }
    );
    return response;
  };

  const checkRejected = async (instructorId: string) => {
    const result = await Instructor.findOne({
      $and: [
        { _id: new mongoose.Types.ObjectId(instructorId) },
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

    return response;
  };

  const getAllInstructors = async () => {
    const instructors: SavedInstructorInterface[] | null =
      await Instructor.find({});
    return instructors;
  };

  const blockInstructors = async (instructorId: string, reason: string) => {
    await Instructor.updateOne(
      { _id: new mongoose.Types.ObjectId(instructorId) },
      {
        $set: {
          isBlocked: true,
          blockedReason: reason,
        },
      }
    );
    return instructorId;
  };

  const unblockInstructors = async (instructorId: string) => {
    await Instructor.updateOne(
      { _id: new mongoose.Types.ObjectId(instructorId) },
      {
        $set: {
          isBlocked: false,
        },
      }
    );
  };

  const getBlockedInstructors = async () => {
    const blockedInstructors = await Instructor.find({ isBlocked: true });
    return blockedInstructors;
  };

  const getInstructorById = async (instructorId: string) => {
    const instructor = await Instructor.findOne({
      _id: new mongoose.Types.ObjectId(instructorId),
    });
    return instructor;
  };

  return {
    getAdminByEmail,
    getInstructorRequests,
    acceptInstructorRequest,
    checkRejected,
    rejectInstructorRequest,
    getAllInstructors,
    blockInstructors,
    unblockInstructors,
    getBlockedInstructors,
    getInstructorById
  };
};

export type AdminRepositoryMongoDb = typeof adminRepoMongoDb;
