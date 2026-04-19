import mongoose from 'mongoose';
import Post from './posts.model.js';

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

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
 export const getAllPost = async(userId)=>{
    return await Post.find({ user: userId })
    .populate("user","fullname")
    .populate("likes","fullname")
    .sort({createdAt:-1})
 }

 //deletepost 

 export const deletePost=async(postId,userId)=>{
    if (!isValidObjectId(postId)) {
        throw new Error("Invalid post ID format");
    }
    
    const post = await Post.findById(postId);
    if(!post) throw new Error ("Post Not Found");
    if(post.user.toString()!==userId){
        throw new Error ("Unauthorized")
    }
    await post.deleteOne();
    return {Message:"Post Deleted"}
 }

 //like post
 export const likePost = async(postId, userId) => {
    if (!isValidObjectId(postId)) {
        throw new Error("Invalid post ID format");
    }
    
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post Not Found");

    // Check if user already liked the post
    if (post.likes.includes(userId)) {
        throw new Error("Post already liked");
    }

    post.likes.push(userId);
    await post.save();
    return post;
 }

 //unlike post
 export const unlikePost = async(postId, userId) => {
    if (!isValidObjectId(postId)) {
        throw new Error("Invalid post ID format");
    }
    
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post Not Found");

    // Check if user has liked the post
    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
        throw new Error("Post not liked yet");
    }

    post.likes.splice(likeIndex, 1);
    await post.save();
    return post;
 }