import HttpStatusCodes from '../../../../src/constants/HttpStatusCodes';
import { SavedInstructorInterface,InstructorInterface } from '@src/types/instructor/instructorInterface';
import AppError from '../../../../src/utils/appError';
import { InstructorDbInterface } from '@src/app/repositories/instructorDbRepository';
import { AuthServiceInterface } from '@src/app/services/authServicesInterface';

export const instructorRegister = async (
  instructor: InstructorInterface,
  instructorRepository: ReturnType<InstructorDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
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
  const response = await instructorRepository.addInstructor(instructor);
  return response
    ? { status: true, message: 'successfully registered!' }
    : { status: false, message: 'failed to register!' };
};

export const instructorLogin = async (
  email: string,
  password: string,
  instructorRepository: ReturnType<InstructorDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const instructor: SavedInstructorInterface | null =
    await instructorRepository.getInstructorByEmail(email);
    if(!instructor){
      throw new AppError("Instructor doesn't exist, please register",HttpStatusCodes.UNAUTHORIZED)
    }
    const isPasswordCorrect = await authService.comparePassword(password,instructor.password)
    if(!isPasswordCorrect){
      throw new AppError(
        "Sorry, your password is incorrect. Please try again",
        HttpStatusCodes.UNAUTHORIZED
      );
    }
    const payload = {
      instructorId:instructor._id,
      email:instructor.email
    }
    const token = authService.generateToken(payload)
    return token
};
