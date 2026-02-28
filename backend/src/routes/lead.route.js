import { Router } from "express";
import { leadController } from "../controllers/lead.controller.js";

const router = Router();

router.get("/leads", leadController.getLeads);
router.post("/leads", leadController.createLead);
router.put("/leads/:id", leadController.updateLead);
router.delete("/leads/:id", leadController.deleteLead);

export { router as leadRouter };
