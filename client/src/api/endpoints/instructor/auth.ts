import END_POINTS from "../../../constants/endpoints";
import { register,login } from "../../services/instructor/authServices";
import { InstructorLoginInfo, InstructorRegisterDataInterface } from "../../types/instructor/authInterface";

export const registerInstructor = (studentData:InstructorRegisterDataInterface)=>{
  return register(END_POINTS.REGISTER_INSTRUCTOR,studentData)
}

export const loginInstructor = (instructorData:InstructorLoginInfo)=>{
  return login(END_POINTS.LOGIN_INSTRUCTOR,instructorData)
}
