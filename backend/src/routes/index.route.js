import { Router } from "express";
// import { authRoutes } from "./auth.route.js";
import { authRouter } from "./auth.route.js";
import { subscriptionRouter } from "./subscription.route.js";
import { dieticianRouter } from "./dietcian.route.js";
import { superAdminRouter } from "./superAdmin.route.js";
import { meetingRouter } from "./meeting.route.js";
import { userRouter } from "./user.route.js";
import { dietPlanRouter } from "./dietplan.route.js";
import { onboardingCallRouter } from "./onboardingcall.route.js";
import { analyticsRouter } from "./analytics.route.js";
import { assignDieticianRouter } from "./assigndietician.route.js";
import { messageRouter } from "./message.route.js";
import { ticketRouter } from "./ticket.route.js";
import { leadRouter } from "./lead.route.js";
import { paymentRouter } from "./payment.route.js";
import { userSubscriptionRouter } from "./usersubscription.route.js";

import { successResponse } from "../utils/response.js";

const router = Router();

router.get("/", (req, res) => {
  return successResponse(res, "API is running...");
});

// authRoutes(router);
// subscriptionRoutes(router);
router.use("/", subscriptionRouter);
router.use("/", dietPlanRouter); //dietPlanRouter();
router.use("/", onboardingCallRouter);
router.use("/", messageRouter);
router.use("/", ticketRouter);
router.use("/payment", paymentRouter);
router.use("/my/subscription", userSubscriptionRouter);
// dieticianRoutes(router);
// superAdminRoutes(router);
router.use("/", leadRouter);
router.use("/", assignDieticianRouter);
router.use("/", dieticianRouter);
router.use("/super-admin", superAdminRouter);
router.use("/", meetingRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/", analyticsRouter);
export default router;
