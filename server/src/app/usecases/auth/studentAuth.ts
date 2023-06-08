import HttpStatusCodes from "../../../constants/HttpStatusCodes";
import { StudentInterface } from "../../../types/student/studentInterface";
import AppError from "../../../utils/appError";
import { StudentsDbInterface } from "../../repositories/studentDbRepository";
import { AuthServiceInterface } from "../../services/authServicesInterface";

export const studentLogin = async (
  email: string,
  password: string,
  studentRepository: ReturnType<StudentsDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user: StudentInterface | null = await studentRepository.getStudentByEmail(email);
  if (!user) {
    throw new AppError("this user doesn't exist", HttpStatusCodes.UNAUTHORIZED);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      "Sorry, your password is incorrect. Please try again",
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  const token = authService.generateToken(user._id.toString());
  return token;
};
