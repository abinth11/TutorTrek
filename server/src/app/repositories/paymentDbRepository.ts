import { PaymentImplInterface } from '@src/frameworks/database/mongodb/repositories/paymentRepoMongodb';
import { PaymentInfo } from '@src/types/payment';

export const paymentInterface = (
  repository: ReturnType<PaymentImplInterface>
) => {
  const savePayment = async (paymentInfo: PaymentInfo) =>
    await repository.savePaymentInfo(paymentInfo);

  const getMonthlyRevenue = async () => await repository.getMonthlyRevenue();

  const getRevenueForEachMonth = async ()=> await repository.getRevenueForEachMonth()

  const getCoursesEnrolledPerMonth = async ()=> await repository.getCoursesEnrolledPerMonth()

  return {
    savePayment,
    getMonthlyRevenue,
    getRevenueForEachMonth,
    getCoursesEnrolledPerMonth
  };
};

export type PaymentInterface = typeof paymentInterface;
