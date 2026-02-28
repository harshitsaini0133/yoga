import {
  createSession,
  deleteSession,
  getSessions,
  updateSession,
} from "../services/session.service";

export const sessionController = {
  createSession: async (req, res) => {
    try {
      const session = await createSession(req.body);
      res.status(201).json(session);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getSessions: async (req, res) => {
    try {
      const session = await getSessions();
      res.status(200).json(session);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  updateSession: async (req, res) => {
    try {
      const session = await updateSession(req.params.id, req.body);
      res.status(200).json(session);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  deleteSession: async (req, res) => {
    try {
      const session = await deleteSession(req.params.id);
      res.status(200).json(session);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
