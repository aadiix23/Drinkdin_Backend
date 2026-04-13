import mongoose from 'mongoose';
import Post from './posts.model.js';
//createPost
export const createPost = async(userId,data)=>{
    const post = await Post.create({
        user:userId,
        content:data.content,
        image:data.image
    });
    return post;
}
//get all post
 export const getAllPost = async()=>{
    return await Post.find()
    .populate("user","fullName")
    .sort({createdAt:-1})
 }

 //deletepost 

 export const deletePost=async(postId,userId)=>{
    const post = await Post.findById(postId);
    if(!post) throw new Error ("Post Not Found");
    if(post.user.toString()!==userId){
        throw new Error ("Unauthorized")
    }
    await post.deleteOne();
    return {Message:"Post Deleted"}
 }