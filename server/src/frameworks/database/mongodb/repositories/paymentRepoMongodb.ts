import Payment from '../models/payment';
import { PaymentInfo } from '@src/types/payment';

export const paymentRepositoryMongodb = () => {
  const savePaymentInfo = async (paymentInfo: PaymentInfo) => {
    const newPaymentInfo = new Payment(paymentInfo);
    const response = await newPaymentInfo.save();
    return response;
  };

  const getMonthlyRevenue = async () => {
    const currentMonth = new Date().getMonth() + 1;
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

  const getRevenueForEachMonth = async () => {
    const revenueByMonth = await Payment.aggregate([
      {
        $group: {
          _id: {
            $month: '$createdAt'
          },
          totalRevenue: { $sum: '$amount' } 
        }
      },
      {
        $project: {
          month: '$_id',
          totalRevenue: 1,
          _id: 0
        }
      },
      {
        $sort: {
          month: 1
        }
      }
    ]);
    return revenueByMonth;
  };

  const getCoursesEnrolledPerMonth = async () => {
    const enrolled = await Payment.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          month: '$_id',
          count: 1,
          _id: 0
        }
      },
      {
        $sort: {
          month: 1
        }
      }
    ]);
    return enrolled
  };

  return {
    savePaymentInfo,
    getMonthlyRevenue,
    getRevenueForEachMonth,
    getCoursesEnrolledPerMonth
  };
};

export type PaymentImplInterface = typeof paymentRepositoryMongodb;
