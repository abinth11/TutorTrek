import Discussions from '../models/discussions';
import { AddDiscussionInterface } from '@src/types/discussion';
export const discussionRepositoryMongoDb = () => {
  const addDiscussion = async (
    discussion: AddDiscussionInterface,
  ) => {
    const newDiscussion = new Discussions(discussion);
    await newDiscussion.save();
  }

  return {
    addDiscussion
  };
};

export type DiscussionRepoMongodbInterface = typeof discussionRepositoryMongoDb
