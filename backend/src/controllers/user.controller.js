import { getAllUsers, getMe } from "../services/user.service.js";
import { successResponse } from "../utils/response.js";

export const userController = {
  getAllUsers: async (req, res) => {
    const users = await getAllUsers();
    return successResponse(res, "Users fetched successfully", users);
  },

  getMe: async (req, res) => {
    const userId = req.user.id;
    const user = await getMe(userId);
    return successResponse(res, "User profile fetched successfully", user);
  },
};
