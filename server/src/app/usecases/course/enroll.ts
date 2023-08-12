import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { PaymentInterface } from '@src/app/repositories/paymentDbRepository';
import { PaymentInfo } from '@src/types/payment';

export const enrollStudentU = async (
  courseId: string,
  studentId: string,
  paymentInfo: any,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>,
  paymentDbRepository: ReturnType<PaymentInterface>
) => {
  if (!courseId) {
    throw new AppError(
      'Please provide course details',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (!studentId) {
    throw new AppError(
      'Please provide valid student details',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const course = await courseDbRepository.getCourseById(courseId);
  if (course?.isPaid) {
    const payment = {
      paymentId: paymentInfo.id,
      courseId: courseId,
      studentId: studentId,
      amount: paymentInfo.amount / 100,
      currency: paymentInfo.currency,
      payment_method: paymentInfo.payment_method,
      status: paymentInfo.status
    };
    await Promise.all([
      courseDbRepository.enrollStudent(courseId, studentId),
      paymentDbRepository.savePayment(payment)
    ]);
  } else {
    await courseDbRepository.enrollStudent(courseId, studentId);
  }
};
