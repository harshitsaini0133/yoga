import admin from "../config/firebase.js";
import prisma from "../lib/prisma.js";
import { comparePassword } from "../utils/password.js";
export const register = async (idToken, name) => {
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { phone_number } = decoded;
    console.log(name, phone_number);
    if (!phone_number) {
      throw new Error("Invalid token");
    }

    const existingUser = await prisma.user.findUnique({
      where: { phNo: phone_number },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data: { name, phNo: phone_number, role: "USER" },
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async (idToken) => {
  try {
    const { phone_number } = await admin.auth().verifyIdToken(idToken);

    if (!phone_number) {
      throw new Error("Invalid phone token");
    }

    const user = await prisma.user.findUnique({
      where: { phNo: phone_number },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const adminLogin = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found");
    }

    console.log(user);
    if (!(await comparePassword(password, user.password))) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getVerify = async (identifier, otp) => {
  try {
    // Check OTP
    if (otp !== "12345") {
      throw new Error("Invalid OTP");
    }

    // Find user by email OR phone
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phNo: identifier }],
      },
    });

    // Create user if not found
    if (!user) {
      const isEmail = identifier.includes("@");

      user = await prisma.user.create({
        data: {
          name: "user",
          email: isEmail ? identifier : null,
          phNo: !isEmail ? identifier : null,
        },
      });
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
