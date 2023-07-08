import mongoose from 'mongoose';
import Discussions from '../models/discussions';
import { AddDiscussionInterface } from '@src/types/discussion';
import Students from '../models/student';
export const discussionRepositoryMongoDb = () => {
  const addDiscussion = async (discussion: AddDiscussionInterface) => {
    const newDiscussion = new Discussions(discussion);
    await newDiscussion.save();
  };

  const getDiscussionsByLesson = async (lessonId: string) => {
    const discussionsWithUserDetails = await Discussions.aggregate([
      {
        $match: { lessonId: new mongoose.Types.ObjectId(lessonId) }
      },
      {
        $lookup: {
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: 'studentDetails'
        }
      },
      {
        $unwind: '$studentDetails'
      },
      {
        $project: {
          _id: 1,
          message: 1,
          lessonId: 1,
          replies: 1,
          createdAt: 1,
          updatedAt: 1,
          'studentDetails._id': 1,
          'studentDetails.firstName': 1,
          'studentDetails.lastName': 1,
          'studentDetails.profilePic': 1,
          'studentDetails.dateJoined': 1
        }
      }
    ]);
    return discussionsWithUserDetails;
  };

  const editDiscussion = async (id: string, message: string) => {
    await Discussions.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { message, updatedAt: Date.now() }
    );
  };

  return {
    addDiscussion,
    getDiscussionsByLesson,
    editDiscussion
  };
};

export type DiscussionRepoMongodbInterface = typeof discussionRepositoryMongoDb;
