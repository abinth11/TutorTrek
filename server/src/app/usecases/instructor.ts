import { InstructorDbInterface } from '../repositories/instructorDbRepository';
import AppError from '../../utils/appError';
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import { AuthServiceInterface } from '../services/authServicesInterface';
import { SavedInstructorInterface } from '@src/types/instructorInterface';
import { CloudServiceInterface } from '../services/cloudServiceInterface';
import { CourseDbRepositoryInterface } from '../repositories/courseDbRepository';

export const changePasswordU = async (
  id: string | undefined,
  password: { currentPassword: string; newPassword: string },
  authService: ReturnType<AuthServiceInterface>,
  instructorDbRepository: ReturnType<InstructorDbInterface>
) => {
  if (!id) {
    throw new AppError('Invalid Instructor', HttpStatusCodes.BAD_REQUEST);
  }
  if (!password.currentPassword) {
    throw new AppError(
      'Please provide current password',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const instructor: SavedInstructorInterface | null =
    await instructorDbRepository.getInstructorById(id);
  if (!instructor) {
    throw new AppError('Unauthorized user', HttpStatusCodes.NOT_FOUND);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password.currentPassword,
    instructor?.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      'Sorry, your current password is incorrect.',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (!password.newPassword) {
    throw new AppError(
      'new password cannot be empty',
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  const hashedPassword = await authService.hashPassword(password.newPassword);
  await instructorDbRepository.changePassword(id, hashedPassword);
};

export const updateProfileU = async (
  id: string | undefined,
  instructorInfo: SavedInstructorInterface,
  profilePic: Express.Multer.File,
  cloudService: ReturnType<CloudServiceInterface>,
  instructorDbRepository: ReturnType<InstructorDbInterface>
) => {
  if (!id) {
    throw new AppError('Invalid instructor', HttpStatusCodes.BAD_REQUEST);
  }
  if (Object.keys(instructorInfo).length === 0) {
    throw new AppError(
      'At least update a single field',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (profilePic) {
    const response = await cloudService.upload(profilePic);
    instructorInfo.profilePic = response;
  }
  await instructorDbRepository.updateProfile(id, instructorInfo);
};

export const getStudentsForInstructorsU = async (
  instructorId: string|undefined,
  cloudService: ReturnType<CloudServiceInterface>,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!instructorId) {
    throw new AppError(
      'Please give a instructor id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const students = await courseDbRepository.getStudentsByCourseForInstructor(
    instructorId
  );
  await Promise.all(
    students.map(async (student) => {
      if (student.profilePic.key) {
        student.profileUrl = ""
        student.profileUrl = await cloudService.getFile(student.profilePic.key);
      }
    })
  );
  return students;
};
