import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 6001;

app.listen(PORT,()=>{
    console.log(`Server Is Running Buddy On Port ${PORT}`)
})