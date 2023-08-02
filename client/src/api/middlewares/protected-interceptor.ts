import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import CustomApiError from "../../utils/CustomApiError";
import CONFIG_KEYS from "../../config";
import { refreshTokenApi } from "../endpoints/auth/token-refresh";
const api: AxiosInstance = axios.create({
  baseURL: CONFIG_KEYS.API_BASE_URL,
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
        const newAccessToken = await refreshTokenApi(token?.refreshToken);
        localStorage.setItem(
          "accessToken",
          JSON.stringify({
            accessToken: newAccessToken,
          })
        );
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    // Check if the response status is 403 (forbidden)
    if (error?.response?.status === 403) {
      window.dispatchEvent(new Event("sessionExpired"));
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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
    } else if (error.request) {
      throw new CustomApiError(`No response received`, error.request);
    } else {
      console.log("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
