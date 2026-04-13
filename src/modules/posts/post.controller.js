import * as postService from "./post.service.js";
import mongoose from 'mongoose';

export const createPost = async(req,res)=>{
    try {
        const post = await postService.createPost(req.user.id,req.body);
        res.status(201).json({Success:true,post})
    } catch (error) {
    res.status(400).json({Success:false,message:error.message})
        
    }
}

export const getAllPost = async(req,res)=>{
    try {
        const post = await postService.getAllPost(req.user.id);
        res.status(200).json({
            Success:true,
            count:post.length,
            post
        })
    } catch (error) {
        res.status(500).json({Success:false,message:error.message})
        
    }
}

export const deletePost = async(req,res)=>{
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({Success:false, message: "Invalid post ID format"});
        }
        
        const deletePost = await postService.deletePost(req.params.id,req.user.id);
        res.status(200).json({Success:true,...deletePost});
    } catch (error) {
        res.status(400).json({Success:false,Message:error.message})
    }
}

export const likePost = async(req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({Success: false, message: "Invalid post ID format"});
        }
        
        const post = await postService.likePost(req.params.id, req.user.id);
        res.status(200).json({
            Success: true,
            message: "Post liked successfully",
            post
        });
    } catch (error) {
        res.status(400).json({Success: false, message: error.message});
    }
}

export const unlikePost = async(req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({Success: false, message: "Invalid post ID format"});
        }
        
        const post = await postService.unlikePost(req.params.id, req.user.id);
        res.status(200).json({
            Success: true,
            message: "Post unliked successfully",
            post
        });
    } catch (error) {
        res.status(400).json({Success: false, message: error.message});
    }
}
