import END_POINTS from "../../../constants/endpoints";
import { register } from "../../services/instructor/authServices";

export const registerInstructor = (studentData:any)=>{
  return register(END_POINTS.REGISTER_INSTRUCTOR,studentData)
}

