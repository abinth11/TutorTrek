import axios from 'axios';
import CONSTANTS_COMMON from '../../../constants/common';

export const post = async (endpoint: string, data: any) => {
    try {
      const response = await axios.post(`${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
