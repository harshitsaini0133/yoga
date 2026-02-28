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
    const subscriptions = await prisma.subscription.findMany();

    return subscriptions.map((sub) => {
      // 1. Convert Decimal to Number safely
      const price = Number(sub.price) || 0;
      const discount = Number(sub.discount) || 0;

      // 2. Calculate discounted price
      // Formula: Price * (1 - discount/100)
      const discountedPrice = price * (1 - discount / 100);

      return {
        ...sub,
        // 3. Return as a clean number fixed to 2 decimal places
        discountPrice: parseFloat(discountedPrice.toFixed(2)),
      };
    });
  } catch (error) {
    // 4. Log the error for the server and re-throw a cleaner message
    console.error("Error fetching subscriptions:", error);
    throw new Error(error.message || "Failed to fetch subscriptions");
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
