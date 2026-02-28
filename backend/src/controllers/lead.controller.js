import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../services/lead.service.js";
import { successResponse } from "../utils/response.js";

export const leadController = {
  createLead: async (req, res) => {
    const lead = await createLead(req.body);
    return successResponse(res, "Lead created successfully", lead, 201);
  },

  getLeads: async (req, res) => {
    const leads = await getLeads();
    return successResponse(res, "Leads fetched successfully", leads);
  },

  deleteLead: async (req, res) => {
    const id = Number(req.params.id);
    const lead = await deleteLead(id);
    return successResponse(res, "Lead deleted successfully", lead);
  },

  updateLead: async (req, res) => {
    const id = Number(req.params.id);
    const lead = await updateLead(id, req.body);
    return successResponse(res, "Lead updated successfully", lead);
  },
};
