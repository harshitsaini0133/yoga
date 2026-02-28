import prisma from "../lib/prisma.js";

export const getAnalytics = async () => {
  try {
    const totalUsers = await prisma.user.count({
      where: { role: "USER" },
    });

    const totalTrainers = await prisma.user.count({
      where: { role: "TRAINER" },
    });

    const salesAdmins = await prisma.user.count({
      where: { role: "SALES_ADMIN" },
    });

    const dieticians = await prisma.user.count({
      where: { role: "DIETICIAN" },
    });

    const tickets = await prisma.ticket.count();

    return { totalUsers, totalTrainers, salesAdmins, dieticians, tickets };
  } catch (error) {
    console.error("Analytics fetch error:", error);
    throw error;
  }
};
