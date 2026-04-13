import * as feedService from "./feed.service.js";

export const getFeed = async(req,res)=>{
    try {
        const posts = await feedService.getFeed();
        res.json({
            Success:true,
            posts
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};