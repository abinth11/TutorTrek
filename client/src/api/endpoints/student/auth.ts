import { post } from "../../services/student/authServices";
import END_POINTS from "../../../constants/endpoints";

export const loginStudent = (userData: any) => {
  return post(END_POINTS.LOGIN, userData);
};
