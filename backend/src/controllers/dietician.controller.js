import {
  createDeitician,
  deleteDeitician,
  getDeiticians,
  getMyAssignedDieticians,
  getMyAssignedUsers,
  updateDeitician,
} from "../services/dietician.service.js";

export const dieticianController = {
  createDeitician: async (req, res) => {
    try {
      const deitician = await createDeitician(req.body);
      res.status(201).json(deitician);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getDeiticians: async (req, res) => {
    try {
      const deiticians = await getDeiticians();
      res.status(200).json(deiticians);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  updateDeitician: async (req, res) => {
    try {
      const deitician = await updateDeitician(req.params.id, req.body);
      res.status(200).json(deitician);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  deleteDeitician: async (req, res) => {
    try {
      const deitician = await deleteDeitician(req.params.id);
      res.status(200).json(deitician);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getMyAssignedUsers: async (req, res) => {
    try {
      const id = Number(req.user.id);
      const assignedUsers = await getMyAssignedUsers(id);
      res.status(200).json(assignedUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getMyAssignedDeiticians: async (req, res) => {
    try {
      const id = Number(req.user.id);
      const deiticians = await getMyAssignedDieticians(id);
      res.status(200).json(deiticians);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
