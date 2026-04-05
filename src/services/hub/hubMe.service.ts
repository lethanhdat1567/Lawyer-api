import {
    createHubComment,
    createHubPostForUser,
    deleteHubComment,
    deleteMyHubPost,
    getMyHubPostDetail,
    listMyHubPosts,
    updateHubComment,
    updateMyHubPost,
} from "../hub.service.js";

class HubMeService {
    getPostById = getMyHubPostDetail;
    listPosts = listMyHubPosts;
    createPost = createHubPostForUser;
    updatePost = updateMyHubPost;
    deletePost = deleteMyHubPost;
    createComment = createHubComment;
    updateComment = updateHubComment;
    deleteComment = deleteHubComment;
}

export default new HubMeService();
