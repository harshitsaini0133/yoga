import { createAdmin, getAllAdmins } from "../services/superAdmin.service.js";
import { hashPassword } from "../utils/password.js";

export const superAdminController = {
  createAdmin: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      const hashedPassword = await hashPassword(password);

      const user = await createAdmin(name, email, hashedPassword, role);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getAllAdmins: async (req, res) => {
    try {
      const admins = await getAllAdmins();
      res.status(200).json(admins);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
