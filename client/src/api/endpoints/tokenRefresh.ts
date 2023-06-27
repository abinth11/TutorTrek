import { refreshTokenService } from "../services/tokenRefreshService";
import END_POINTS from "../../constants/endpoints";

export const refreshTokenApi = () => {
    const tokenString = localStorage.getItem('refreshToken');
    let token;
    if (tokenString) {
        token = JSON.parse(tokenString);
    }
    return refreshTokenService(END_POINTS.REFRESH_TOKEN, token);
};
