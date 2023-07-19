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
