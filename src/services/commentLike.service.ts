import { ReputationReason } from "../../generated/prisma/enums.js";
import { DELTA_COMMENT_HELPFUL } from "../constants/reputation.constants.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { HttpError } from "../lib/httpError.js";
import { getPrisma } from "../lib/prisma.js";
import { applyReputationDelta } from "./reputation.service.js";

export async function toggleHubCommentLike(input: {
    actorUserId: string;
    postId: string;
    commentId: string;
}): Promise<{ liked: boolean; likeCount: number }> {
    const prisma = getPrisma();
    const comment = await prisma.hubComment.findFirst({
        where: {
            id: input.commentId,
            postId: input.postId,
            deletedAt: null,
        },
        select: { id: true, authorId: true },
    });
    if (!comment) {
        throw new HttpError(
            HttpStatus.NOT_FOUND,
            "Comment not found",
            ErrorCode.NOT_FOUND,
        );
    }
    if (comment.authorId === input.actorUserId) {
        throw new HttpError(
            HttpStatus.CONFLICT,
            "Cannot like your own comment",
            ErrorCode.VALIDATION_ERROR,
        );
    }

    const existing = await prisma.hubCommentLike.findUnique({
        where: {
            userId_hubCommentId: {
                userId: input.actorUserId,
                hubCommentId: input.commentId,
            },
        },
    });

    if (existing) {
        await prisma.hubCommentLike.delete({
            where: {
                userId_hubCommentId: {
                    userId: input.actorUserId,
                    hubCommentId: input.commentId,
                },
            },
        });
        await applyReputationDelta({
            userId: comment.authorId,
            delta: -DELTA_COMMENT_HELPFUL,
            reason: ReputationReason.HUB_REPLY_HELPFUL,
            refHubCommentId: input.commentId,
        });
    } else {
        await prisma.hubCommentLike.create({
            data: {
                userId: input.actorUserId,
                hubCommentId: input.commentId,
            },
        });
        await applyReputationDelta({
            userId: comment.authorId,
            delta: DELTA_COMMENT_HELPFUL,
            reason: ReputationReason.HUB_REPLY_HELPFUL,
            refHubCommentId: input.commentId,
        });
    }

    const likeCount = await prisma.hubCommentLike.count({
        where: { hubCommentId: input.commentId },
    });
    return { liked: !existing, likeCount };
}

export async function toggleBlogCommentLike(input: {
    actorUserId: string;
    postId: string;
    commentId: string;
}): Promise<{ liked: boolean; likeCount: number }> {
    const prisma = getPrisma();
    const comment = await prisma.blogComment.findFirst({
        where: {
            id: input.commentId,
            blogPostId: input.postId,
            deletedAt: null,
        },
        select: { id: true, authorId: true },
    });
    if (!comment) {
        throw new HttpError(
            HttpStatus.NOT_FOUND,
            "Comment not found",
            ErrorCode.NOT_FOUND,
        );
    }
    if (comment.authorId === input.actorUserId) {
        throw new HttpError(
            HttpStatus.CONFLICT,
            "Cannot like your own comment",
            ErrorCode.VALIDATION_ERROR,
        );
    }

    const existing = await prisma.blogCommentLike.findUnique({
        where: {
            userId_blogCommentId: {
                userId: input.actorUserId,
                blogCommentId: input.commentId,
            },
        },
    });

    if (existing) {
        await prisma.blogCommentLike.delete({
            where: {
                userId_blogCommentId: {
                    userId: input.actorUserId,
                    blogCommentId: input.commentId,
                },
            },
        });
        await applyReputationDelta({
            userId: comment.authorId,
            delta: -DELTA_COMMENT_HELPFUL,
            reason: ReputationReason.BLOG_COMMENT_HELPFUL,
            refBlogCommentId: input.commentId,
        });
    } else {
        await prisma.blogCommentLike.create({
            data: {
                userId: input.actorUserId,
                blogCommentId: input.commentId,
            },
        });
        await applyReputationDelta({
            userId: comment.authorId,
            delta: DELTA_COMMENT_HELPFUL,
            reason: ReputationReason.BLOG_COMMENT_HELPFUL,
            refBlogCommentId: input.commentId,
        });
    }

    const likeCount = await prisma.blogCommentLike.count({
        where: { blogCommentId: input.commentId },
    });
    return { liked: !existing, likeCount };
}

export async function batchHubCommentLikedByUser(params: {
    userId: string;
    commentIds: string[];
}): Promise<{ commentId: string; liked: boolean }[]> {
    if (params.commentIds.length === 0) return [];
    const prisma = getPrisma();
    const rows = await prisma.hubCommentLike.findMany({
        where: {
            userId: params.userId,
            hubCommentId: { in: params.commentIds },
        },
        select: { hubCommentId: true },
    });
    const set = new Set(rows.map((r) => r.hubCommentId));
    return params.commentIds.map((commentId) => ({
        commentId,
        liked: set.has(commentId),
    }));
}

export async function batchBlogCommentLikedByUser(params: {
    userId: string;
    commentIds: string[];
}): Promise<{ commentId: string; liked: boolean }[]> {
    if (params.commentIds.length === 0) return [];
    const prisma = getPrisma();
    const rows = await prisma.blogCommentLike.findMany({
        where: {
            userId: params.userId,
            blogCommentId: { in: params.commentIds },
        },
        select: { blogCommentId: true },
    });
    const set = new Set(rows.map((r) => r.blogCommentId));
    return params.commentIds.map((commentId) => ({
        commentId,
        liked: set.has(commentId),
    }));
}
