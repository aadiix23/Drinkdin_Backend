import express from "express";
import {protect} from "./auth.middleware.js";
import {register, login, googlelogin} from "./auth.controller.js";
import {registerValidator, validate} from "./auth.validator.js";

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", validate, login);

router.get("/google/callback", googlelogin);
export default router;