import { cookieOptions } from "../config/cookie.config.js";
import {
  sendOtp,
  verifyOtp,
  resendOtp,
  adminLogin as adminLoginService,
} from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";
import { successResponse } from "../utils/response.js";

// Send OTP
export const getVerify = async (req, res) => {
  const { emailOrPhone } = req.body;
  const result = await sendOtp(emailOrPhone);
  return successResponse(res, result.message, null);
};

// Verify OTP
export const verifyOtpController = async (req, res) => {
  const { emailOrPhone, otp } = req.body;
  const user = await verifyOtp(emailOrPhone, otp);

  const token = generateToken({
    id: user.id,
    role: user.role,
  });
  // Set Cookie
  res.cookie("token", token, cookieOptions);

  return successResponse(res, "Verification successful", { token });
};

// Resend OTP
export const resendOtpController = async (req, res) => {
  const { emailOrPhone } = req.body;
  const result = await resendOtp(emailOrPhone);
  return successResponse(res, result.message, null);
};

// Admin Login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await adminLoginService(email, password);
  const token = generateToken({
    id: user.id,
    role: user.role,
  });
  res.cookie("token", token, cookieOptions);

  return successResponse(res, "Admin logged in successfully", { token });
};

// Export as object for route compatibility
export const authController = {
  getVerify,
  verifyOtp: verifyOtpController,
  resendOtp: resendOtpController,
  adminLogin,
};
