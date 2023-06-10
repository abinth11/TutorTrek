import { login,register } from "../../services/student/authServices";
import END_POINTS from "../../../constants/endpoints";

export const loginStudent = (studentData: any) => {
  return login(END_POINTS.LOGIN, studentData);
};

export const registerStudent = (studentData:any)=>{
  return register(END_POINTS.REGISTER,studentData)
}
