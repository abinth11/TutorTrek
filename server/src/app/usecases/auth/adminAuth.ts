import { AdminDbInterface } from '@src/app/repositories/adminDbRepository';
import { AuthServiceInterface } from '@src/app/services/authServicesInterface';
import HttpStatusCodes from '../../../../src/constants/HttpStatusCodes';
import { AdminSavedDbInterface } from '@src/types/admin/adminAuthInterface';
import AppError from '../../../../src/utils/appError';
export const adminLogin = async (
  email: string,
  password: string,
  adminRepository: ReturnType<AdminDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const admin: AdminSavedDbInterface | null =
    await adminRepository.getAdminByEmail(email);
  if (!admin) {
    throw new AppError('Admin not found..!', HttpStatusCodes.UNAUTHORIZED);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    admin.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      'Sorry, your password is incorrect. Please try again',
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  const payload = {
    adminId: admin._id,
    email: admin.email,
  };

  const token = authService.generateToken(payload);
  return token;
};
