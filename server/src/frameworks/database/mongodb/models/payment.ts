import mongoose, { Schema, Document } from 'mongoose';

interface PaymentI extends Document {
  paymentId: string;
  studentId:string;
  courseId: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  createdAt: Date;
}

const paymentSchema: Schema<PaymentI> = new Schema({
  paymentId: { type: String, required: true },
  studentId:{ type: String, required: true },
  courseId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  payment_method: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});

const Payment = mongoose.model<PaymentI>(
  'Payment',
  paymentSchema,
  'payment'
);

export default Payment;
