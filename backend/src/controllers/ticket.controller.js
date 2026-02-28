import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  getMyTickets,
} from "../services/ticket.service.js";
import { successResponse } from "../utils/response.js";

export const ticketController = {
  getTickets: async (req, res) => {
    const tickets = await getTickets();
    return successResponse(res, "Tickets fetched successfully", tickets);
  },
  createTicket: async (req, res) => {
    const id = req.user.id;
    const ticket = await createTicket(req.body, id);
    return successResponse(res, "Ticket created successfully", ticket, 201);
  },
  updateTicket: async (req, res) => {
    const id = Number(req.params.id);
    const ticket = await updateTicket(id, req.body);
    return successResponse(res, "Ticket updated successfully", ticket);
  },
  deleteTicket: async (req, res) => {
    const id = Number(req.params.id);
    const ticket = await deleteTicket(id);
    return successResponse(res, "Ticket deleted successfully", ticket);
  },

  getMyTickets: async (req, res) => {
    const id = Number(req.user.id);
    const tickets = await getMyTickets(id);
    return successResponse(res, "My tickets fetched successfully", tickets);
  },
};
