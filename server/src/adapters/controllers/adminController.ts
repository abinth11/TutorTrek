import { AdminRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { AdminDbInterface } from '../../app/repositories/adminDbRepository';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllInstructorRequests } from '../../app/usecases/admin/management/instructorManagement';
const adminController = (
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDb
) => {
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());

  //? INSTRUCTOR MANAGEMENT
  const getInstructorRequests = asyncHandler(
    async (req: Request, res: Response) => {
      const response = await getAllInstructorRequests(dbRepositoryAdmin);
      res.json({
        status: 'success',
        message: 'Successfully retrieved all instructor requests',
        data: response,
      });
    }
  );
  return {
    getInstructorRequests,
  };
};

export default adminController;
