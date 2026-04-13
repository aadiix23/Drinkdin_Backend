import Post from "../posts/posts.model.js"
export const getFeed = async (page = 1, limit = 10) => {
  return await Post.find()
    .populate("user", "fullName")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};