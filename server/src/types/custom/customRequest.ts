import { Request } from "express";

export interface CustomRequest extends Request {
    user?:{instructorId:string;email:string};
}