import {
    createBlogComment,
    createBlogPostForUser,
    getBlogPostEngagement,
    getBlogPostsEngagementBatch,
    getMyBlogPostById,
    listMyBlogPosts,
    listMySavedBlogPosts,
    softDeleteBlogComment,
    softDeleteMyBlogPost,
    toggleBlogPostLike,
    toggleSavedBlogPost,
    updateBlogComment,
    updateMyBlogPost,
} from "../blog.service.js";

class BlogMeService {
    getPostById = getMyBlogPostById;
    listPosts = listMyBlogPosts;
    listSavedPosts = listMySavedBlogPosts;
    getEngagementBatch = getBlogPostsEngagementBatch;
    createPost = createBlogPostForUser;
    updatePost = updateMyBlogPost;
    deletePost = softDeleteMyBlogPost;
    createComment = createBlogComment;
    updateComment = updateBlogComment;
    deleteComment = softDeleteBlogComment;
    getPostEngagement = getBlogPostEngagement;
    togglePostLike = toggleBlogPostLike;
    togglePostSave = toggleSavedBlogPost;
}

export default new BlogMeService();
