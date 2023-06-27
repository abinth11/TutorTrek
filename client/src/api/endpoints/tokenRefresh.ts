import { refreshTokenService } from "../services/tokenRefreshService";
import END_POINTS from "../../constants/endpoints";

export const refreshTokenApi = (refreshToken:string) => {
    return refreshTokenService(END_POINTS.REFRESH_TOKEN, refreshToken);
};
