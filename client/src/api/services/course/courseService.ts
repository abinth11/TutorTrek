import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/protectedInterceptor";
import { PaymentIntent } from "@stripe/stripe-js";
import axiosInstance from "../../middlewares/interceptor";

export const addCourseService = async (endpoint: string, courseInfo: FormData) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    courseInfo
  );
  return response;
};

export const getCoursesByInstructorService = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const getAllCoursesService = async (endpoint: string) => {
  const response = await axiosInstance.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response;
};

export const getIndividualCourseService = async (
  endpoint: string,
  courseId: string
) => {
  const response = await axiosInstance.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${courseId}`
  );
  return response;
};

export const enrollStudentService = async (
  endpoint:string,
  courseId:string,
  paymentInfo?:PaymentIntent,
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${courseId}`,paymentInfo
  );
  return response.data
};

export const getRecommendedCoursesService = async (
 endpoint:string
) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data
};

export const getTrendingCoursesService = async (
  endpoint:string,
) => {
  const response = await axiosInstance.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data
};

export const getCourseByStudentService = async (
  endpoint:string,
) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data
};


