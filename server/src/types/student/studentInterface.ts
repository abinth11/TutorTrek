export interface StudentInterface {
    _id: string;
    firstName:string;
    lastName:string;
    email: string;
    mobile:number;
    password: string;
    isGoogleUser:boolean
}

export interface JwtPayload {
    studentId:string;
    email:string;
}