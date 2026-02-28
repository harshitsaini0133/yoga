import { Router } from "express";
import { meetingController } from "../controllers/meeting.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();
// export const meetingRoutes = (router) => {
router.get("/meetings", verifyAuth, meetingController.getAllMeetings);
router.get("/my/meetings", verifyAuth, meetingController.getAllUserMeetings);
router.get(
  "/subscriptions/:id/meetings",
  meetingController.getSubsciptionMeetings,
);

router.post("/meetings", verifyAuth, meetingController.scheduleMeeting);
router.put("/meetings/:id", verifyAuth, meetingController.updateMeetingById);
router.delete("/meetings/:id", verifyAuth, meetingController.deleteMeetingById);
// };

export { router as meetingRouter };
