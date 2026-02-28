import {
  createDietPlan,
  deleteDietPlan,
  getDietPlans,
  getMyDietPlans,
  updateDietPlan,
} from "../services/dietplan.service.js";
import { successResponse } from "../utils/response.js";

export const dietPlanController = {
  createDietPlan: async (req, res) => {
    const assignedBy = req.user.id;
    const dietPlan = await createDietPlan(req.body, assignedBy);
    return successResponse(
      res,
      "Diet plan created successfully",
      dietPlan,
      201,
    );
  },

  getDietPlans: async (req, res) => {
    const dietPlans = await getDietPlans();
    return successResponse(res, "Diet plans fetched successfully", dietPlans);
  },

  updateDietPlan: async (req, res) => {
    const id = Number(req.params.id);
    const dietPlan = await updateDietPlan(id, req.body);
    return successResponse(res, "Diet plan updated successfully", dietPlan);
  },

  deleteDietPlan: async (req, res) => {
    const id = Number(req.params.id);
    const dietPlan = await deleteDietPlan(id);
    return successResponse(res, "Diet plan deleted successfully", dietPlan);
  },

  getMyDietPlans: async (req, res) => {
    const id = Number(req.user.id);
    const role = req.user.role;
    const dietPlans = await getMyDietPlans(id, role);
    return successResponse(
      res,
      "My diet plans fetched successfully",
      dietPlans,
    );
  },
};
