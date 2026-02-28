import prisma from "../lib/prisma.js";

export const createDietPlan = async (data, assignedBy) => {
  try {
    const dietPlan = await prisma.dietPlan.create({
      data: { ...data, assignedBy },
    });
    return dietPlan;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDietPlans = async () => {
  try {
    const dietPlans = await prisma.dietPlan.findMany({});
    return dietPlans;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateDietPlan = async (id, data) => {
  try {
    const dietPlan = await prisma.dietPlan.update({
      where: { id },
      data,
    });
    return dietPlan;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteDietPlan = async (id) => {
  try {
    const dietPlan = await prisma.dietPlan.delete({
      where: { id },
    });
    return dietPlan;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMyDietPlans = async (id, role) => {
  try {
    if (role === "DIETICIAN") {
      const dietPlans = await prisma.dietPlan.findMany({
        where: { assignedBy: id },
      });
      return dietPlans;
    } else {
      const dietPlans = await prisma.dietPlan.findMany({
        where: { assignedTo: id },
      });
      return dietPlans;
    }
  } catch (error) {
    throw new Error(error);
  }
};
