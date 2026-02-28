import prisma from "../lib/prisma.js";

export const addSubscription = async (data) => {
  try {
    console.log(data);
    const subscription = await prisma.subscription.create({
      data,
    });
    return subscription;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSubscriptions = async () => {
  try {
    const subscriptions = await prisma.subscription.findMany({});
    return subscriptions;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateSubscription = async (id, data) => {
  try {
    const subscription = await prisma.subscription.update({
      where: { id },
      data,
    });
    return subscription;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteSubscription = async (id) => {
  try {
    const subscription = await prisma.subscription.delete({
      where: { id },
    });
    return subscription;
  } catch (error) {
    throw new Error(error);
  }
};
