import api from "../../middlewares/protected-interceptor";
import { PaymentIntent } from "@stripe/stripe-js";
import axiosInstance from "../../middlewares/interceptor";
import CONFIG_KEYS from "../../../config";

export const addCourseService = async (
  endpoint: string,
  courseInfo: FormData
) => {
  const response = await api.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    courseInfo
  );
  return response;
};

export const editCourseService = async (
  endpoint: string,
  courseId: string,
  courseInfo: FormData
) => {
  const response = await api.put(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${courseId}`,
    courseInfo
  );
  return response;
};

export const getCoursesByInstructorService = async (endpoint: string) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const getAllCoursesService = async (endpoint: string) => {
  const response = await axiosInstance.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response;
};

export const getIndividualCourseService = async (
  endpoint: string,
  courseId: string
) => {
  const response = await axiosInstance.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${courseId}`
  );
  return response;
};

export const enrollStudentService = async (
  endpoint: string,
  courseId: string,
  paymentInfo?: PaymentIntent
) => {
  const response = await api.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${courseId}`,
    paymentInfo
  );
  return response.data;
};

export const getRecommendedCoursesService = async (endpoint: string) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const getTrendingCoursesService = async (endpoint: string) => {
  const response = await axiosInstance.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const getCourseByStudentService = async (endpoint: string) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const searchCourseService = async (
  endpoint: string,
  searchQuery: string,
  filterQuery: string
) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}?search=${searchQuery}&filter=${filterQuery}`
  );
  return response.data;
};
