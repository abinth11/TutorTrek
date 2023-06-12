import axios from 'axios';
import CONSTANTS_COMMON from '../../../constants/common';
import { StudentRegisterData,StudentLoginData } from '../../types/student/authInterface';

export const login = async (endpoint: string, data: StudentLoginData) => {
    try {
      const response = await axios.post(`${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw new Error("Unable to login"+error)
    }
  };

export const register = async (endpoint:string,studentData:StudentRegisterData)=>{
  try {
    const response = await axios.post(`${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`, studentData)
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Unable to register student"+error)
  }
}

export const googleLoginStudent = async(endpoint:string,credential:string)=>{
  try {
    const response = await axios.post(`${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,credential)
    console.log(response)
    return response.data
  } catch (error){
    throw new Error("Unable to register student"+error)
  }
}