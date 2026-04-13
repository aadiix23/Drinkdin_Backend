import postService from "./post.service";

export const createPost = async(req,res)=>{
    try {
        const post = await postService.createPost(req.user.id,req.body);
        res.status(201).json({Success:true,post})
    } catch (error) {
    res.status(400).json({Success:false,message:error.message})
        
    }
}

export const getAllPosts = async(req,res)=>{
    try {
        const post = await postService.getAllPosts();
        res.status(200).json({
            Success:true,
            post
        })
    } catch (error) {
        res.status(500).json({Success:false,message:error.message})
        
    }
}

export const deletePost = async(req,res)=>{
    try {
        const deletePost = await postService.deletePost(req.params.id,req.user.id);
        res.status(200).json({Success:true,...deletePost});
    } catch (error) {
        res.status(400).json({Success:false,Message:error.message})
    }
}

module.exports={createPost,getAllPosts,deletePost};