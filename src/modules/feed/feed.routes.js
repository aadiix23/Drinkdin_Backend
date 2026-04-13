import express from "express";
import { protect } from "../auth/auth.middleware.js";
import * as feedController from "./feed.controller.js";

const router = express.Router();

router.get("", protect, feedController.getFeed);

export default router;