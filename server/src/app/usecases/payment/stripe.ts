import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { PaymentServiceInterface } from '../../../app/services/paymentServiceInterface';
import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';

export const createPaymentIntentU = async (
  courseId:string,
  courseDbRepository:ReturnType<CourseDbRepositoryInterface>,
  paymentService: ReturnType<PaymentServiceInterface>
) => {
  if (!courseId) {
    throw new AppError(
      'Please provide valid payment information',
      HttpStatusCodes.BAD_REQUEST
    );
  }

  const amount =  await courseDbRepository.getAmountByCourseId(courseId)
  let price:number;
  if(amount?.price){
    price=amount?.price
  }else {
    throw new AppError(
      'There is something wrong with the course',
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  const response = await paymentService.createPaymentIntent(price);
  return response;
};

export const getConfigU = (
  paymentService: ReturnType<PaymentServiceInterface>
) => paymentService.getConfig();
