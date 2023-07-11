export interface PaymentInfo {
    id: string;
    courseId:string;
    paymentId?:string;
    object: string;
    amount: number;
    amount_details: {
      // Specify the structure of amount_details if needed
    };
    automatic_payment_methods: {
      // Specify the structure of automatic_payment_methods if needed
    };
    canceled_at: string | null;
    cancellation_reason: string | null;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    created: number;
    currency: string;
    description: string | null;
    last_payment_error: string | null;
    livemode: boolean;
    next_action: string | null;
    payment_method: string;
    payment_method_types: string[];
    processing: string | null;
    receipt_email: string | null;
    setup_future_usage: string | null;
    shipping: string | null;
    source: string | null;
    status: string;
  }
  