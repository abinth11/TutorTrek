import { login,register,googleLoginStudent } from "../../services/auth/student-auth-services";
import END_POINTS from "../../../constants/endpoints";

export const loginStudent = (studentData: any) => {
  return login(END_POINTS.LOGIN_STUDENT, studentData);
};

export const registerStudent = (studentData:any)=>{
  return register(END_POINTS.REGISTER_STUDENT,studentData)
}

export const googleLogin = (credential:string) =>{
  return googleLoginStudent(END_POINTS.GOOGLE_LOGIN_STUDENT,credential)

}
