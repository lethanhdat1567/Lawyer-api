import { Router } from "express";
import * as hubMeController from "../controllers/hubMe.controller.js";

export const hubMeRouter = Router();

hubMeRouter.get("/posts", hubMeController.getMyHubPosts);
hubMeRouter.get(
  "/comment-likes-batch",
  hubMeController.getMyHubCommentLikesBatch,
);
hubMeRouter.post(
  "/posts/:postId/comments",
  hubMeController.postMyHubPostComment,
);
hubMeRouter.patch(
  "/posts/:postId/comments/:commentId",
  hubMeController.patchMyHubPostComment,
);
hubMeRouter.delete(
  "/posts/:postId/comments/:commentId",
  hubMeController.deleteMyHubPostComment,
);
hubMeRouter.post(
  "/posts/:postId/comments/:commentId/like",
  hubMeController.postMyHubPostCommentLike,
);
hubMeRouter.get("/posts/:id", hubMeController.getMyHubPostById);
hubMeRouter.post("/posts", hubMeController.postMyHubPost);
hubMeRouter.patch("/posts/:id", hubMeController.patchMyHubPost);
hubMeRouter.delete("/posts/:id", hubMeController.deleteMyHubPost);
