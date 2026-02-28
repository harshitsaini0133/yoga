import {
  assignDietician,
  deleteAssignedDietician,
  getAssignedDieticians,
  updateAssignedDietician,
} from "../services/assigndietician.service.js";

export const assignDieticianController = {
  assignDietician: async (req, res) => {
    try {
      const assignedDietician = await assignDietician(
        req.body.userId,
        req.body.dieticianId,
      );
      res.status(201).json(assignedDietician);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getAssignedDieticians: async (req, res) => {
    try {
      const assignedDieticians = await getAssignedDieticians();
      res.status(200).json(assignedDieticians);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  updateAssignedDietician: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const assignedDietician = await updateAssignedDietician(id, req.body);
      res.status(200).json(assignedDietician);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  deleteAssignedDietician: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const assignedDietician = await deleteAssignedDietician(id);
      res.status(200).json(assignedDietician);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
