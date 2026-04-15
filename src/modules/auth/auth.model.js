import mongoose, { Schema, Types } from "mongoose";

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
    },
    //followers Module
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
 },{timestamps:true})

 export default mongoose.model("User",userSchema)
