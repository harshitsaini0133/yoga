import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./src/routes/index.route.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import { successResponse } from "./src/utils/response.js";

import Razorpay from "razorpay";
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  return successResponse(res, "API is running...");
});

app.use("/api", router);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("listening on port 3000 at 0.0.0.0");
});

// Keep-alive interval for debugging
setInterval(() => {
  // Just keeping the event loop alive
}, 60000);
