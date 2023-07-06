import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CloudServiceInterface } from '../../app/services/cloudServiceInterface';
import { CloudServiceImpl } from '../../frameworks/services/s3CloudService';
import { streamVideoU } from '../../app/usecases/videoStream/stream';

const videoStreamController = (
  cloudServiceInterface: CloudServiceInterface,
  cloudServiceImpl: CloudServiceImpl
) => {
  const cloudService = cloudServiceInterface(cloudServiceImpl());

  const streamVideo = asyncHandler(async (req: Request, res: Response) => {
    const videoFileId = req.params.videoFileId;
    const videoUrl = await streamVideoU(videoFileId, cloudService);
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved video url',
      data: videoUrl
    });
     
  });
  return {
    streamVideo
  };
};

export default videoStreamController;
