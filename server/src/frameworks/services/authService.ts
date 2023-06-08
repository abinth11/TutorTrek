import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import configKeys from '../../config';

export const authService=()=>{

    const comparePassword=(password:string,hashedPassword:string)=>{
       return bcrypt.compare(password,hashedPassword)
    }

    const generateToken=(payload:string)=>{
        const token = jwt.sign({payload}, configKeys.JWT_SECRET, {
            expiresIn: "5d",
        });
        return token
    }

    const verifyToken=(token:string)=>{
        return jwt.verify(token, configKeys.JWT_SECRET)
    }

    return {
        comparePassword,
        generateToken,
        verifyToken
    }
}


export type AuthService = typeof authService 

export type AuthServiceReturn = ReturnType<AuthService>