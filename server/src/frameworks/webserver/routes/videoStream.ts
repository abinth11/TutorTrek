import express from 'express';
import videoStreamController from '../../../adapters/controllers/videoStreamController';
import { s3Service } from '../../../frameworks/services/s3CloudService';
import { cloudServiceInterface } from '../../../app/services/cloudServiceInterface';

const videoStreamRouter = () => {
  const router = express.Router();
  const controller = videoStreamController(cloudServiceInterface, s3Service);

  router.get('/stream-video/:videoFileId', controller.streamVideo);

  return router
};
export default videoStreamRouter;
