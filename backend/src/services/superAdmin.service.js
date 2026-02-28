import prisma from "../lib/prisma.js";

export const createAdmin = async (name, email, password, role) => {
  try {
    if (!name || !email || !password || !role) {
      throw new Error("Missing required fields");
    }

    const user = await prisma.user.create({
      data: { name, email, password, role },
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllAdmins = async () => {
  try {
    const admins = await prisma.user.findMany({
      where: {
        role: {
          not: "USER",
        },
      },
    });
    console.log(admins);
    return admins;
  } catch (error) {
    throw new Error(error);
  }
};
