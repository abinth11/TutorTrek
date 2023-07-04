import { Request } from "express";

export interface CustomRequest extends Request {
    user?:{Id:string;email:string;role:string};
}