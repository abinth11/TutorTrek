import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createPaymentIntentU,getConfigU } from '../../app/usecases/payment/stripe';
import { PaymentServiceInterface } from '../../app/services/paymentServiceInterface';
import { PaymentServiceImpl } from '../../frameworks/services/paymentService';

const paymentController = (
  paymentServiceInterface: PaymentServiceInterface,
  paymentServiceImpl: PaymentServiceImpl
) => {
  const paymentService = paymentServiceInterface(paymentServiceImpl());

  const getConfig = asyncHandler(async(req:Request,res:Response)=>{
    const config =  getConfigU(paymentService)
    console.log(config)
    res.status(200).json({
      status: 'success',
      message: 'Successfully completed payment',
      data: config
    });
  })

  const createPaymentIntent = asyncHandler(async (req: Request, res: Response) => {
    const paymentInfo: { id: string; amount: number } = req.body;
    const response = await createPaymentIntentU(paymentInfo, paymentService);
    console.log(response);
    const {client_secret} = response
    res.status(200).json({
      status: 'success',
      message: 'Successfully completed payment',
      data: {
        clientSecret:client_secret
      }
    });
  });

  return {
    getConfig,
    createPaymentIntent,
  };
};

export default paymentController;
