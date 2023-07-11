import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createPaymentIntentU,
  getConfigU
} from '../../app/usecases/payment/stripe';
import { PaymentServiceInterface } from '../../app/services/paymentServiceInterface';
import { PaymentServiceImpl } from '../../frameworks/services/paymentService';
import { CourseDbRepositoryInterface } from '@src/app/repositories/courseDbRepository';
import { CourseRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/courseReposMongoDb';

const paymentController = (
  paymentServiceInterface: PaymentServiceInterface,
  paymentServiceImpl: PaymentServiceImpl,
  courseDbInterface: CourseDbRepositoryInterface,
  courseDbImpl: CourseRepositoryMongoDbInterface
) => {
  const paymentService = paymentServiceInterface(paymentServiceImpl());
  const dbRepositoryCourse = courseDbInterface(courseDbImpl());

  const getConfig = asyncHandler(async (req: Request, res: Response) => {
    const config = getConfigU(paymentService);
    res.status(200).json({
      status: 'success',
      message: 'Successfully completed payment',
      data: config
    });
  });

  const createPaymentIntent = asyncHandler(
    async (req: Request, res: Response) => {
      const { courseId }: { courseId: string } = req.body;
      const response = await createPaymentIntentU(
        courseId,
        dbRepositoryCourse,
        paymentService
      );
      const { client_secret } = response;
      res.status(200).json({
        status: 'success',
        message: 'Successfully completed payment',
        data: {
          clientSecret: client_secret
        }
      });
    }
  );

  return {
    getConfig,
    createPaymentIntent
  };
};

export default paymentController;
