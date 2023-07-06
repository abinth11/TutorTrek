import { AdminRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/adminRepoMongoDb';

export const adminDbRepository = (
  repository: ReturnType<AdminRepositoryMongoDb>
) => {
  const getAdminByEmail = async (email: string) =>
    await repository.getAdminByEmail(email);

  return {
    getAdminByEmail
  };
};

export type AdminDbInterface = typeof adminDbRepository;
