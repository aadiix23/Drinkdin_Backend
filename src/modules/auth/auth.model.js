import mongoose, { Schema } from "mongoose";
const {body} = require("express-validator");

 const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    googleId:{
        type:String,
    },
    password:{
        type:String,
        required:function(){
            return !this.googleId;
        }
    }
 },{timestamps:true})

 export default mongoose.model("User",userSchema)
