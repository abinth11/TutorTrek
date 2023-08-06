export interface PasswordInfo {
  currentPassword: string;
  newPassword: string;
}
export interface UpdateProfileInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  profilePic?: File | null;
}

export interface Students {
  _id: string;
  course:string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateJoined: string;
  isGoogleUser:boolean;
  profilePic:{
    name:string;
    url:string;
    id:string
  }
  profileUrl:string;
  isBlocked: boolean;
}

export interface ContactInfo {
  name:string;
  email:string;
  message:string
}