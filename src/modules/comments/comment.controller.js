import { text } from "express";
import * as commentService from "./comment.service.js";

export const addComment = async(req,res)=>{
    try {
        const comment = await commentService.addComment(
        req.params.postId,
        req.user.id,
        req.body.text
    );
    res.status(200).json({sucess:true,Comment:comment})
    } catch (error) {
        res.status(400).json({Success:false,message:error.message})
        
    }

}
export const getAllComment = async(req,res)=>{
    try {
        const comments = await commentService.getAllComment(
            req.params.postId
        )
        res.status(200).json({Success:true,comments});
    } catch (error) {
        res.status(500).json({Success:false,message:error.message});
    }
}

export const deleteComment = async(req,res)=>{
    try {
        const deleteComments = await commentService.deleteComment(
            req.params.id,
            req.user.id,
        )
        res.status(200).json({Success:true,message:"Comment Deleted"})
    } catch (error) {
      res.status(400).json({ message: err.message });
  }
};