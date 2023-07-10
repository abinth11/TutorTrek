import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { PaymentServiceInterface } from '../../../app/services/paymentServiceInterface';

export const createPaymentIntentU = async (
  paymentInfo: { id: string; amount: number },
  paymentService: ReturnType<PaymentServiceInterface>
) => {
  if (!paymentInfo) {
    throw new AppError(
      'Please provide valid payment information',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const response = await paymentService.createPaymentIntent(paymentInfo);
  return response;
};

export const getConfigU = (
  paymentService: ReturnType<PaymentServiceInterface>
) => paymentService.getConfig();
