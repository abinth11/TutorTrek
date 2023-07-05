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
    const ReadableStream = await streamVideoU(videoFileId, cloudService);
    console.log(ReadableStream);
    // Set the appropriate headers for video streaming
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `inline; filename=${videoFileId}`);
    res.status(206); // Set the status code to 206

    // Pipe the video stream to the response object
    ReadableStream.pipe(res);
  });
  return {
    streamVideo
  };
};

export default videoStreamController;
