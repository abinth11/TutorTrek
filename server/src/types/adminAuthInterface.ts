export interface AdminLoginInfo {
    email:string;
    password:string;
}

export interface AdminSavedDbInterface extends AdminLoginInfo{
    _id:string;
}