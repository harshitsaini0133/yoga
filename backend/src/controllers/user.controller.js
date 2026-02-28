import prisma from "../lib/prisma.js";
import { getAllUsers, getMe } from "../services/user.service.js";
import { hashPassword } from "../utils/password.js";

export const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getMe: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await getMe(userId);

      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
