import prisma from "../lib/prisma.js";

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "USER" },
    });
    console.log(users);
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMe = async (userId) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
