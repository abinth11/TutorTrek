import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CloudServiceInterface } from '../../../app/services/cloudServiceInterface';

export const streamVideoU = async (
  fileKey: string,
  cloudService: ReturnType<CloudServiceInterface>
) => {
  if (!fileKey) {
    throw new AppError('File key not found', HttpStatusCodes.BAD_REQUEST);
  }
  const stream = await cloudService.getCloudFrontUrl(fileKey);
  return stream;
};
