import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/errorHandlingResponseInterceptors";
import { InstructorRegisterDataInterface } from "../../types/admin/authInterface";

export const register = async (
  endpoint: string,
  studentData: InstructorRegisterDataInterface
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    studentData
  );
  return response;
};
