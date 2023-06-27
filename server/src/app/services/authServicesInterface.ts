import { AuthServiceReturn } from '../../frameworks/services/authService';
import { JwtPayload } from '@src/types/custom/common';

export const authServiceInterface = (service: AuthServiceReturn) => {
  const hashPassword = (password: string) => service.hashPassword(password);

  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

  const verifyPassword = (token: string) => service.verifyToken(token);

  const generateToken = (payload: JwtPayload) => service.generateToken(payload);

  const generateRefreshToken = (payload: JwtPayload) =>
    service.generateRefreshToken(payload);

  const decodedTokenAndReturnExpireDate = (token: string) =>
    service.decodedTokenAndReturnExpireDate(token);

  return {
    hashPassword,
    comparePassword,
    verifyPassword,
    generateToken,
    generateRefreshToken,
    decodedTokenAndReturnExpireDate
  };
};

export type AuthServiceInterface = typeof authServiceInterface;
