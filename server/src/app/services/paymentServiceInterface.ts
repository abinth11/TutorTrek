import { PaymentServiceImpl } from '../../frameworks/services/paymentService';

export const paymentServiceInterface = (service: ReturnType<PaymentServiceImpl>) => {
  const paymentWithStripe = async (paymentInfo: {
    id: string;
    amount: number;
  }) => await service.payUsingStripe(paymentInfo);
  return {
    paymentWithStripe
  };
};

export type PaymentServiceInterface = typeof paymentServiceInterface;
