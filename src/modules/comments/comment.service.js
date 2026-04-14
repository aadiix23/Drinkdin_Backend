import Comment from "./comments.model.js";

//add comment
export const addComment = async(postId,userId,text)=>{
    const comment = await Comment.create({
        post:postId,
        user:userId,
        text,
    });
    return comment;
}

//get comment
export const getAllComment = async(postId)=>{
    return await Comment.find({post:postId})
    .populate("user","fullname")
    .sort({created:-1});
}

//deleteComment

export const deleteComment = async(commentId,userId)=>{
    const comment  = await Comment.findById(commentId);
    if(!comment) throw new Error ("Comment Not Found");

  if (comment.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  await comment.deleteOne();
  return { message: "Comment deleted" };
}