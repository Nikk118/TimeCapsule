import nodemailer from "nodemailer";

// In email.utils.js
export const sendCapsuleEmail = async (to, subject, text, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments, // ✅ Already properly structured
  };

  console.log("📎 Media attachments for email:", attachments);

  return transporter.sendMail(mailOptions);
};
