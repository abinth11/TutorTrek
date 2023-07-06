import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { RefreshTokenDbInterface } from '../../repositories/refreshTokenDBRepository';
import { AuthServiceInterface } from '../../services/authServicesInterface';

export const refreshTokenU = async (
  refreshToken: string,
  refreshDbRepository: ReturnType<RefreshTokenDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  if (!refreshToken) {
    throw new AppError('Refresh token not found', HttpStatusCodes.NOT_FOUND);
  }
  const existingToken = await refreshDbRepository.findRefreshToken(
    refreshToken
  );

  if (!existingToken) {
    throw new AppError(
      'Refresh token not exists',
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  const expirationDate = new Date(existingToken.expiresAt);
  if (new Date() > expirationDate) {
    throw new AppError(
      'Refresh token has expired',
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  const decoded = authService.decodeToken(existingToken.token)
  const payload = {
    Id: '',
    email: '',
    role: ''
  };
  if(decoded){
    payload.Id=decoded?.payload?.Id
    payload.email=decoded.payload?.email
    payload.role=decoded?.payload?.role
  }
  const accessToken = authService.generateToken(payload);

  return accessToken;
};
