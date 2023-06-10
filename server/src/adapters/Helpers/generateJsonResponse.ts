const sendJsonResponse = (
    status: string,
    message: string,
    accessToken: string
  ): { status: string, message: string, accessToken: string } => {
    return {
      status,
      message,
      accessToken,
    };
  };
  
  export default sendJsonResponse;
  