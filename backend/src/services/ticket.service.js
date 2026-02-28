import prisma from "../lib/prisma.js";

export const createTicket = async (data, id) => {
  try {
    const ticket = await prisma.ticket.create({
      data: { ...data, userId: id, status: "OPEN" },
    });
    return ticket;
  } catch (error) {
    throw new Error(error);
  }
};

export const getTickets = async () => {
  try {
    const tickets = await prisma.ticket.findMany({});
    return tickets;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTicket = async (id, data) => {
  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      data,
    });
    return ticket;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTicket = async (id) => {
  try {
    const ticket = await prisma.ticket.delete({
      where: { id },
    });
    return ticket;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMyTickets = async (id) => {
  try {
    const tickets = await prisma.ticket.findMany({ where: { userId: id } });
    return tickets;
  } catch (error) {
    throw new Error(error);
  }
};
