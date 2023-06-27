import RefreshToken from '../models/token';

export const refreshTokenRepositoryMongoDB = () => {
  const saveRefreshToken = async (
    userId: string,
    token: string,
    expiresAt: string
  ) => {
    const refreshToken = new RefreshToken({
      userId,
      token,
      expiresAt
    });
    await refreshToken.save();
  };
  const deleteRefreshToken = async (refreshToken: string) => {
    await RefreshToken.deleteOne({ token: refreshToken });
  };

  const findRefreshToken = async (refreshToken:string)=>{
    const token = await RefreshToken.findOne({token:refreshToken})
    return token;
  }

  return {
    saveRefreshToken,
    deleteRefreshToken,
    findRefreshToken
  };
};

export type RefreshTokenRepositoryMongoDb =
  typeof refreshTokenRepositoryMongoDB;
