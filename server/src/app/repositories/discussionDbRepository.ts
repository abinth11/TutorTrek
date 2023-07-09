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

  const replyDiscussion = async (id:string,reply:{studentId:string,message:string})=> await repository.replyDiscussion(id,reply)

  const getRepliesByDiscussionId = async (id:string)=>await repository.getRepliesByDiscussionId(id)

  return {
    addDiscussion,
    getDiscussionsByLesson,
    editDiscussion,
    deleteDiscussionById,
    replyDiscussion,
    getRepliesByDiscussionId
  };
};

export type DiscussionDbInterface = typeof discussionDbRepository;
