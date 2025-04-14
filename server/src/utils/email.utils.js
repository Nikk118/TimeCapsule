import nodemailer from "nodemailer";

export const sendCapsuleEmail = async (to, subject, text, media = []) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const attachments = media.map((item) => ({
    filename: item.fileUrl.split("/").pop(),
    path: item.fileUrl,
  }));

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments,
  };

  return transporter.sendMail(mailOptions);
};
