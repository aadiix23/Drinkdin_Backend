import mongoose from "mongoose";

const connectDB = async()=>{
  try {
     const conn = await mongoose.connect(process.env.MONGO_URI);
     console.log("Mongo DB Connected")
  } catch (error) {
    console.log("Mongoose Error",error.message);
    process.exit(1)
  } 
};
export default connectDB;