import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { AddDiscussionInterface } from '../../../types/discussion';
import { DiscussionDbInterface } from '../../../app/repositories/discussionDbRepository';

export const addDiscussionU = async (
  studentId: string | undefined,
  lessonId: string,
  discussion: AddDiscussionInterface,
  discussionDbRepository: ReturnType<DiscussionDbInterface>
) => {
  if (!discussion) {
    throw new AppError('Please provide data', HttpStatusCodes.BAD_REQUEST);
  }
  if (!studentId) {
    throw new AppError('user not found', HttpStatusCodes.BAD_REQUEST);
  }
  discussion.lessonId = lessonId;
  discussion.studentId = studentId;
  await discussionDbRepository.addDiscussion(discussion);
};

export const getDiscussionsByLessonU = async (
  lessonId: string,
  discussionDbRepository: ReturnType<DiscussionDbInterface>
) => {
  if (!lessonId) {
    throw new AppError(
      'Please provide a lesson id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const discussions = await discussionDbRepository.getDiscussionsByLesson(
    lessonId
  );
  return discussions;
};
