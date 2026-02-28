import {
  addSubscription,
  getSubscriptions,
  deleteSubscription,
  updateSubscription,
} from "../services/subsciption.service.js";
import { successResponse } from "../utils/response.js";

export const subscriptionController = {
  addSubscription: async (req, res) => {
    const subscription = await addSubscription(req.body);
    return successResponse(
      res,
      "Subscription added successfully",
      subscription,
      201,
    );
  },

  getSubscriptions: async (req, res) => {
    const subscriptions = await getSubscriptions();
    return successResponse(
      res,
      "Subscriptions fetched successfully",
      subscriptions,
    );
  },

  deleteSubscription: async (req, res) => {
    const id = Number(req.params.id);
    const subscription = await deleteSubscription(id);
    return successResponse(
      res,
      "Subscription deleted successfully",
      subscription,
    );
  },

  updateSubscription: async (req, res) => {
    const id = Number(req.params.id);
    const subscription = await updateSubscription(id, req.body);
    return successResponse(
      res,
      "Subscription updated successfully",
      subscription,
    );
  },
};
