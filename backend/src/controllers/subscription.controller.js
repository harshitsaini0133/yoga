import {
  addSubscription,
  getSubscriptions,
  deleteSubscription,
  updateSubscription,
} from "../services/subsciption.service.js";

export const subscriptionController = {
  addSubscription: async (req, res) => {
    try {
      const subscription = await addSubscription(req.body);
      res.status(201).json(subscription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getSubscriptions: async (req, res) => {
    try {
      const subscriptions = await getSubscriptions();
      res.status(200).json(subscriptions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  deleteSubscription: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const subscription = await deleteSubscription(id);
      res.status(200).json(subscription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  updateSubscription: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const subscription = await updateSubscription(id, req.body);
      res.status(200).json(subscription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
