export interface PaymentInfo {
    courseId:string;
    studentId:string;
    paymentId?:string;
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
  }
  