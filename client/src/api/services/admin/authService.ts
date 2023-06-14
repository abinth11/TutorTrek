import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/errorHandlingResponseInterceptors";
import { AdminLoginInfo } from "../../types/admin/authInterface";

export const login = async (
  endpoint: string,
  adminLoginInfo: AdminLoginInfo
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    adminLoginInfo
  );
  return response;
};
