import User from '../auth/auth.model.js'

export const getProfile = async(userId)=>{
    const user =  await User.findById(userId).select("fullname username email followers following")
    return{
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    followersCount: user.followers.length,
    followingCount: user.following.length
    }
};