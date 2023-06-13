import HttpStatusCodes from "../../../../src/constants/HttpStatusCodes"
import { InstructorInterface } from "@src/types/instructor/instructorInterface";
import AppError from "../../../../src/utils/appError"
import { InstructorDbInterface } from "@src/app/repositories/instructorDbRepository";
import { AuthServiceInterface } from "@src/app/services/authServicesInterface";

export const instructorRegister = async (
  instructor: InstructorInterface,
  instructorRepository: ReturnType<InstructorDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  console.log(instructor)
  const { password }: { password: string } = instructor;
  instructor.email = instructor?.email?.toLowerCase();
  const isEmailAlreadyRegistered =
    await instructorRepository.getInstructorByEmail(instructor.email);
  if (isEmailAlreadyRegistered) {
    throw new AppError(
      "Instructor with same email already exists..!",
      HttpStatusCodes.CONFLICT
    );
  }
  if (password) {
    instructor.password = await authService.hashPassword(password);
  }
  const response = await instructorRepository.addInstructor(instructor);
  return response
    ? { status: true, message: "successfully registered!" }
    : { status: false, message: "failed to register!" };
};
