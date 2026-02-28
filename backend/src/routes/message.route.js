import { Router } from "express";
import { messageController } from "../controllers/message.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();
// export const messageRoutes = (router) => {
router.get("/messages", verifyAuth, messageController.getMessages);
router.post("/messages", verifyAuth, messageController.sendMessage);
router.put("/messages/:id", messageController.updateMessage);
router.delete("/messages/:id", messageController.deleteMessage);

router.get("/messages/all", verifyAuth, messageController.getAllMessages);

router.get("/messages/by", verifyAuth, messageController.getMessagesById);
// };

export { router as messageRouter };
