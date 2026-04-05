import {
    adminCreateBlogTag,
    adminCreateBlogPost,
    adminDeleteBlogPost,
    adminDeleteBlogTag,
    adminListBlogPosts,
    adminUpdateBlogTag,
    adminUpdateBlogPost,
    adminUpdateBlogPostVerification,
    getAdminBlogPostById,
} from "../blog.service.js";

class BlogAdminService {
    createTag = adminCreateBlogTag;
    updateTag = adminUpdateBlogTag;
    deleteTag = adminDeleteBlogTag;
    getPostById = getAdminBlogPostById;
    listPosts = adminListBlogPosts;
    createPost = adminCreateBlogPost;
    updatePost = adminUpdateBlogPost;
    updatePostVerification = adminUpdateBlogPostVerification;
    deletePost = adminDeleteBlogPost;
}

export default new BlogAdminService();
