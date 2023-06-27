import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import CONSTANTS_COMMON from "../../constants/common";
import CustomApiError from "../../utils/CustomApiError";
import { refreshTokenApi } from "../endpoints/tokenRefresh";
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
      console.log('ssssssssssssssssssssssssssssssssssss')
      console.log(token.refreshToken)
      try {
        const newAccessToken = await refreshTokenApi(token.refreshToken);
        console.log('new access token got')
        console.log(newAccessToken)
        localStorage.setItem(
          'accessToken',
          JSON.stringify({
              accessToken:newAccessToken,
          })
        )
        // Update the Authorization header with the new access token
        // originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the updated headers
        return api(originalRequest);
      } catch (error) {
        console.log(error)
        // Handle token refresh failure or other errors
        // You can redirect to a login page, clear user data, etc.
        throw error;
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
        console.log("Not Found:", data);
        throw new CustomApiError("Not Found", data);
      } else if (status === 409) {
        throw new CustomApiError("Conflict", data);
      } else {
        throw new CustomApiError(`Request failed with status ${status}`, data);
      }
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
