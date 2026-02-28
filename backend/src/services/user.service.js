import prisma from "../lib/prisma.js";
import { AppError } from "../middlewares/error.middleware.js";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: { role: "USER" },
  });
  return users;
};

export const getMe = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

export const updateProfile = async (userId, updateData) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    return user;
  } catch (error) {
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0] || "field";
      throw new AppError(`${field} already in use`, 409);
    }
    if (error.code === "P2025") {
      throw new AppError("User not found", 404);
    }
    throw error;
  }
};
