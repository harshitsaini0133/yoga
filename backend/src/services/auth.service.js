import prisma from "../lib/prisma.js";
import { AppError } from "../middlewares/error.middleware.js";
import { comparePassword } from "../utils/password.js";

const HARDCODED_OTP = "123456";
const OTP_COOLDOWN_SECONDS = 30;
const OTP_EXPIRY_MINUTES = 5;

export const sendOtp = async (identifier) => {
  if (!identifier) {
    throw new AppError("Email or phone number is required", 400);
  }

  const isEmail = identifier.includes("@");

  let user = await prisma.user.findUnique({
    where: isEmail ? { email: identifier } : { phNo: identifier },
  });

  const now = new Date();

  // 🔥 If user exists → check cooldown
  if (user && user.otpSentAt) {
    const secondsPassed = (now - new Date(user.otpSentAt)) / 1000;

    if (secondsPassed < OTP_COOLDOWN_SECONDS) {
      const waitTime = Math.ceil(OTP_COOLDOWN_SECONDS - secondsPassed);

      throw new AppError(
        `Please wait ${waitTime}s before requesting another OTP`,
        429,
      );
    }
  }

  const expiry = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // 🔥 Create user if not exists
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "user",
        email: isEmail ? identifier : null,
        phNo: !isEmail ? identifier : null,
        role: "USER",
        otpSentAt: now,
        otpExpiry: expiry,
      },
    });
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpSentAt: now,
        otpExpiry: expiry,
      },
    });
  }

  console.log(`OTP sent to ${identifier}: ${HARDCODED_OTP}`);

  return { message: "OTP sent successfully" };
};

export const verifyOtp = async (identifier, otp) => {
  if (!identifier) {
    throw new AppError("Email or phone number is required", 400);
  }

  if (!otp) {
    throw new AppError("OTP is required", 400);
  }

  const isEmail = identifier.includes("@");

  const user = await prisma.user.findUnique({
    where: isEmail ? { email: identifier } : { phNo: identifier },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // 🔥 Expiry Check
  if (!user.otpExpiry || user.otpExpiry < new Date()) {
    await prisma.user.update({
      where: { id: user.id },
      data: { otpSentAt: null, otpExpiry: null },
    });
    throw new AppError("OTP expired. Please request again.", 401);
  }

  // 🔥 Hardcoded OTP Check
  if (otp !== HARDCODED_OTP) {
    throw new AppError("Invalid OTP provided", 401);
  }

  // 🔥 Clear OTP after success
  await prisma.user.update({
    where: { id: user.id },
    data: {
      otpSentAt: null,
      otpExpiry: null,
    },
  });

  return user;
};

export const resendOtp = async (identifier) => {
  return sendOtp(identifier);
};

// Keep adminLogin for compatibility if needed, or update it
export const adminLogin = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Admin user not found", 404);
  }

  if (!(await comparePassword(password, user.password))) {
    throw new AppError("Invalid password provided", 401);
  }

  if (!["SUPER_ADMIN", "SALES_ADMIN", "SUPPORT_ADMIN"].includes(user.role)) {
    throw new AppError("Access denied. Admin only.", 403);
  }

  return user;
};
