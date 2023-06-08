import {  AuthServiceReturn } from "../../frameworks/services/authService";

export const authServiceInterface=(service:AuthServiceReturn) => {
  
    const comparePassword = (password:string, hashedPassword:string) =>
      service.comparePassword(password, hashedPassword);
  
    const verifyPassword = (token:string) => service.verifyToken(token)
  
    const generateToken = (payload:string) => service.generateToken(payload);
  
    return {
      comparePassword,
      verifyPassword,
      generateToken
    };
}

export type AuthServiceInterface = typeof authServiceInterface