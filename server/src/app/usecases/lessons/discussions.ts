import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import AppError from '@src/utils/appError';
import { AddDiscussionInterface } from '@src/types/discussion';
import { DiscussionDbInterface } from '@src/app/repositories/discussionDbRepository';

export const addDiscussionU = async (
  lessonId: string,
  discussion: AddDiscussionInterface,
  discussionDbRepository: ReturnType<DiscussionDbInterface>
) => {
  if (!discussion) {
    throw new AppError('Please provide data', HttpStatusCodes.BAD_REQUEST);
  }
  discussion.lessonId=lessonId
  await discussionDbRepository.addDiscussion(discussion);
};
