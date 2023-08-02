import END_POINTS from "../../../constants/endpoints";
import { register,login } from "../../services/auth/instructor-auth-services";
import { InstructorLoginInfo, InstructorRegisterDataInterface } from "../../types/instructor/auth-interface";

export const registerInstructor = (instructorData:FormData)=>{
  return register(END_POINTS.REGISTER_INSTRUCTOR,instructorData)
}

export const loginInstructor = (instructorData:InstructorLoginInfo)=>{
  return login(END_POINTS.LOGIN_INSTRUCTOR,instructorData)
}
