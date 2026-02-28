import { getAnalytics } from "../services/analytics.service.js";

export const analyticsController = {
  getAnalytics: async (req, res) => {
    try {
      const analytics = await getAnalytics();
      res.status(200).json(analytics);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
