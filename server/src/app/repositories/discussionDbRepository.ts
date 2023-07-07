import { DiscussionRepoMongodbInterface } from '@src/frameworks/database/mongodb/repositories/discussionsRepoMongodb';
import { AddDiscussionInterface } from '@src/types/discussion';

export const discussionDbRepository = (
  repository: ReturnType<DiscussionRepoMongodbInterface>
) => {
  const addDiscussion = async (discussionInfo: AddDiscussionInterface) =>
    await repository.addDiscussion(discussionInfo);

  const getDiscussionsByLesson = async (lessonId: string) =>
    await repository.getDiscussionsByLesson(lessonId);

  return {
    addDiscussion,
    getDiscussionsByLesson
  };
};

export type DiscussionDbInterface = typeof discussionDbRepository;
