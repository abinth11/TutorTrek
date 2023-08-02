import END_POINTS from "../../../constants/endpoints";
import { login } from "../../services/auth/auth-service";
import { AdminLoginInfo } from "../../types/admin/auth-interface";

export const loginAdmin = (adminInfo:AdminLoginInfo)=>{
    return login(END_POINTS.LOGIN_ADMIN,adminInfo)
}