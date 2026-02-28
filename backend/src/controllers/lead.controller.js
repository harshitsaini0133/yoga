import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../services/lead.service.js";

export const leadController = {
  createLead: async (req, res) => {
    try {
      const lead = await createLead(req.body);
      res.status(201).json(lead);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getLeads: async (req, res) => {
    try {
      const leads = await getLeads();
      res.status(200).json(leads);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  deleteLead: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const lead = await deleteLead(id);
      res.status(200).json(lead);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  updateLead: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const lead = await updateLead(id, req.body);
      res.status(200).json(lead);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
