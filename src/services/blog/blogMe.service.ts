import {
    createBlogComment,
    createBlogPostForUser,
    deleteBlogComment,
    deleteMyBlogPost,
    getBlogPostEngagement,
    getBlogPostsEngagementBatch,
    getMyBlogPostById,
    listMyBlogPosts,
    listMySavedBlogPosts,
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
    deletePost = deleteMyBlogPost;
    createComment = createBlogComment;
    updateComment = updateBlogComment;
    deleteComment = deleteBlogComment;
    getPostEngagement = getBlogPostEngagement;
    togglePostLike = toggleBlogPostLike;
    togglePostSave = toggleSavedBlogPost;
}

export default new BlogMeService();
