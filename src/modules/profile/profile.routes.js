import express, { Router } from "express";
import { protect } from "../auth/auth.middleware.js";
import * as profileController from "./profile.controller.js"

const router = express.Router();

router.get("",protect,profileController.getProfile);

export default router;