import { sessionController } from "../controllers/session.controller";

export const sessionRoutes = (router) => {
  router.get("/sessions", sessionController.getSessions);
  router.post("/sessions", sessionController.createSession);
  router.put("/sessions/:id", sessionController.updateSession);
  router.delete("/sessions/:id", sessionController.deleteSession);
};
