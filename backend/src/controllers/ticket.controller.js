import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  getMyTickets,
} from "../services/ticket.service.js";
export const ticketController = {
  getTickets: async (req, res) => {
    try {
      const tickets = await getTickets();
      res.status(200).json(tickets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  createTicket: async (req, res) => {
    try {
      const id = req.user.id;
      const ticket = await createTicket(req.body, id);
      res.status(201).json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  updateTicket: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const ticket = await updateTicket(id, req.body);
      res.status(200).json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  deleteTicket: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const ticket = await deleteTicket(id);
      res.status(200).json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getMyTickets: async (req, res) => {
    try {
      const id = Number(req.user.id);
      const tickets = await getMyTickets(id);
      res.status(200).json(tickets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
