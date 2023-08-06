import { ContactInterface } from '../../types/contact';
import { ContactDbInterface } from '../repositories/contactDbRepository';
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import AppError from '../../utils/appError';

export const addContactU = async (
  contactInfo: ContactInterface,
  contactDbRepository: ReturnType<ContactDbInterface>
) => {
  if (!contactInfo) {
    throw new AppError(
      'Please provide valid data',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  await contactDbRepository.addContact(contactInfo);
};
