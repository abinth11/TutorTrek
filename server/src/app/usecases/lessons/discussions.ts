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

export const editDiscussionU = async (
  discussionId: string,
  message: string,
  discussionDbRepository: ReturnType<DiscussionDbInterface>
) => {
  if (!discussionId) {
    throw new AppError(
      'Please provide a discussion id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  message = message.trim();
  if (!message) {
    throw new AppError(
      'Please provide a valid message',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  await discussionDbRepository.editDiscussion(discussionId, message);
};

export const deleteDiscussionByIdU = async (
  discussionId: string,
  discussionDbRepository: ReturnType<DiscussionDbInterface>
) => {
  if (!discussionId) {
    throw new AppError(
      'Please provide a discussion id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  await discussionDbRepository.deleteDiscussionById(discussionId);
};

export const replyDiscussionU = async (
  discussionId: string,
  reply: { studentId: string; message: string },
  discussionDbRepository: ReturnType<DiscussionDbInterface>
) => {
  if (!discussionId) {
    throw new AppError(
      'Please provide a discussion id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (!reply) {
    throw new AppError(
      'Please provide valid data',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  await discussionDbRepository.replyDiscussion(discussionId, reply);
};

export const getRepliesByDiscussionIdU = async (
  discussionId: string,
  discussionDbRepository: ReturnType<DiscussionDbInterface>
) => {
  if (!discussionId) {
    throw new AppError(
      'Please provide a discussion id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const replies = await discussionDbRepository.getRepliesByDiscussionId(
    discussionId
  );
  return replies;
};
