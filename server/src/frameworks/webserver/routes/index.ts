// import userRouter from './user'
import { Application } from 'express';
import authRouter from './auth';
import adminRouter from './admin';
import { RedisClient } from '../../../app';

const routes = (app: Application, redisClient: RedisClient) => {
  app.use('/api/auth', authRouter());
  app.use('/api/admin', adminRouter());
};

export default routes;

2 + ``;
