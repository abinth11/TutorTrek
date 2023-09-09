import { NextFunction,Response } from 'express';
import { CustomRequest } from '../../../types/customRequest';
import AppError from '../../../utils/appError';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';

const roleCheckMiddleware = (roleToCheck: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (role === roleToCheck) {
      next();
    } else {
      throw new AppError('Unauthorized role', HttpStatusCodes.UNAUTHORIZED);
    }
  };
};

export default roleCheckMiddleware;