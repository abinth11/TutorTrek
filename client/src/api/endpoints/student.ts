import {
  changePasswordService,
  updateProfileService,
  getStudentDetailsService,
} from "../services/student";
import { PasswordInfo } from "../types/student/student";
import END_POINTS from "../../constants/endpoints";

export const changePassword = (passwordInfo: PasswordInfo) => {
  return changePasswordService(END_POINTS.CHANGE_PASSWORD, passwordInfo);
};

export const updateProfile = (profileInfo: FormData) => {
  return updateProfileService(END_POINTS.UPDATE_PROFILE, profileInfo);
};

export const getStudentDetails = () => {
  return getStudentDetailsService(END_POINTS.GET_STUDENT_DETAILS);
};


