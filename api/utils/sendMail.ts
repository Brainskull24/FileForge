import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string // using HTML instead of text
) => {
  const info = await transporter.sendMail({
    from: `"FileForge" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });

  console.log(`✅ Email sent: ${info.messageId}`);
};
