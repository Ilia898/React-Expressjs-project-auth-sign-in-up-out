import nodemailer from "nodemailer";

interface options {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = (option: options) => {
  // transporter
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "faba947d2dd8c6",
      pass: "054777145d0b44",
    },
  });

  const emailOptions = {
    from: option.from,
    to: option.to,
    subject: option.subject,
    html: option.html,
  };

  transporter.sendMail(emailOptions);
};

export const registerEmailIdentify = (
  email: string,
  userName: string,
  resetUrl: string
) => {
  sendEmail({
    from: "support@exampel.com",
    to: email,
    subject: "[Your Service] Registration: Please Confirm Your Email",
    html: `<p>Hello <b>${userName}</b>,</p>
            <p>You're almost there! You've created your [Your Service] account, 
            and we just need to verify your email address.<br> Please confirm your email by clicking the link below:</p>
            <p><a href="${resetUrl}">Confirm Your Email${resetUrl}</a></p>
            <p>We look forward to serving you and helping you make the most of [Your Service]!</p>
            <p>Thank you,</p>
            <p>The [Your Service] Team</p>`,
  });
};

export const passwordResetMailer = (email: string, resetUrl: string) => {
  sendEmail({
    from: "support@exampel.com",
    to: email,
    subject: "[Your Service] Registration: Please Confirm Your Email",
    html: `<p>DDear customer,</p>
    <p>We received a password reset request for your account.</p>
    <p>To reset your password, please click on the link below :</p>
    <a href="${resetUrl}">Reset Password ...test.  ${resetUrl}</a>
    <p>If you did not request this password reset, please ignore this email or contact us to let us know.</p>
    <p>Thank you,</p>
    <p>Your Company</p>`,
  });
};
