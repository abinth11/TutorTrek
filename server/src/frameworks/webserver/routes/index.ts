// import userRouter from './user'
import { Application } from 'express';
import authRouter from './auth';
import { RedisClient } from '../../../app';


const routes = (app:Application,redisClient:RedisClient)=>{
  app.use('/api/auth', authRouter());
}

export default routes

2
+``