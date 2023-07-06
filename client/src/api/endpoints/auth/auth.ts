import END_POINTS from "../../../constants/endpoints";
import { login } from "../../services/auth/authService";
import { AdminLoginInfo } from "../../types/admin/authInterface";

export const loginAdmin = (adminInfo:AdminLoginInfo)=>{
    return login(END_POINTS.LOGIN_ADMIN,adminInfo)
}