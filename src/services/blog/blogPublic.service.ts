import {
    getPublishedBlogPostBySlug,
    listPublicBlogTags,
    listPublishedBlogPosts,
} from "../blog.service.js";

class BlogPublicService {
    listTags = listPublicBlogTags;
    listPublishedPosts = listPublishedBlogPosts;
    getPublishedPostBySlug = getPublishedBlogPostBySlug;
}

export default new BlogPublicService();
