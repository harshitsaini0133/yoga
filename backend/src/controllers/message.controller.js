import {
  deleteMessage,
  getAllMessages,
  getMessages,
  getMessagesById,
  sendMessage,
  updateMessage,
} from "../services/message.service.js";
import { successResponse } from "../utils/response.js";

export const messageController = {
  sendMessage: async (req, res) => {
    const id = Number(req.user.id);
    const role = req.user.role;
    const message = await sendMessage(req.body, id, role);
    return successResponse(res, "Message sent successfully", message, 201);
  },
  getMessages: async (req, res) => {
    const id = Number(req.user.id);
    const role = req.user.role;
    const messages = await getMessages(id, role);
    return successResponse(res, "Messages fetched successfully", messages);
  },
  updateMessage: async (req, res) => {
    const message = await updateMessage(req.params.id, req.body);
    return successResponse(res, "Message updated successfully", message);
  },
  deleteMessage: async (req, res) => {
    const message = await deleteMessage(req.params.id);
    return successResponse(res, "Message deleted successfully", message);
  },

  getAllMessages: async (req, res) => {
    const messages = await getAllMessages();
    return successResponse(res, "All messages fetched successfully", messages);
  },

  getMessagesById: async (req, res) => {
    const id1 = Number(req.body.id);
    const { id2, role } = req.user;
    const messages = await getMessagesById(id1, id2, role);
    return successResponse(
      res,
      "Conversation messages fetched successfully",
      messages,
    );
  },
};
