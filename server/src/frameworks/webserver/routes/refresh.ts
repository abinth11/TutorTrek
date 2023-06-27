import express from 'express';
import refreshTokenController from '../../../adapters/controllers/refreshTokenController';
import { refreshTokenDbRepository } from '../../../app/repositories/refreshTokenDBRepository';
import { refreshTokenRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { authService } from '../../../frameworks/services/authService';
import { authServiceInterface } from '../../../app/services/authServicesInterface';

const refreshRouter = () => {
  const router = express.Router();
  const controller = refreshTokenController(
    authServiceInterface,
    authService,
    refreshTokenDbRepository,
    refreshTokenRepositoryMongoDB
  );
  router.post('/refresh',controller.refreshToken)
  return router
};
export default refreshRouter
