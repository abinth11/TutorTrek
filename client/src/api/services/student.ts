import api from "../middlewares/protected-interceptor";
import { PasswordInfo} from "../types/student/student";
import CONFIG_KEYS from "../../config";

export const changePasswordService = async (
  endpoint: string,
  passwordInfo: PasswordInfo
) => {
  const response = await api.patch(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    passwordInfo
  );
  return response;    
};

export const updateProfileService = async (
  endpoint: string,
  profileInfo: FormData
) => {
  const response = await api.put(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    profileInfo
  );
  return response;
};

export const getStudentDetailsService = async (endpoint: string) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};


