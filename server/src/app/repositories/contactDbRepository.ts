import { ContactRepoImpl } from '@src/frameworks/database/mongodb/repositories/contactsRepoMongoDb';
import { ContactInterface } from '@src/types/contact';

export const contactDbInterface = (repository: ReturnType<ContactRepoImpl>) => {
  const addContact = async (info: ContactInterface) =>
    await repository.addContact(info);
  return {
    addContact
  }
};

export type ContactDbInterface = typeof contactDbInterface;
