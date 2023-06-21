import { Application } from 'express';
import authRouter from './auth';
import adminRouter from './admin';
import courseRouter from './course';
import { RedisClient } from '../../../app';
import jwtAuthMiddleware from '../middlewares/userAuth';

const routes = (app: Application, redisClient: RedisClient) => {
  app.use('/api/auth', authRouter());
  app.use('/api/admin',jwtAuthMiddleware, adminRouter());
  app.use('/api/courses',jwtAuthMiddleware,courseRouter)
};

export default routes;
