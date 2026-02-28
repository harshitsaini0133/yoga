import {
  createDeitician,
  deleteDeitician,
  getDeiticians,
  getMyAssignedDieticians,
  getMyAssignedUsers,
  updateDeitician,
} from "../services/dietician.service.js";
import { successResponse } from "../utils/response.js";

export const dieticianController = {
  createDeitician: async (req, res) => {
    const deitician = await createDeitician(req.body);
    return successResponse(
      res,
      "Dietician created successfully",
      deitician,
      201,
    );
  },

  getDeiticians: async (req, res) => {
    const deiticians = await getDeiticians();
    return successResponse(res, "Dieticians fetched successfully", deiticians);
  },

  updateDeitician: async (req, res) => {
    const deitician = await updateDeitician(req.params.id, req.body);
    return successResponse(res, "Dietician updated successfully", deitician);
  },

  deleteDeitician: async (req, res) => {
    const deitician = await deleteDeitician(req.params.id);
    return successResponse(res, "Dietician deleted successfully", deitician);
  },

  getMyAssignedUsers: async (req, res) => {
    const id = Number(req.user.id);
    const assignedUsers = await getMyAssignedUsers(id);
    return successResponse(
      res,
      "Assigned users fetched successfully",
      assignedUsers,
    );
  },

  getMyAssignedDeiticians: async (req, res) => {
    const id = Number(req.user.id);
    const deiticians = await getMyAssignedDieticians(id);
    return successResponse(
      res,
      "Assigned dieticians fetched successfully",
      deiticians,
    );
  },
};
