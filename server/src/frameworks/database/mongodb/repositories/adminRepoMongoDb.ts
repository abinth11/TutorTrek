import Admin from '../models/admin';
import { AdminSavedDbInterface } from '@src/types/adminAuthInterface';
export const adminRepoMongoDb = () => {
  const getAdminByEmail = async (email: string) => {
    const admin: AdminSavedDbInterface | null = await Admin.findOne({ email });
    return admin;
  };

  return {
    getAdminByEmail
  };
};

export type AdminRepositoryMongoDb = typeof adminRepoMongoDb;
