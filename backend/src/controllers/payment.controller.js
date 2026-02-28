import * as paymentService from "../services/payment.service.js";
import { successResponse } from "../utils/response.js";

export const paymentController = {
  // ================= CREATE ORDER =================
  createOrder: async (req, res) => {
    let { subscriptionId } = req.body;

    if (!subscriptionId) throw new Error("subscriptionId is required");

    subscriptionId = Number(subscriptionId);
    const result = await paymentService.createRazorpayOrder({
      userId: req.user.id,
      subscriptionId,
    });

    return successResponse(res, "Order created successfully", result, 201);
  },

  // ================= VERIFY PAYMENT =================
  verifyPayment: async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const result = await paymentService.verifyRazorpayPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return successResponse(res, "Payment verified successfully", result);
  },
};
