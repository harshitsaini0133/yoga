import { Router } from "express";
import { paymentController } from "../controllers/payment.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();
// export const paymentRoutes = (router) => {
router.post("/create-order", verifyAuth, paymentController.createOrder);
router.post("/verify-payment", verifyAuth, paymentController.verifyPayment);
//   router.post("/capture-payment", paymentController.capturePayment); // TODO
// };

export { router as paymentRouter };
