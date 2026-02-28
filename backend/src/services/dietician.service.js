import prisma from "../lib/prisma.js";

export const createDeitician = async (data) => {
  try {
    const deitician = await prisma.user.create({
      data,
    });
    return deitician;
  } catch (error) {
    throw new Error(error);
  }
};
export const getDeiticians = async () => {
  try {
    const deiticians = await prisma.user.findMany({
      where: { role: "DIETICIAN" },
    });
    console.log(deiticians);
    return deiticians;
  } catch (error) {
    throw new Error(error);
  }
};
export const updateDeitician = async (id, data) => {
  try {
    const deitician = await prisma.dietician.update({
      where: { id },
      data,
    });
    return deitician;
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteDeitician = async (id) => {
  try {
    const deitician = await prisma.dietician.delete({
      where: { id },
    });
    return deitician;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMyAssignedUsers = async (id) => {
  try {
    const assignedUsers = await prisma.dieticianAssignment.findMany({
      where: { dieticianId: id },
    });
    return assignedUsers;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMyAssignedDieticians = async (id) => {
  try {
    const assignedDieticians = await prisma.dieticianAssignment.findMany({
      where: { userId: id },
    });

    return assignedDieticians;
  } catch (error) {
    throw new Error(error);
  }
};
