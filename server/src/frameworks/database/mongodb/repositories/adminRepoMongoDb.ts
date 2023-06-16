import Admin from '../models/admin';
import {
  AdminSavedDbInterface,
} from '@src/types/admin/adminAuthInterface';
import { SavedInstructorInterface } from '@src/types/instructor/instructorInterface';
import Instructor from '../models/instructor';
export const adminRepoMongoDb = () => {
  const getAdminByEmail = async (email: string) => {
    const admin: AdminSavedDbInterface | null = await Admin.findOne({ email });
    return admin
  };
  const getInstructorRequests = async ()=>{
    const instructors:SavedInstructorInterface[] | null = await Instructor.find({isVerified:false})
    return instructors
  }
  return {
    getAdminByEmail,
    getInstructorRequests
  };
};

export type AdminRepositoryMongoDb = typeof adminRepoMongoDb