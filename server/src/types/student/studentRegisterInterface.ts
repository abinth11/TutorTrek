export interface StudentRegisterInterface {
  firstName: string;
  lastName: string;
  email: string;
  profilePic?:string;
  mobile?:string;
  password?: string;
  isGoogleUser:boolean
}
