import { Router } from "express";
import { ticketController } from "../controllers/ticket.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();
// export const ticketRoutes = (router) => {
router.get("/tickets", verifyAuth, ticketController.getTickets);
router.post("/tickets", verifyAuth, ticketController.createTicket);
router.put("/tickets/:id", ticketController.updateTicket);
router.delete("/tickets/:id", ticketController.deleteTicket);

router.get("/my/tickets", verifyAuth, ticketController.getMyTickets);
// };

export { router as ticketRouter };
