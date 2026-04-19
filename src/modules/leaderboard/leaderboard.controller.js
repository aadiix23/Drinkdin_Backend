import * as leaderboardService from "./leaderboard.service.js";

export const getLeaderboard = async(req,res)=>{
    try {
        const data = await leaderboardService.getLeaderboard();
        res.status(200).json({Success:true,leaderboard:data});
    } catch (error) {
        res.status(500).json({Success:false,message:error.message});
    }
}