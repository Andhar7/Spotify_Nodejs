import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { createTransporter, sender } from "./mailtrap.config.js";

// Create transporter instance (will be initialized on first use)
let transporter = null;

const getTransporter = async () => {
  if (!transporter) {
    transporter = await createTransporter();
  }
  return transporter;
};

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailer = await getTransporter();

    const info = await mailer.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
    });

    console.log("✅ Verification email sent successfully");
    console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(`Error sending verification email:`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailer = await getTransporter();

    const welcomeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1DB954, #1ed760); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to Spotify Clone!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello ${name},</p>
    <p>Welcome to Spotify Clone! We're excited to have you on board.</p>
    <p>You can now enjoy all the features of our platform.</p>
    <p>Best regards,<br>The Spotify Clone Team</p>
  </div>
</body>
</html>
    `;

    const info = await mailer.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Welcome to Spotify Clone!",
      html: welcomeHTML,
    });

    console.log("✅ Welcome email sent successfully");
    console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(`Error sending welcome email:`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailer = await getTransporter();

    const info = await mailer.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });

    console.log("✅ Password reset email sent successfully");
    console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(`Error sending password reset email:`, error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const mailer = await getTransporter();

    const info = await mailer.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("✅ Password reset success email sent successfully");
    console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(`Error sending password reset success email:`, error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

// Import nodemailer to use getTestMessageUrl
import nodemailer from "nodemailer";
