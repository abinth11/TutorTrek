import { SendEmailService } from '../../frameworks/services/sendEmailService';

export const sendEmailServiceInterface = (
  service: ReturnType<SendEmailService>
) => {
  const sendEmail = (email: string, subject: string, text: string) =>
    service.sendEmail(email, subject, text);
  return {
    sendEmail,
  };
};

export type SendEmailServiceInterface = typeof sendEmailServiceInterface