import cloudinary from "../lib/cloudinary.js";
import { generateOTP, generateToken, sendOtpEmail } from "../lib/utils.js";
import Otp from "../models/otp.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

    await Otp.deleteMany({ email: email.toLowerCase() });

    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 12);

    const otpDoc = new Otp({
      email: email.toLowerCase(),
      otp,
      fullName: fullName.trim(),
      password: hashedPassword,
    });

    await otpDoc.save();
    await sendOtpEmail(email.toLowerCase(), otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyotp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    const otpDoc = await Otp.findOne({ email: email.toLowerCase(), otp });
    if (!otpDoc)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const diff = (Date.now() - otpDoc.createdAt.getTime()) / 1000;
    if (diff > 600) {
      await Otp.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      await Otp.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      fullName: otpDoc.fullName,
      email: otpDoc.email,
      password: otpDoc.password,
    });

    await Otp.deleteOne({ _id: otpDoc._id });

    generateToken(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      bio: newUser.bio,
      createdAt: newUser.createdAt,
    });
  } catch (err) {
    console.error("verifyotp error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("logout error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName, bio } = req.body;
    const userId = req.user._id;

    const updateData = {};

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "convoflow/avatars",
        transformation: [{ width: 400, height: 400, crop: "fill" }],
      });
      updateData.profilePic = uploadResponse.secure_url;
    }

    if (fullName?.trim()) updateData.fullName = fullName.trim();
    if (bio !== undefined) updateData.bio = bio.slice(0, 300);

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("updateProfile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error("checkAuth error:", error.message);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
