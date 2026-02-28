import * as paymentService from "../services/payment.service.js";

export const paymentController = {
  // ================= CREATE ORDER =================
  createOrder: async (req, res) => {
    try {
      const { subscriptionId } = req.body;

      const result = await paymentService.createRazorpayOrder({
        userId: req.user.id, // assuming auth middleware
        subscriptionId,
      });

      res.status(201).json(result);
    } catch (err) {
      console.error("Create Order Error:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // ================= VERIFY PAYMENT =================
  verifyPayment: async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

      const result = await paymentService.verifyRazorpayPayment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.status(200).json(result);
    } catch (err) {
      console.error("Verification Error:", err);
      res.status(400).json({ error: err.message });
    }
  },
};
