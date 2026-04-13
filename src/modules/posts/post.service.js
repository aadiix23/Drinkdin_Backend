import Post from '../../utils/postRequest';
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
    .populate("user","fullname")
    .sort({createdAt:-1})
 }

 //deletepost 

 export const deletePost=async(postId,userId)=>{
    const post = await post.findById(postId);
    if(!post) throw new error ("POst Not Found");
    if(post.user.toString()!==userId){
        throw new error ("Unauthorized")
    }
    await post.deleteOne();
    return {Message:"Post Deleted"}
 }

 module.exports={createPost,getAllPost,deletePost}