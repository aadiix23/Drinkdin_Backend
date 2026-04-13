import express from "express";
import cors from "cors";

import authroutes from "./modules/auth/auth.route.js";
import postroutes from "./modules/posts/post.routes.js";
// Import models to ensure they are registered
import "./modules/auth/auth.model.js";
import "./modules/posts/posts.model.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json())

//Routes

app.use("/auth",authroutes);
app.use("/post",postroutes);

//Health 
app.get("/",(req,res) =>{
    res.send("API IS Fine Check You Frontend You Dumb Ass")
})

export default app;
