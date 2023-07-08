import { DiscussionRepoMongodbInterface } from '@src/frameworks/database/mongodb/repositories/discussionsRepoMongodb';
import { AddDiscussionInterface } from '@src/types/discussion';

export const discussionDbRepository = (
  repository: ReturnType<DiscussionRepoMongodbInterface>
) => {
  const addDiscussion = async (discussionInfo: AddDiscussionInterface) =>
    await repository.addDiscussion(discussionInfo);

  const getDiscussionsByLesson = async (lessonId: string) =>
    await repository.getDiscussionsByLesson(lessonId);

  const editDiscussion = async (id:string,message:string)=>await repository.editDiscussion(id,message)

  const deleteDiscussionById = async (id:string) => await repository.deleteDiscussionById(id)

  return {
    addDiscussion,
    getDiscussionsByLesson,
    editDiscussion,
    deleteDiscussionById
  };
};

export type DiscussionDbInterface = typeof discussionDbRepository;
