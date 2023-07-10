import express from 'express';
import { paymentService } from '../../../frameworks/services/paymentService';
import { paymentServiceInterface } from '../../../app/services/paymentServiceInterface';
import paymentController from '../../../adapters/controllers/paymentController';

const paymentRouter = () => {
  const router = express.Router();
  const controller = paymentController(paymentServiceInterface, paymentService);

  router.post('/pay-with-stripe', controller.payWithStripe);
  return router;
};

export default paymentRouter;
