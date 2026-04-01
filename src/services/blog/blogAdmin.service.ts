import {
    adminCreateBlogTag,
    adminCreateBlogPost,
    adminListBlogPosts,
    adminSoftDeleteBlogTag,
    adminSoftDeleteBlogPost,
    adminUpdateBlogTag,
    adminUpdateBlogPost,
    adminUpdateBlogPostVerification,
    getAdminBlogPostById,
} from "../blog.service.js";

class BlogAdminService {
    createTag = adminCreateBlogTag;
    updateTag = adminUpdateBlogTag;
    deleteTag = adminSoftDeleteBlogTag;
    getPostById = getAdminBlogPostById;
    listPosts = adminListBlogPosts;
    createPost = adminCreateBlogPost;
    updatePost = adminUpdateBlogPost;
    updatePostVerification = adminUpdateBlogPostVerification;
    deletePost = adminSoftDeleteBlogPost;
}

export default new BlogAdminService();
