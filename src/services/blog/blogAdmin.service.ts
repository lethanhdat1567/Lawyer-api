import {
    adminCreateBlogPost,
    adminListBlogPosts,
    adminSoftDeleteBlogPost,
    adminUpdateBlogPost,
    getAdminBlogPostById,
} from "../blog.service.js";

class BlogAdminService {
    getPostById = getAdminBlogPostById;
    listPosts = adminListBlogPosts;
    createPost = adminCreateBlogPost;
    updatePost = adminUpdateBlogPost;
    deletePost = adminSoftDeleteBlogPost;
}

export default new BlogAdminService();
