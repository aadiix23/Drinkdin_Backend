import express from "express";
import {protect} from "../auth/auth.middleware.js"
import * as postController from "./post.controller.js"; 

const router = express.Router();

//protected Routes
router.post("",protect,postController.createPost);
router.get("",protect,postController.getAllPost);
router.delete("/:id",protect,postController.deletePost);

export default router;