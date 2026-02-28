export const createSession = async (data) => {
  try {
    const session = await prisma.session.create({
      data,
    });
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSessions = async () => {
  try {
    const session = await prisma.session.findMany({});
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateSession = async (id, data) => {
  try {
    const session = await prisma.session.update({
      where: { id },
      data,
    });
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteSession = async (id) => {
  try {
    const session = await prisma.session.delete({
      where: { id },
    });
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
