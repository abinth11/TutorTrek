import mongoose from 'mongoose';
import RefreshToken from '../models/token';

export const refreshTokenRepositoryMongoDB = () => {
  const saveRefreshToken = async (
    userId: string,
    token: string,
    expiresAt: number
  ) => {
    const refreshToken = new RefreshToken({
      userId,
      token,
      expiresAt
    });
    await refreshToken.save();
  };
  const deleteRefreshToken = async (id: string) => {
    await RefreshToken.deleteOne({ userId:new mongoose.Types.ObjectId(id) });
  };

  const findRefreshToken = async (refreshToken: string) => {
    const convertedToken = refreshToken.split(' ')[1]
    const token = await RefreshToken.findOne({ token: convertedToken });
    return token;
  };

  return {
    saveRefreshToken,
    deleteRefreshToken,
    findRefreshToken
  };
};

export type RefreshTokenRepositoryMongoDb =
  typeof refreshTokenRepositoryMongoDB;
