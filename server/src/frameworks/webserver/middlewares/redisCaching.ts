import { NextFunction, Request, Response } from "express";
import { RedisClient } from "../../../app";

export function cachingMiddleware(redisClient:RedisClient, key:string) {
    return async function (req:Request, res:Response, next:NextFunction) {
      // const params = req.params.id;
      const data =await redisClient.get(key)
      if(!data){
        return next()
      }else{
        res.json(JSON.parse(data))
      }
    };
}



