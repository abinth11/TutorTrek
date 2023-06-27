import HttpStatusCodes from '../../constants/HttpStatusCodes';
import AppError from '../../utils/appError';
import { RefreshTokenDbInterface } from '../repositories/refreshTokenDBRepository';
import { AuthServiceInterface } from '../services/authServicesInterface';

export const saveRefreshToken = () => {};

export const deleteRefreshToken = () => {};

export const refreshTokenU = async (
  refreshToken: string,
  refreshDbRepository: ReturnType<RefreshTokenDbInterface>,
  authService:ReturnType<AuthServiceInterface>
) => {
  if (!refreshToken) {
    throw new AppError('Refresh token not found', HttpStatusCodes.NOT_FOUND);
  }
  const existingToken = await refreshDbRepository.findRefreshToken(
    refreshToken
  );

  if (!existingToken) {
    throw new AppError('Refresh token not found', HttpStatusCodes.UNAUTHORIZED);
  }
  if (new Date() > existingToken.expiresAt) {
    throw new AppError(
      'Refresh token has expired',
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  const payload = {
    Id:'id',
    email:'email',
    role:'role'
  }

  const accessToken = authService.generateToken(payload)

  return accessToken

};
