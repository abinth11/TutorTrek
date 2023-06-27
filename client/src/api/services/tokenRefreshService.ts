import api from "../middlewares/interceptors";
import CONSTANTS_COMMON from "../../constants/common";

export const refreshTokenService = async (
  endpoint: string,
  refreshToken: string
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    {
      refreshToken:`Bearer ${refreshToken}`
    }
  );
  return response.data.accessToken
};

