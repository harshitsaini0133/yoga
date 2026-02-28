import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./src/routes/index.route.js";
import cookieParser from "cookie-parser";

import Razorpay from "razorpay";
var instance = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET",
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});

app.get("/", async (req, res) => {
  console.log("hello");
});

app.use("/api", router);
