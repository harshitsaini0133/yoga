import prisma from "../lib/prisma.js";

export const getUserSubscription = async (userId, subscriptionId) => {
  try {
    const userSubscription = await prisma.userSubscription.findFirst({
      where: { userId, subscriptionId },
    });
    return userSubscription;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllUserSubscription = async (userId) => {
  try {
    const userSubscription = await prisma.userSubscription.findMany({
      where: { userId },
    });
    return userSubscription;
  } catch (error) {
    throw new Error(error);
  }
};
