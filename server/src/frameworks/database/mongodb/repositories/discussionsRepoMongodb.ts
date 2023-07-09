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

  const deleteDiscussionById = async (id: string) => {
    await Discussions.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  };

  const replyDiscussion = async (
    id: string,
    reply: { studentId: string; message: string }
  ) => {
    console.log(reply);
    await Discussions.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $push: { replies: reply } }
    );
  };

  const getRepliesByDiscussionId = async (id: string) => {
    const replies = await Discussions.findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { replies: 1 }
    );
    return replies;
  };

  return {
    addDiscussion,
    getDiscussionsByLesson,
    editDiscussion,
    deleteDiscussionById,
    replyDiscussion,
    getRepliesByDiscussionId
  };
};

export type DiscussionRepoMongodbInterface = typeof discussionRepositoryMongoDb;
