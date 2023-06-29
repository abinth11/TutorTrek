// Admin Role Middleware
import { CustomRequest } from '../../../types/custom/customRequest';
import { NextFunction,Response } from 'express';
import AppError from '../../../utils/appError';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
export const adminRoleCheckMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = req.user?.role;
  if (role === 'admin') {
    // User has the admin role, allow access
    next();
  } else {
    // User does not have the admin role, deny access
    throw new AppError('Unauthorized role', HttpStatusCodes.UNAUTHORIZED);
  }
};

// Instructor Role Middleware
export const instructorRoleCheckMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = req.user?.role


  if (role === 'instructor') {
    // User has the instructor role, allow access
    next();
  } else {
    // User does not have the instructor role, deny access
    throw new AppError('Unauthorized role, you are not a instructor', HttpStatusCodes.UNAUTHORIZED);
  }
};

export const studentRoleCheckMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = req.user?.role;


  if (role === 'instructor') {
    // User has the instructor role, allow access
    next();
  } else {
    // User does not have the instructor role, deny access
    throw new AppError('Unauthorized role', HttpStatusCodes.UNAUTHORIZED);
  }
};
