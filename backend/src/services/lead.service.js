import prisma from "../lib/prisma.js";

export const createLead = async (data) => {
  try {
    const lead = await prisma.lead.create({
      data,
    });
    return lead;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLeads = async () => {
  try {
    const leads = await prisma.lead.findMany({});
    return leads;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteLead = async (id) => {
  try {
    const lead = await prisma.lead.delete({
      where: { id },
    });
    return lead;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateLead = async (id, data) => {
  try {
    const lead = await prisma.lead.update({
      where: { id },
      data,
    });
    return lead;
  } catch (error) {
    throw new Error(error);
  }
};
