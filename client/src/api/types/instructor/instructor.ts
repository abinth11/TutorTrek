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
    qualification?:string;
    subjects?:string;
    experience?:string;
    skills?:string;
    about?:string;

  }
  