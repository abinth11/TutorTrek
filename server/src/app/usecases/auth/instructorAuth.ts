import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import {
  SavedInstructorInterface,
  InstructorInterface
} from '@src/types/instructorInterface';
import AppError from '../../../utils/appError';
import { InstructorDbInterface } from '../../../app/repositories/instructorDbRepository';
import { AuthServiceInterface } from '../../../app/services/authServicesInterface';
import { RefreshTokenDbInterface } from '../../../app/repositories/refreshTokenDBRepository';
import { UploadedFileInterface } from '@src/types/common';

export const instructorRegister = async (
  instructor: InstructorInterface,
  files: UploadedFileInterface[],
  instructorRepository: ReturnType<InstructorDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  console.log(instructor);
  instructor.certificates = [];
  instructor.profilePic = {
    name: '',
    key: '',
    url: ''
  };
  if (files) {
    files.map((file) => {
      if (file.originalname === 'profilePic') {
        instructor.profilePic.url = file.path;
        instructor.profilePic.name=file.originalname
      } else {
        const certificate = {
          name: file.originalname,
          url: file.path
        };
        instructor.certificates.push(certificate);
      }
    });
  }
  const { password }: { password: string } = instructor;
  instructor.email = instructor?.email?.toLowerCase();
  const isEmailAlreadyRegistered =
    await instructorRepository.getInstructorByEmail(instructor.email);
  if (isEmailAlreadyRegistered) {
    throw new AppError(
      'Instructor with same email already exists..!',
      HttpStatusCodes.CONFLICT
    );
  }
  if (password) {
    instructor.password = await authService.hashPassword(password);
  }
  console.log(instructor)
  const response = await instructorRepository.addInstructor(instructor);
  return response
    ? { status: true, message: 'successfully registered!' }
    : { status: false, message: 'failed to register!' };
};

export const instructorLogin = async (
  email: string,
  password: string,
  instructorRepository: ReturnType<InstructorDbInterface>,
  refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const instructor: SavedInstructorInterface | null =
    await instructorRepository.getInstructorByEmail(email);
  if (!instructor) {
    throw new AppError(
      "Instructor doesn't exist, please register",
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  if (!instructor.isVerified) {
    throw new AppError(
      'Your details is under verification please try again later',
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    instructor.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      'Sorry, your password is incorrect. Please try again',
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  const payload = {
    Id: instructor._id,
    email: instructor.email,
    role: 'instructor'
  };
  await refreshTokenRepository.deleteRefreshToken(instructor._id);
  const accessToken = authService.generateToken(payload);
  const refreshToken = authService.generateRefreshToken(payload);
  const expirationDate =
    authService.decodedTokenAndReturnExpireDate(refreshToken);
  await refreshTokenRepository.saveRefreshToken(
    instructor._id,
    refreshToken,
    expirationDate
  );
  return {
    accessToken,
    refreshToken
  };
};
