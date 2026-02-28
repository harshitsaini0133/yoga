import prisma from "../lib/prisma.js";

export const assignDietician = async (userId, dieticianId) => {
  try {
    const assignedDietician = await prisma.dieticianAssignment.create({
      data: {
        userId,
        dieticianId,
      },
    });
    return assignedDietician;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAssignedDieticians = async () => {
  try {
    const assignedDieticians = await prisma.dieticianAssignment.findMany();
    return assignedDieticians;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAssignedDietician = async (id, data) => {
  try {
    const assignedDietician = await prisma.dieticianAssignment.update({
      where: { id },
      data,
    });
    return assignedDietician;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAssignedDietician = async (id) => {
  try {
    const assignedDietician = await prisma.dieticianAssignment.delete({
      where: { id },
    });
    return assignedDietician;
  } catch (error) {
    throw new Error(error);
  }
};
