import { createAdmin, getAllAdmins } from "../services/superAdmin.service.js";
import { hashPassword } from "../utils/password.js";
import { successResponse } from "../utils/response.js";

export const superAdminController = {
  createAdmin: async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await createAdmin(name, email, hashedPassword, role);
    return successResponse(res, "Admin created successfully", user, 201);
  },

  getAllAdmins: async (req, res) => {
    const admins = await getAllAdmins();
    return successResponse(res, "Admins fetched successfully", admins);
  },
};
