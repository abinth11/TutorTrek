import { DiscussionRepoMongodbInterface } from '@src/frameworks/database/mongodb/repositories/discussionsRepoMongodb';
import { AddDiscussionInterface } from '@src/types/discussion';

export const discussionDbRepository = (
  repository: ReturnType<DiscussionRepoMongodbInterface>
) => {
  const addDiscussion = async (discussionInfo: AddDiscussionInterface) =>
    await repository.addDiscussion(discussionInfo);

  return {
    addDiscussion
  };
};

export type DiscussionDbInterface = typeof discussionDbRepository;
