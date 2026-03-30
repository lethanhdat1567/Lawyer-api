import {
    getPublishedHubPostBySlug,
    listHubCategories,
    listPublishedHubPosts,
} from "../hub.service.js";

class HubPublicService {
    listCategories = listHubCategories;
    listPosts = listPublishedHubPosts;
    getPostBySlug = getPublishedHubPostBySlug;
}

export default new HubPublicService();
