import { NextFunction, Request, Response } from "express";
import { RedisClient } from "../../../app";

export function cachingMiddleware(redisClient:RedisClient, key?:string) {
    return async function (req:Request, res:Response, next:NextFunction) {
      const { search, filter } = req.query as { search: string; filter: string };
      const searchKey = search?search:filter
      const data =await redisClient.get(searchKey??key)   
      if(!data){
        return next()
      }else{
        res.json({data:JSON.parse(data)})   
      }
    };
}



