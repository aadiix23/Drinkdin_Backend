import * as followService from "./follow.service.js";
export const toggleFollow = async(req,res)=>{
    try {
        const result = await followService.toggleFollow(
            req.user.id,
            req.params.userId
        )
        res.status(200).json({
            Success:true,
            ...result
        })
    } catch (error) {
        res.status(400).json({
            Success:false,
            message:error.message
        })
    }
}