import mongoose from 'mongoose';

const postSchema = new mongoose.schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('Post',postSchema);