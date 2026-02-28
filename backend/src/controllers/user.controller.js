import { getAllUsers, getMe, updateProfile } from "../services/user.service.js";
import { successResponse } from "../utils/response.js";
import { catchAsync } from "../utils/catchAsync.js";

export const userController = {
  getAllUsers: catchAsync(async (req, res) => {
    const users = await getAllUsers();
    return successResponse(res, "Users fetched successfully", users);
  }),

  getMe: catchAsync(async (req, res) => {
    const userId = req.user.id;
    const user = await getMe(userId);
    return successResponse(res, "User profile fetched successfully", user);
  }),

  updateProfile: catchAsync(async (req, res) => {
    const userId = req.user.id;
    const updateData = req.body;
    const user = await updateProfile(userId, updateData);
    return successResponse(res, "Profile updated successfully", user);
  }),
};
