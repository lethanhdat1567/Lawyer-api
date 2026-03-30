import {
    adminCreateHubPost,
    adminListHubPosts,
    adminSoftDeleteHubPost,
    adminUpdateHubPost,
    getAdminHubPostDetail,
} from "../hub.service.js";

class HubAdminService {
    getPostById = getAdminHubPostDetail;
    listPosts = adminListHubPosts;
    createPost = adminCreateHubPost;
    updatePost = adminUpdateHubPost;
    deletePost = adminSoftDeleteHubPost;
}

export default new HubAdminService();
