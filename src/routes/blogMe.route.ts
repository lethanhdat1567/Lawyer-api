import { Router } from "express";
import blogMeController from "../controllers/blogMe.controller.js";

export const blogMeRouter = Router();

blogMeRouter.get("/saved-posts", blogMeController.getMySavedBlogPosts);
blogMeRouter.get(
    "/engagement-batch",
    blogMeController.getMyBlogEngagementBatch,
);
blogMeRouter.get(
    "/comment-likes-batch",
    blogMeController.getMyBlogCommentLikesBatch,
);
blogMeRouter.get("/posts", blogMeController.getMyBlogPosts);
blogMeRouter.post(
    "/posts/:postId/comments",
    blogMeController.postMyBlogPostComment,
);
blogMeRouter.patch(
    "/posts/:postId/comments/:commentId",
    blogMeController.patchMyBlogPostComment,
);
blogMeRouter.delete(
    "/posts/:postId/comments/:commentId",
    blogMeController.deleteMyBlogPostComment,
);
blogMeRouter.post(
    "/posts/:postId/comments/:commentId/like",
    blogMeController.postMyBlogPostCommentLike,
);
blogMeRouter.get(
    "/posts/:postId/engagement",
    blogMeController.getMyBlogPostEngagement,
);
blogMeRouter.post("/posts/:postId/like", blogMeController.postMyBlogPostLike);
blogMeRouter.post("/posts/:postId/save", blogMeController.postMyBlogPostSave);
blogMeRouter.get("/posts/:id", blogMeController.getMyBlogPostByIdHandler);
blogMeRouter.post("/posts", blogMeController.postMyBlogPost);
blogMeRouter.patch("/posts/:id", blogMeController.patchMyBlogPost);
blogMeRouter.delete("/posts/:id", blogMeController.deleteMyBlogPost);
