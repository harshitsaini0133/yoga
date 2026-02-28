import { getAnalytics } from "../services/analytics.service.js";
import { successResponse } from "../utils/response.js";

export const analyticsController = {
  getAnalytics: async (req, res) => {
    const analytics = await getAnalytics();
    return successResponse(res, "Analytics fetched successfully", analytics);
  },
};
