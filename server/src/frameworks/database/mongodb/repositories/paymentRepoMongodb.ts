import Payment from '../models/payment';
import { PaymentInfo } from '@src/types/payment';

export const paymentRepositoryMongodb = () => {
  const savePaymentInfo = async (paymentInfo: PaymentInfo) => {
    const newPaymentInfo = new Payment(paymentInfo);
    const response = await newPaymentInfo.save();
    return response;
  };

  const getMonthlyRevenue = async () => {
    const currentMonth = new Date().getMonth() + 1; // Get the current month (1-based index)
    const pipeline = [
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$createdAt' }, currentMonth]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ];
    const revenue: Array<{ _id: null; totalAmount: number }> =
      await Payment.aggregate(pipeline);
      
    return revenue[0].totalAmount;
  };

  return {
    savePaymentInfo,
    getMonthlyRevenue
  };
};

export type PaymentImplInterface = typeof paymentRepositoryMongodb;
