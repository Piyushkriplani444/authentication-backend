// import { MailDataRequired } from '@sendgrid/mail';
// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const user = process.env.NODEMAILER_FROM_EMAIL;
const pass = process.env.NODEMAILER_MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'piyushkriplani888@gmail.com',
    pass: 'tvee phfj dqbz ntxa',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMessage = async (message: any) => {
  try {
    // TODO
    await transporter.sendMail(message);
    return Promise.resolve();
  } catch (err) {
    // TODO
    return Promise.reject(err);
  }
};
