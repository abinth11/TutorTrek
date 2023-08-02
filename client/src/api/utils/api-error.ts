export const handleApiError = (error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      const status = error.response.status;
      const errorMessage = error.response.data.message;
  
      if (status === 401) {
        // Handle authentication errors
        return 'Authentication failed. Please check your credentials.';
      } else if (status === 400) {
        // Handle validation errors
        return `Validation failed: ${errorMessage}`;
      } else {
        // Handle other server errors
        return `Server error: ${errorMessage}`;
      }
    } else if (error.request) {
      // The request was made, but no response was received
      return 'No response received from the server. Please try again later.';
    } else {
      // Other errors occurred
      console.error('Error:', error);
      return 'An unexpected error occurred. Please try again.';
    }
  };
  