import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 6001;

app.listen(PORT,()=>{
    console.log(`Server Is Running Buddy On Port ${PORT}`)
})