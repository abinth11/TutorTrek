import mongoose from 'mongoose';
import Discussions from '../models/discussions';
import { AddDiscussionInterface } from '@src/types/discussion';
export const discussionRepositoryMongoDb = () => {
  const addDiscussion = async (discussion: AddDiscussionInterface) => {
    const newDiscussion = new Discussions(discussion);
    await newDiscussion.save();
  };

  const getDiscussionsByLesson = async (lessonId: string) => {
    const discussions = await Discussions.find({
      lessonId: new mongoose.Types.ObjectId(lessonId)
    });
    return discussions;
  };

  return {
    addDiscussion,
    getDiscussionsByLesson
  };
};

export type DiscussionRepoMongodbInterface = typeof discussionRepositoryMongoDb;
