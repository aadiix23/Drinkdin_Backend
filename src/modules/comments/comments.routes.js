// comment.routes.js
import express from "express";
import { protect } from "../auth/auth.middleware.js";
import * as commentController from "./comment.controller.js";

const router = express.Router();

router.post("/:postId", protect, commentController.addComment);
router.get("/:postId", protect, commentController.getAllComment);
router.delete("/:id", protect, commentController.deleteComment);

export default router;