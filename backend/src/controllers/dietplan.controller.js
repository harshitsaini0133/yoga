import {
  createDietPlan,
  deleteDietPlan,
  getDietPlans,
  getMyDietPlans,
  updateDietPlan,
} from "../services/dietplan.service.js";

export const dietPlanController = {
  createDietPlan: async (req, res) => {
    try {
      const assignedBy = req.user.id;
      console.log(req.body);
      const dietPlan = await createDietPlan(req.body, assignedBy);
      res.status(201).json(dietPlan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getDietPlans: async (req, res) => {
    try {
      const dietPlans = await getDietPlans();
      res.status(200).json(dietPlans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  updateDietPlan: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const dietPlan = await updateDietPlan(id, req.body);
      res.status(200).json(dietPlan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  deleteDietPlan: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const dietPlan = await deleteDietPlan(id);
      res.status(200).json(dietPlan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getMyDietPlans: async (req, res) => {
    try {
      const id = Number(req.user.id);
      const role = req.user.role;
      const dietPlans = await getMyDietPlans(id, role);
      res.status(200).json(dietPlans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
