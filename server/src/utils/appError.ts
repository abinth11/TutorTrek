import  HttpStatusCodes  from "../constants/HttpStatusCodes";

class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    keyValue: any;
    constructor(message: string, statusCode: HttpStatusCodes) {
      super(message);
      
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export default AppError;