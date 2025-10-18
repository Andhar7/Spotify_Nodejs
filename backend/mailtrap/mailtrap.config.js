import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a test account automatically with Ethereal
// Or use your own SMTP credentials from .env
export const createTransporter = async () => {
  // If you have SMTP credentials in .env, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Otherwise, create a test account with Ethereal automatically
  const testAccount = await nodemailer.createTestAccount();

  console.log("📧 Ethereal Email Test Account Created:");
  console.log("   Email:", testAccount.user);
  console.log("   Password:", testAccount.pass);
  console.log("   Preview emails at: https://ethereal.email");

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const sender = {
  email: "noreply@spotify-clone.com",
  name: "Spotify Clone",
};
