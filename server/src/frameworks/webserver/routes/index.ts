import { Application } from 'express';
import authRouter from './auth';
import adminRouter from './admin';
import courseRouter from './course';
import instructorRouter from './instructor';
import { RedisClient } from '../../../app';
import jwtAuthMiddleware from '../middlewares/userAuth';
import { adminRoleCheckMiddleware } from '../middlewares/roleCheckMiddleware';
import videoStreamRouter from './videoStream';
import refreshRouter from './refresh';

const routes = (app: Application, redisClient: RedisClient) => {
  app.use('/api/auth', authRouter());
  app.use('/api/all/refresh-token',refreshRouter())
  app.use('/api/admin',jwtAuthMiddleware,adminRoleCheckMiddleware,adminRouter());
  app.use('/api/courses',jwtAuthMiddleware,courseRouter())
  app.use('/api/video-streaming',videoStreamRouter())
  app.use('/api/instructors',instructorRouter())

};

export default routes;
