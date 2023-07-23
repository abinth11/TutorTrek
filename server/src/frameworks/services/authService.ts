import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import configKeys from '../../config';
import { JwtPayload } from 'jsonwebtoken';
export const authService = () => {
  const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };

  const generateToken = (payload: JwtPayload) => {
    const token = jwt.sign({ payload }, configKeys.JWT_SECRET, {
      expiresIn: '3h'
    });
    return token;
  };

  const generateRefreshToken = (payload: JwtPayload) => {
    const token = jwt.sign({ payload }, configKeys.JWT_REFRESH_SECRET, {
      expiresIn: '7d'
    });
    return token;
  };

  const verifyToken = (token: string) => {
    return jwt.verify(token, configKeys.JWT_SECRET);
  }; 

  const decodeToken = (token:string)=>{
    const decodedToken: jwt.JwtPayload | null = jwt.decode(token) as jwt.JwtPayload | null;
    return decodedToken
  }

  const decodedTokenAndReturnExpireDate = (token: string): number => {
    const decodedToken: any = jwt.decode(token);
    let expirationTimestamp: number;
    if (decodedToken && decodedToken.exp) {
      expirationTimestamp = decodedToken.exp * 1000;
    } else {
      expirationTimestamp = 0;
    }
    return expirationTimestamp;
  };
  

  return {
    comparePassword,
    generateToken,
    generateRefreshToken,
    verifyToken,
    hashPassword,
    decodedTokenAndReturnExpireDate,
    decodeToken
  };
};

export type AuthService = typeof authService;

export type AuthServiceReturn = ReturnType<AuthService>;
