import {
    createHubComment,
    createHubPostForUser,
    getMyHubPostDetail,
    listMyHubPosts,
    softDeleteHubComment,
    softDeleteMyHubPost,
    updateHubComment,
    updateMyHubPost,
} from "../hub.service.js";

class HubMeService {
    getPostById = getMyHubPostDetail;
    listPosts = listMyHubPosts;
    createPost = createHubPostForUser;
    updatePost = updateMyHubPost;
    deletePost = softDeleteMyHubPost;
    createComment = createHubComment;
    updateComment = updateHubComment;
    deleteComment = softDeleteHubComment;
}

export default new HubMeService();
