import express from "express";
import {protect} from "../auth/auth.middleware.js";
import {getLeaderboard} from "./leaderboard.controller.js";
const router = express.Router();
router.get("/", protect, getLeaderboard);

export default router;
