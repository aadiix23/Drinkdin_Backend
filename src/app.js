import express from "express";
import cors from "cors";

import authroutes from "./modules/auth/auth.route.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json())

//Routes

app.use("/auth",authroutes);

//Health 
app.get("/",(req,res) =>{
    res.send("API IS Fine Check You Frontend You Dumb Ass")
})

export default app;
