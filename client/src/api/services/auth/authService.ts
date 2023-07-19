import CONSTANTS_COMMON from "../../../constants/common";
import { AdminLoginInfo } from "../../types/admin/authInterface";
import authInstanceAxios from "../../middlewares/authInterceptor";

export const login = async (
  endpoint: string,
  adminLoginInfo: AdminLoginInfo
) => {
  const response = await authInstanceAxios.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    adminLoginInfo
  );
  return response;
};
