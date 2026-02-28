import {
  deleteMessage,
  getAllMessages,
  getMessages,
  getMessagesById,
  sendMessage,
  updateMessage,
} from "../services/message.service.js";

export const messageController = {
  sendMessage: async (req, res) => {
    try {
      const id = Number(req.user.id);
      const role = req.user.role;
      const message = await sendMessage(req.body, id, role);
      res.status(201).json(message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const id = Number(req.user.id);
      const role = req.user.role;
      const messages = await getMessages(id, role);
      res.status(200).json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  updateMessage: async (req, res) => {
    try {
      const message = await updateMessage(req.params.id, req.body);
      res.status(200).json(message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const message = await deleteMessage(req.params.id);
      res.status(200).json(message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getAllMessages: async (req, res) => {
    try {
      const messages = await getAllMessages();
      res.status(200).json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getMessagesById: async (req, res) => {
    try {
      const id1 = Number(req.body.id);
      const { id2, role } = req.user;
      const messages = await getMessagesById(id1, id2, role);
      res.status(200).json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
