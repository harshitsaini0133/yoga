import prisma from "../lib/prisma.js";

// export const sendMessage = async (data, id, role) => {
//   try {
//     const message = await prisma.message.create({
//       data: {
//         dieticianId: id,
//         message: data.text,
//         userId: data.userId,
//       },
//     });
//     return message;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const sendMessage = async (data, id, role) => {
  try {
    const messageData = {
      message: data.text,
      subscriptionId: data.subscriptionId || null, // optional
    };

    if (role === "USER") {
      messageData.userId = id; // current user sending
      messageData.dieticianId = data.dieticianId; // recipient dietician
    } else {
      messageData.dieticianId = id; // current dietician sending
      messageData.userId = data.userId; // recipient user
    }

    const message = await prisma.message.create({
      data: messageData,
    });

    return message;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMessages = async (id, role) => {
  try {
    if (role === "USER") {
      const messages = await prisma.message.findMany({
        where: { userId: id },
      });
      return messages;
    }

    const messages = await prisma.message.findMany({
      where: { dieticianId: id },
    });

    return messages;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateMessage = async (id, data) => {
  try {
    const message = await prisma.message.update({
      where: { id },
      data,
    });
    return message;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteMessage = async (id) => {
  try {
    const message = await prisma.message.delete({
      where: { id },
    });
    return message;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllMessages = async () => {
  try {
    const messages = await prisma.message.findMany({});
    return messages;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMessagesById = async (id1, id2, role) => {
  try {
    if (role === "USER") {
      const messages = await prisma.message.findMany({
        where: { userId: id2, dieticianId: id1 },
      });
      console.log(messages);
      return messages;
    } else {
      const messages = await prisma.message.findMany({
        where: { dieticianId: id1, userId: id2 },
      });
      return messages;
    }
  } catch (error) {
    throw new Error(error);
  }
};
