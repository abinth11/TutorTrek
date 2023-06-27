import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import configKeys from '../../config';
import { JwtPayload } from '@src/types/custom/common';

export const authService=()=>{

    const hashPassword = async(password:string) =>{
        const salt = await bcrypt.genSalt(10);
        const  hashedPassword = await bcrypt.hash(password,salt)
        return hashedPassword
    }
 
    const comparePassword=(password:string,hashedPassword:string)=>{
       return bcrypt.compare(password,hashedPassword)
    }

    const generateToken=(payload:JwtPayload)=>{
        const token = jwt.sign({payload}, configKeys.JWT_SECRET, {
            expiresIn: "1h",
        });
        return token
    }

    const verifyToken=(token:string)=>{
        return jwt.verify(token, configKeys.JWT_SECRET)
    }

    return {
        comparePassword,
        generateToken,
        verifyToken,
        hashPassword,
    }
}


export type AuthService = typeof authService 

export type AuthServiceReturn = ReturnType<AuthService>