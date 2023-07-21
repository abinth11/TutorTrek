import { AdminRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { AdminDbInterface } from '../../app/repositories/adminDbRepository';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CourseDbRepositoryInterface } from '../../app/repositories/courseDbRepository';
import { CourseRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { InstructorDbInterface } from '../../app/repositories/instructorDbRepository';
import { InstructorRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { StudentsDbInterface } from '../../app/repositories/studentDbRepository';
import { StudentRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import {
  getDashBoardDetailsU,
  getGraphDetailsU
} from '../../app/usecases/admin/dashBoardData';
import { PaymentInterface } from '../../app/repositories/paymentDbRepository';
import { PaymentImplInterface } from '../../frameworks/database/mongodb/repositories/paymentRepoMongodb';
import { CategoryDbInterface } from '../../app/repositories/categoryDbRepository';
import { CategoryRepoMongodbInterface } from '../../frameworks/database/mongodb/repositories/categoryRepoMongoDb';

const adminController = (
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDb,
  courseDbRepository: CourseDbRepositoryInterface,
  courseDbRepositoryImpl: CourseRepositoryMongoDbInterface,
  instructorDbRepository: InstructorDbInterface,
  instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
  studentDbRepository: StudentsDbInterface,
  studentDbRepositoryImpl: StudentRepositoryMongoDB,
  paymentDbRepository: PaymentInterface,
  paymentDbRepositoryImpl: PaymentImplInterface,
  categoryDbRepository: CategoryDbInterface,
  categoryDbRepositoryImpl: CategoryRepoMongodbInterface
) => {
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
  const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());
  const dbRepositoryInstructor = instructorDbRepository(
    instructorDbRepositoryImpl()
  );
  const dbRepositoryStudent = studentDbRepository(studentDbRepositoryImpl());
  const dbRepositoryPayment = paymentDbRepository(paymentDbRepositoryImpl());
  const dbRepositoryCategory = categoryDbRepository(categoryDbRepositoryImpl());

  const getDashBoardDetails = asyncHandler(
    async (req: Request, res: Response) => {
      const response = await getDashBoardDetailsU(
        dbRepositoryCourse,
        dbRepositoryInstructor,
        dbRepositoryStudent,
        dbRepositoryPayment
      );

      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved dashboard details',
        data: response
      });
    }
  );

  const getGraphDetails = asyncHandler(async (req: Request, res: Response) => {
    const response = await getGraphDetailsU(
      dbRepositoryCourse,
      dbRepositoryCategory,
      dbRepositoryPayment
    );
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved graph details',
      data: response
    });
  });

  return {
    getDashBoardDetails,
    getGraphDetails
  };
};

export default adminController;
