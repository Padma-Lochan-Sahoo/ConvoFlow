import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ConvoFlow" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your ConvoFlow Verification Code",
    html: `
    <div style="font-family:'Segoe UI',sans-serif;max-width:520px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="color:#2563eb;margin:0;font-size:24px;">💬 ConvoFlow</h1>
      </div>
      <h2 style="color:#1e293b;font-size:20px;margin-bottom:8px;">Email Verification</h2>
      <p style="color:#64748b;margin-bottom:24px;">Use the code below to verify your email and complete signup. It expires in <strong>10 minutes</strong>.</p>
      <div style="text-align:center;background:#eff6ff;border:2px dashed #93c5fd;border-radius:10px;padding:24px;margin-bottom:24px;">
        <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#1d4ed8;">${otp}</span>
      </div>
      <p style="color:#94a3b8;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"/>
      <p style="font-size:12px;color:#cbd5e1;text-align:center;">© ${new Date().getFullYear()} ConvoFlow. All rights reserved.</p>
    </div>`,
  });
};
