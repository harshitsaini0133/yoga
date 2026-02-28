import {
  assignDietician,
  deleteAssignedDietician,
  getAssignedDieticians,
  updateAssignedDietician,
} from "../services/assigndietician.service.js";
import { successResponse } from "../utils/response.js";

export const assignDieticianController = {
  assignDietician: async (req, res) => {
    const assignedDietician = await assignDietician(
      req.body.userId,
      req.body.dieticianId,
    );
    return successResponse(
      res,
      "Dietician assigned successfully",
      assignedDietician,
      201,
    );
  },

  getAssignedDieticians: async (req, res) => {
    const assignedDieticians = await getAssignedDieticians();
    return successResponse(
      res,
      "Assigned dieticians fetched successfully",
      assignedDieticians,
    );
  },

  updateAssignedDietician: async (req, res) => {
    const id = Number(req.params.id);
    const assignedDietician = await updateAssignedDietician(id, req.body);
    return successResponse(
      res,
      "Assigned dietician updated successfully",
      assignedDietician,
    );
  },

  deleteAssignedDietician: async (req, res) => {
    const id = Number(req.params.id);
    const assignedDietician = await deleteAssignedDietician(id);
    return successResponse(
      res,
      "Assigned dietician deleted successfully",
      assignedDietician,
    );
  },
};
