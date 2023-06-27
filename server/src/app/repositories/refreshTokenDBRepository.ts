import { RefreshTokenRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';

export const refreshTokenDbRepository = (
  repository: ReturnType<RefreshTokenRepositoryMongoDb>
) => {
  const saveRefreshToken = async (
    userId: string,
    token: string,
    expiresAt: string
  ) => await repository.saveRefreshToken(userId, token, expiresAt);

  const deleteRefreshToken = async (token: string) =>
    await repository.deleteRefreshToken(token);

  const findRefreshToken = async (refreshToken:string)=>await repository.findRefreshToken(refreshToken)

  return {
    saveRefreshToken,
    deleteRefreshToken,
    findRefreshToken
  };
};

export type RefreshTokenDbInterface = typeof refreshTokenDbRepository