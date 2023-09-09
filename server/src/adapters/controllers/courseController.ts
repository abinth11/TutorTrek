import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { CourseRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { CourseDbRepositoryInterface } from '../../app/repositories/courseDbRepository';
import { addCourses } from '../../app/usecases/course/addCourse';
import {
  AddCourseInfoInterface,
  EditCourseInfo
} from '../../types/courseInterface';
import { CustomRequest } from '../../types/customRequest';
import {
  getAllCourseU,
  getCourseByIdU,
  getCourseByStudentU
} from '../../app/usecases/course/listCourse';
import { getCourseByInstructorU } from '../../app/usecases/course/viewCourse';
import { addLessonsU } from '../../app/usecases/lessons/addLesson';
import { getLessonsByCourseIdU } from '../../app/usecases/lessons/viewLessons';
import { CloudServiceInterface } from '../../app/services/cloudServiceInterface';
import { CloudServiceImpl } from '../../frameworks/services/s3CloudService';
import { getQuizzesLessonU } from '../../app/usecases/quiz/getQuiz';
import { getLessonByIdU } from '../../app/usecases/lessons/getLesson';
import { QuizDbInterface } from '../../app/repositories/quizDbRepository';
import { QuizRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/quizzDbRepository';
import { LessonDbRepositoryInterface } from '../../app/repositories/lessonDbRepository';
import { LessonRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/lessonRepoMongodb';
import { AddDiscussionInterface } from '../../types/discussion';
import { DiscussionRepoMongodbInterface } from '../../frameworks/database/mongodb/repositories/discussionsRepoMongodb';
import { DiscussionDbInterface } from '../../app/repositories/discussionDbRepository';
import {
  addDiscussionU,
  getDiscussionsByLessonU,
  editDiscussionU,
  deleteDiscussionByIdU,
  replyDiscussionU,
  getRepliesByDiscussionIdU
} from '../../app/usecases/lessons/discussions';
import { enrollStudentU } from '../../app/usecases/course/enroll';
import { PaymentInfo } from '../../types/payment';
import { PaymentInterface } from '../../app/repositories/paymentDbRepository';
import { PaymentImplInterface } from '../../frameworks/database/mongodb/repositories/paymentRepoMongodb';
import {
  getRecommendedCourseByStudentU,
  getTrendingCourseU
} from '../../app/usecases/course/recommendation';
import { editCourseU } from '../../app/usecases/course/editCourse';
import { editLessonsU } from '../../app/usecases/lessons/editLesson';
import { searchCourseU } from '../../app/usecases/course/search';
import { CacheRepositoryInterface } from '@src/app/repositories/cachedRepoInterface';
import { RedisRepositoryImpl } from '@src/frameworks/database/redis/redisCacheRepository';
import { RedisClient } from '@src/app';

const courseController = (
  cloudServiceInterface: CloudServiceInterface,
  cloudServiceImpl: CloudServiceImpl,
  courseDbRepository: CourseDbRepositoryInterface,
  courseDbRepositoryImpl: CourseRepositoryMongoDbInterface,
  quizDbRepository: QuizDbInterface,
  quizDbRepositoryImpl: QuizRepositoryMongoDbInterface,
  lessonDbRepository: LessonDbRepositoryInterface,
  lessonDbRepositoryImpl: LessonRepositoryMongoDbInterface,
  discussionDbRepository: DiscussionDbInterface,
  discussionDbRepositoryImpl: DiscussionRepoMongodbInterface,
  paymentDbRepository: PaymentInterface,
  paymentDbRepositoryImpl: PaymentImplInterface,
  cacheDbRepository: CacheRepositoryInterface,
  cacheDbRepositoryImpl: RedisRepositoryImpl,
  cacheClient: RedisClient
) => {
  const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());
  const cloudService = cloudServiceInterface(cloudServiceImpl());
  const dbRepositoryQuiz = quizDbRepository(quizDbRepositoryImpl());
  const dbRepositoryLesson = lessonDbRepository(lessonDbRepositoryImpl());
  const dbRepositoryDiscussion = discussionDbRepository(
    discussionDbRepositoryImpl()
  );
  const dbRepositoryPayment = paymentDbRepository(paymentDbRepositoryImpl());
  const dbRepositoryCache = cacheDbRepository(
    cacheDbRepositoryImpl(cacheClient)
  );

  const addCourse = asyncHandler(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const course: AddCourseInfoInterface = req.body;
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];
      const instructorId = req.user?.Id;
      const response = await addCourses(
        instructorId,
        course,
        files,
        cloudService,
        dbRepositoryCourse
      );
      console.log(response)
      res.status(201).json({
        status: 'success',
        message:
          'Successfully added new course, course will be published after verification',
        data: response
      });
    }
  );

  const editCourse = asyncHandler(async (req: CustomRequest, res: Response) => {
    const course: EditCourseInfo = req.body;
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const instructorId = req.user?.Id;
    const courseId: string = req.params.courseId;
    const response = await editCourseU(
      courseId,
      instructorId,
      files,
      course,
      cloudService,
      dbRepositoryCourse
    );
    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the course',
      data: response
    });
  });

  const getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    const courses = await getAllCourseU(cloudService, dbRepositoryCourse);
    const cacheOptions = {
      key: `all-courses`,
      expireTimeSec: 600,
      data: JSON.stringify(courses)
    };
    await dbRepositoryCache.setCache(cacheOptions);
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved all courses',
      data: courses
    });
  });

  const getIndividualCourse = asyncHandler(
    async (req: Request, res: Response) => {
      const courseId: string = req.params.courseId;
      const course = await getCourseByIdU(
        courseId,
        cloudService,
        dbRepositoryCourse
      );
      console.log(course)
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved the course',
        data: course
      });
    }
  );

  const getCoursesByInstructor = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const instructorId = req.user?.Id;
      const courses = await getCourseByInstructorU(
        instructorId,
        cloudService,
        dbRepositoryCourse
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved your courses',
        data: courses
      });
    }
  );

  const addLesson = asyncHandler(async (req: CustomRequest, res: Response) => {
    const instructorId = req.user?.Id;
    const courseId = req.params.courseId;
    const lesson = req.body;
    const medias = req.files as Express.Multer.File[];
    const questions = JSON.parse(lesson.questions);
    lesson.questions = questions;
    await addLessonsU(
      medias,
      courseId,
      instructorId,
      lesson,
      dbRepositoryLesson,
      cloudService,
      dbRepositoryQuiz
    );
    res.status(200).json({
      status: 'success',
      message: 'Successfully added new lesson',
      data: null
    });
  });

  const editLesson = asyncHandler(async (req: CustomRequest, res: Response) => {
    const lesson = req.body;
    const lessonId = req.params.lessonId;
    const medias = req.files as Express.Multer.File[];
    const questions = JSON.parse(lesson.questions);
    lesson.questions = questions;
    await editLessonsU(
      medias,
      lessonId,
      lesson,
      dbRepositoryLesson,
      cloudService,
      dbRepositoryQuiz
    );
    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the lesson',
      data: null
    });
  });

  const getLessonsByCourse = asyncHandler(
    async (req: Request, res: Response) => {
      const courseId = req.params.courseId;
      const lessons = await getLessonsByCourseIdU(courseId, dbRepositoryLesson);
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved lessons based on the course',
        data: lessons
      });
    }
  );

  const getLessonById = asyncHandler(async (req: Request, res: Response) => {
    const lessonId = req.params.lessonId;
    const lesson = await getLessonByIdU(lessonId, dbRepositoryLesson);
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved lessons based on the course',
      data: lesson
    });
  });

  const getQuizzesByLesson = asyncHandler(
    async (req: Request, res: Response) => {
      const lessonId = req.params.lessonId;
      const quizzes = await getQuizzesLessonU(lessonId, dbRepositoryQuiz);
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved quizzes based on the lesson',
        data: quizzes
      });
    }
  );

  const addDiscussion = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const lessonId: string = req.params.lessonId;
      const userId = req.user?.Id;
      const discussion: AddDiscussionInterface = req.body;
      await addDiscussionU(
        userId,
        lessonId,
        discussion,
        dbRepositoryDiscussion
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully posted your comment',
        data: null
      });
    }
  );

  const getDiscussionsByLesson = asyncHandler(
    async (req: Request, res: Response) => {
      const lessonId: string = req.params.lessonId;
      const discussion = await getDiscussionsByLessonU(
        lessonId,
        dbRepositoryDiscussion
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved discussions based on a lesson',
        data: discussion
      });
    }
  );

  const editDiscussions = asyncHandler(async (req: Request, res: Response) => {
    const discussionId: string = req.params.discussionId;
    const message: string = req.body.message;
    await editDiscussionU(discussionId, message, dbRepositoryDiscussion);
    res.status(200).json({
      status: 'success',
      message: 'Successfully edited your comment',
      data: null
    });
  });

  const deleteDiscussion = asyncHandler(async (req: Request, res: Response) => {
    const discussionId: string = req.params.discussionId;
    await deleteDiscussionByIdU(discussionId, dbRepositoryDiscussion);
    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted your comment',
      data: null
    });
  });

  const replyDiscussion = asyncHandler(async (req: Request, res: Response) => {
    const discussionId: string = req.params.discussionId;
    const reply = req.body.reply;
    await replyDiscussionU(discussionId, reply, dbRepositoryDiscussion);
    res.status(200).json({
      status: 'success',
      message: 'Successfully replied to a comment',
      data: null
    });
  });

  const getRepliesByDiscussion = asyncHandler(
    async (req: Request, res: Response) => {
      const discussionId: string = req.params.discussionId;
      const replies = await getRepliesByDiscussionIdU(
        discussionId,
        dbRepositoryDiscussion
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved replies based on discussion',
        data: replies
      });
    }
  );

  const enrollStudent = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const paymentInfo: PaymentInfo = req.body;
      const { courseId }: { courseId?: string } = req.params;
      const { Id }: { Id?: string } = req.user || {};
      const courseIdValue: string = courseId ?? '';
      const studentId: string = Id ?? '';

      await enrollStudentU(
        courseIdValue,
        studentId,
        paymentInfo,
        dbRepositoryCourse,
        dbRepositoryPayment
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully enrolled into the course',
        data: null
      });
    }
  );

  const getRecommendedCourseByStudentInterest = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const studentId: string = req.user?.Id ?? '';
      const courses = await getRecommendedCourseByStudentU(
        studentId,
        cloudService,
        dbRepositoryCourse
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved recommended courses',
        data: courses
      });
    }
  );

  const getTrendingCourses = asyncHandler(
    async (req: Request, res: Response) => {
      const courses = await getTrendingCourseU(
        cloudService,
        dbRepositoryCourse
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved trending courses',
        data: courses
      });
    }
  );

  const getCourseByStudent = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const studentId: string | undefined = req.user?.Id;
      const courses = await getCourseByStudentU(
        studentId,
        cloudService,
        dbRepositoryCourse
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved courses based on students',
        data: courses
      });
    }
  );

  const searchCourse = asyncHandler(async (req: Request, res: Response) => {
    const { search, filter } = req.query as { search: string; filter: string };
    const key = search.trim()===""?search:filter
    const searchResult = await searchCourseU(
      search,
      filter,
      cloudService,
      dbRepositoryCourse
    );
    if (searchResult.length) {
      const cacheOptions = {
        key: `${key}`,
        expireTimeSec: 600,
        data: JSON.stringify(searchResult)
      };
      await dbRepositoryCache.setCache(cacheOptions);
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved courses based on the search query',
      data: searchResult
    });
  });

  return {
    addCourse,
    editCourse,
    getAllCourses,
    getIndividualCourse,
    getCoursesByInstructor,
    addLesson,
    editLesson,
    getLessonsByCourse,
    getLessonById,
    getQuizzesByLesson,
    addDiscussion,
    getDiscussionsByLesson,
    editDiscussions,
    deleteDiscussion,
    replyDiscussion,
    getRepliesByDiscussion,
    enrollStudent,
    getRecommendedCourseByStudentInterest,
    getTrendingCourses,
    getCourseByStudent,
    searchCourse
  };
};

export default courseController;
