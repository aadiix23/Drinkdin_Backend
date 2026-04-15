import express from "express";
import { protect } from "../auth/auth.middleware.js";
import * as followController from "./follow.controller.js";

const router = express.Router();

router.post("/:userId", protect, followController.toggleFollow);

export default router;