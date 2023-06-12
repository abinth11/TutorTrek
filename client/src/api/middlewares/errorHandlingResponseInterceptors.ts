import axios from "axios";
import CONSTANTS_COMMON from "../../constants/common";
import {toast} from 'react-toastify'
const api = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
});

api.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      if (error.response) {
        // Handle specific error codes or messages
        if (error.response.status === 401) {
          // Handle unauthorized access
          toast.error('Unauthorized access');
        } else if (error.response.status === 404) {
          // Handle not found error
          toast.error('Resource not found');
        } else {
          // Handle other error codes or messages
          toast.error('An error occurred');
        }
      } else {
        // Handle network errors
        toast.error('Network error');
      }
    //   return Promise.reject(error);
    }
  );
  export default api