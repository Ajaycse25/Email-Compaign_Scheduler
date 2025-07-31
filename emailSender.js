import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (to, subject, html) => {
  // Clean the recipient email address
  const recipient = String(to).replace(/['"]/g, '').trim();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  return transporter.sendMail({
    from: `"Campaign Scheduler" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject,
    html
  });
};
