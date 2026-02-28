import {
  getAllUserSubscription,
  getUserSubscription,
} from "../services/usersubscription.service.js";
import { successResponse } from "../utils/response.js";

export const userSubscriptionController = {
  getUserSubscription: async (req, res) => {
    const id = Number(req.params.id);
    const userSubscription = await getUserSubscription(req.user.id, id);
    return successResponse(
      res,
      "User subscription fetched successfully",
      userSubscription,
    );
  },
  getAllUserSubscription: async (req, res) => {
    const userSubscription = await getAllUserSubscription(req.user.id);
    return successResponse(
      res,
      "All user subscriptions fetched successfully",
      userSubscription,
    );
  },
};
