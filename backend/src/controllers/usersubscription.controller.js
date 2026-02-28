import {
  getAllUserSubscription,
  getUserSubscription,
} from "../services/usersubscription.service.js";

export const userSubscriptionController = {
  getUserSubscription: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const userSubscription = await getUserSubscription(req.user.id, id);
      res.status(200).json(userSubscription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllUserSubscription: async (req, res) => {
    try {
      const userSubscription = await getAllUserSubscription(req.user.id);
      res.status(200).json(userSubscription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
