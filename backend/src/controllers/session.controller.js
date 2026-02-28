import {
  createSession,
  deleteSession,
  getSessions,
  updateSession,
} from "../services/session.service.js";
import { successResponse } from "../utils/response.js";

export const sessionController = {
  createSession: async (req, res) => {
    const session = await createSession(req.body);
    return successResponse(res, "Session created successfully", session, 201);
  },

  getSessions: async (req, res) => {
    const session = await getSessions();
    return successResponse(res, "Sessions fetched successfully", session);
  },

  updateSession: async (req, res) => {
    const session = await updateSession(req.params.id, req.body);
    return successResponse(res, "Session updated successfully", session);
  },

  deleteSession: async (req, res) => {
    const session = await deleteSession(req.params.id);
    return successResponse(res, "Session deleted successfully", session);
  },
};
