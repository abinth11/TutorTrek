import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CreateLessonInterface } from '../../../types/lesson';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';
import { QuizDbInterface } from '@src/app/repositories/quizDbRepository';
import { LessonDbRepositoryInterface } from '@src/app/repositories/lessonDbRepository';
export const addLessonsU = async (
  media: Express.Multer.File[] | undefined,
  courseId: string | undefined,
  instructorId: string,
  lesson: CreateLessonInterface,
  lessonDbRepository: ReturnType<LessonDbRepositoryInterface>,
  cloudService: ReturnType<CloudServiceInterface>,
  quizDbRepository:ReturnType<QuizDbInterface>,
) => {
  if (!courseId) {
    throw new AppError(
      'Please provide an course id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (!instructorId && instructorId !== '') {
    throw new AppError(
      'Please provide an instructor id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (!lesson) {
    throw new AppError('Data is not provided', HttpStatusCodes.BAD_REQUEST);
  }
  
  if (media) {
    lesson.media = await Promise.all(
      media.map(async files => await cloudService.upload(files))
    );
  }
  const lessonId = await lessonDbRepository.addLesson(courseId, instructorId, lesson);
  if(!lessonId){
    throw new AppError('Data is not provided', HttpStatusCodes.BAD_REQUEST);
  }
  const quiz = {
    courseId,
    lessonId:lessonId.toString(),
    questions:lesson.questions
  }
  await quizDbRepository.addQuiz(quiz)
};
