import jwtDecode, { JwtPayload } from "jwt-decode";

interface Payload {
  email: string;
  Id: string;
  role: string;
}
interface DecodedToken extends JwtPayload {
  exp: number;
  iat: number;
  payload: Payload;
}

const decodeJwtToken = (jwtToken: string): DecodedToken | null => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(jwtToken);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

export default decodeJwtToken;
