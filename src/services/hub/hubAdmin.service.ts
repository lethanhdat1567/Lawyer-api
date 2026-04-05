import {
    adminCreateHubPost,
    adminDeleteHubPost,
    adminListHubPosts,
    adminUpdateHubPost,
    getAdminHubPostDetail,
} from "../hub.service.js";

class HubAdminService {
    getPostById = getAdminHubPostDetail;
    listPosts = adminListHubPosts;
    createPost = adminCreateHubPost;
    updatePost = adminUpdateHubPost;
    deletePost = adminDeleteHubPost;
}

export default new HubAdminService();
