import User from "../auth/auth.model.js";

export const toggleFollow = async(currentUserId,targetUserId)=>{
    if(currentUserId === targetUserId){
        throw new Error("You can't follow yourself");
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if(!currentUser) throw new Error("Current user not found");
    if(!targetUser) throw new Error("Target user not found");

    currentUser.following = Array.isArray(currentUser.following) ? currentUser.following : [];
    currentUser.followers = Array.isArray(currentUser.followers) ? currentUser.followers : [];
    targetUser.following = Array.isArray(targetUser.following) ? targetUser.following : [];
    targetUser.followers = Array.isArray(targetUser.followers) ? targetUser.followers : [];

    const isFollowing = currentUser.following.some(
        (id) => id.toString() === targetUserId.toString()
    );

    if (isFollowing) {
        currentUser.following = currentUser.following.filter(
            (id) => id.toString() !== targetUserId.toString()
        );
        targetUser.followers = targetUser.followers.filter(
            (id) => id.toString() !== currentUserId.toString()
        );
    } else {
        currentUser.following.push(targetUserId);
        targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    return {
        following: !isFollowing,
    };
};