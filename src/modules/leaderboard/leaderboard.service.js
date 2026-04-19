import Post from "../posts/posts.model.js";
export const getLeaderboard = async () => {
    const leaderboard = await Post.aggregate([
        {
            $group:{
                _id:"$user",
                totalPosts:{$sum:1},
                totalLikes:{$sum:{$size:"$likes"}},
            }
        },
        {
            $sort:{totalLikes:-1}
        },
        {
            $limit:10,
        },
        {
            $lookup:{
                from:"users",
                localField:"_id",
                foreignField:"_id",
                as:"user"
            }
        },
        {
            $unwind:"$user",
        },
        {
            $project:{
                _id:0,
                userId:"$user._id",
                fullName:"$user.fullname",
                totalPosts:1,
                totalLikes:1,
            },
        },
     ]);
     return leaderboard;
 };
