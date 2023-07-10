import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { PaymentServiceInterface } from '../../../app/services/paymentServiceInterface';

export const payWithStripeU = async (
  paymentInfo: { id: string; amount: number },
  paymentService: ReturnType<PaymentServiceInterface>
) => {
  if (!paymentInfo) {
    throw new AppError(
      'Please provide valid payment information',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const response = await paymentService.paymentWithStripe(paymentInfo);
  return response;
};
