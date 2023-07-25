import { CreateLessonInterface, EditLessonInterface } from '../../types/lesson';
import { LessonRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/lessonRepoMongodb';
export const lessonDbRepository = (
  repository: ReturnType<LessonRepositoryMongoDbInterface>
) => {

  const addLesson = async (
    courseId: string,
    instructorId: string,
    lesson: CreateLessonInterface
  ) => await repository.addLesson(courseId, instructorId, lesson);

  const editLesson = async (
    lessonId: string,
    lessonInfo: EditLessonInterface
  ) => await repository.editLesson(lessonId, lessonInfo);

  const getLessonsByCourseId = async (courseId: string) =>
    await repository.getLessonsByCourseId(courseId);

  const getLessonById = async (lessonId: string) =>
    await repository.getLessonById(lessonId);

  return {
    addLesson,
    editLesson,
    getLessonById,
    getLessonsByCourseId
  };
};

export type LessonDbRepositoryInterface = typeof lessonDbRepository;
