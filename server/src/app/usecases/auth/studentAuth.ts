import HttpStatusCodes from "../../../constants/HttpStatusCodes";
import { StudentInterface } from "../../../types/student/studentInterface";
import AppError from "../../../utils/appError";
import { StudentsDbInterface } from "../../repositories/studentDbRepository";
import { AuthServiceInterface } from "../../services/authServicesInterface";
import { StudentRegisterInterface } from "@src/types/student/studentRegisterInterface";

export const studentRegister = async (
  student: StudentRegisterInterface,
  studentRepository: ReturnType<StudentsDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  student.email = student?.email?.toLowerCase();
  const isEmailAlreadyRegistered = await studentRepository.getStudentByEmail(student.email)
  if(isEmailAlreadyRegistered){
    throw new AppError("User with same email already exists...!", HttpStatusCodes.CONFLICT);
  }
  student.password = await authService.hashPassword(student.password)
  const { _id: studentId,email } = await studentRepository.addStudent(student)
  const accessToken = authService.generateToken({studentId,email});
  return accessToken;
}

export const studentLogin = async (
  email: string,
  password: string,
  studentRepository: ReturnType<StudentsDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const student: StudentInterface | null =
    await studentRepository.getStudentByEmail(email);
  if (!student) {
    throw new AppError("this user doesn't exist", HttpStatusCodes.UNAUTHORIZED);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    student.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      "Sorry, your password is incorrect. Please try again",
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  const payload = {
    studentId:student._id,
    email:student.email
  }
  const token = authService.generateToken(payload);
  return token;
};
