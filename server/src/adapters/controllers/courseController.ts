import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { CourseRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { CourseDbRepositoryInterface } from '../../app/repositories/courseDbRepository';
import { addCourses } from '../../app/usecases/instructor/addCourse';
import { AddCourseInfoInterface } from '../../types/instructor/courseInterface';
import { CustomRequest } from '../../types/custom/customRequest';
import { getAllCourseU, getCourseByIdU } from '../../app/usecases/listCourse';
import { getCourseByInstructorU } from '../../app/usecases/instructor/viewCourse';
import { addLessonsU } from '../../app/usecases/instructor/addLesson';
import { addQuizU } from '../../app/usecases/instructor/addQuiz';
import { getLessonsByCourseIdU } from '../../app/usecases/instructor/viewLessons';
const courseController = (
  courseDbRepository: CourseDbRepositoryInterface,
  courseDbRepositoryImpl: CourseRepositoryMongoDbInterface
) => {
  const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());

  const addCourse = asyncHandler(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const course: AddCourseInfoInterface = req.body;
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];
      const instructorId = req.user?.Id;
      if (instructorId) {
        course.instructorId = instructorId;
      }
      if (files) {
        const images = files
          .filter((file) => file.mimetype.startsWith('image/'))
          .map((file) => file.path);
        const videos = files
          .filter((file) => file.mimetype.startsWith('video/'))
          .map((file) => file.path);

        if (images.length > 0) {
          course.thumbnail = images[0];
        }
        if (videos.length > 0) {
          course.introductionVideo = videos[0];
        }
      }
      const response = await addCourses(course, dbRepositoryCourse);
      res.status(200).json({
        status: 'success',
        message:
          'Successfully added new course, course will be published after verification',
        data: response
      });
    }
  );

  const getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    const courses = await getAllCourseU(dbRepositoryCourse)
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved all courses',
      data: courses
    });
  });

  const getIndividualCourse = asyncHandler(async(req:Request,res:Response)=>{
    const courseId:string = req.params.courseId
    const course = await getCourseByIdU(courseId,dbRepositoryCourse)
    res.status(200).json({
      status:'success',
      message:'Successfully retrieved the course',
      data:course
    })
  })

  const getCoursesByInstructor = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const instructorId = req.user?.Id
    const courses = await getCourseByInstructorU(instructorId,dbRepositoryCourse)
    res.status(200).json({
      status:'success',
      message:'Successfully retrieved your courses',
      data:courses
    })
     
  })

  const addLesson = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const instructorId = req.user?.Id
    const courseId = req.params.courseId
    const lesson = req.body
    await addLessonsU(instructorId,courseId,lesson,dbRepositoryCourse)
    res.status(200).json({
      status:'success',
      message:'Successfully added new lesson',
      data:null
    })
  })

  const getLessonsByCourse = asyncHandler(async(req:Request,res:Response)=>{
    const courseId = req.params.courseId
    const lessons = await getLessonsByCourseIdU(courseId,dbRepositoryCourse)
    res.status(200).json({
      status:'success',
      message:'Successfully retrieved lessons based on the course',
      data:lessons
    })
  })

  const addQuiz = asyncHandler(async(req:Request,res:Response)=>{
    const lessonId = req.params.lessonId
    const quiz = req.body
    const courseId = quiz.courseId
    await addQuizU(lessonId,courseId,quiz,dbRepositoryCourse)
    res.status(200).json({
      status:'success',
      message:'Successfully added new quiz',
      data:null
    })
  })

  return {
    addCourse,
    getAllCourses,
    getIndividualCourse,
    getCoursesByInstructor,
    addLesson,
    getLessonsByCourse,
    addQuiz
  };
};

export default courseController;
