import { Router } from "express";
import { authorize } from "../middlewares/auth.mjs";
import conversationController from "../controllers/converation.mjs";

const router = Router();

router.get("/", authorize(), conversationController.getAll);

router.get(
  "/:receiverId",
  authorize(),
  conversationController.getUserConversation
);

export default router;
