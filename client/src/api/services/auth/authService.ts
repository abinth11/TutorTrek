import CONFIG_KEYS from "../../../config";
import { AdminLoginInfo } from "../../types/admin/authInterface";
import authInstanceAxios from "../../middlewares/interceptor";

export const login = async (
  endpoint: string,
  adminLoginInfo: AdminLoginInfo
) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    adminLoginInfo
  );
  return response;
};
