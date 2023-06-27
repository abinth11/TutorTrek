import nodemailer, { Transporter } from 'nodemailer';
import configKeys from '../../config';

export const sendEmailService = () => {
  const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configKeys.EMAIL_NODE_MAILER,
      pass: configKeys.PASSWORD_NODE_MAILER,
    },
  });
  const sendEmail = (email: string, subject: string, text: string) => {
    const mailOptions = {
      from: configKeys.FROM_EMAIL_NODE_MAILER,
      to: email,
      subject: subject,
      text: text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
  return {
    sendEmail,
  };
};

export type SendEmailService = typeof sendEmailService;
