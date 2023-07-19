import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import CONSTANTS_COMMON from "../../constants/common";
import CustomApiError from "../../utils/CustomApiError";
import { refreshTokenApi } from "../endpoints/auth/tokenRefresh";
const api: AxiosInstance = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("accessToken");
    if (tokenString) {
      const token = JSON.parse(tokenString);
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the response status is 401 (unauthorized) and it's not a retry request
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokenString = localStorage.getItem("refreshToken");
      let token;
      if (tokenString) {
        token = JSON.parse(tokenString);
      }
      try {
        const newAccessToken = await refreshTokenApi(token.refreshToken);
        localStorage.setItem(
          'accessToken',
          JSON.stringify({
              accessToken:newAccessToken,
          })
        )
        return api(originalRequest);
      } catch (error) {
        // Handle token refresh failure or other errors
        // You can redirect to a login page, clear user data, etc.
        // window.location.href = '/'
        
        throw new CustomApiError("Something went wrong",error)
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { data, status } = error.response;

      if (status === 400) {
        throw new CustomApiError("Bad request", data);
      } else if (status === 401) {
        throw new CustomApiError("Unauthorized", data);
      } else if (status === 404) {
        throw new CustomApiError("Not Found", data);
      } else if (status === 409) {
        throw new CustomApiError("Conflict", data);
      } else {
        throw new CustomApiError(`Request failed with status ${status}`, data);
      }
    }
     else if (error.request) {
      throw new CustomApiError(`No response received`,error.request)
    }
     else {
      console.log("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
