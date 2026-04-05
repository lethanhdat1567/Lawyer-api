import { BlogPostStatus, LawyerVerificationStatus } from "../../../generated/prisma/enums.js";
import { getPrisma } from "../../lib/prisma.js";

export type AdminDashboardRange = "7d" | "30d" | "3m";
export type AdminDashboardGranularity = "day";

export type AdminStatsDto = {
    usersTotal: number;
    lawyerVerificationsPending: number;
    hubPostsTotal: number;
    hubCommentsTotal: number;
    blogPostsPublished: number;
    assistantMessagesTotal: number;
};

export type AdminDashboardSnapshotDto = {
    usersTotal: number;
    usersNew7d: number;
    usersEmailVerifiedTotal: number;
    lawyerVerificationsPending: number;
    lawyerVerificationsApproved: number;
    blogPostsPublished: number;
    blogPostsPublishedUnverified: number;
    hubPostsTotal: number;
    hubCommentsTotal: number;
    contributorsActiveTotal: number;
    chatMessagesTotal: number;
    chatSessionsTotal: number;
    legacyAssistantMessagesTotal: number;
};

export type AdminDashboardQueuesDto = {
    lawyerVerificationsPending: number;
    blogPostsPublishedUnverified: number;
    usersNew7d: number;
};

export type AdminDashboardTimeseriesPointDto = {
    bucketStart: string;
    usersNew: number;
    hubPosts: number;
    hubComments: number;
    blogPublished: number;
    chatMessages: number;
};

export type AdminDashboardDto = {
    range: AdminDashboardRange;
    granularity: AdminDashboardGranularity;
    metricSources: {
        legacyStatsChatTotal: "assistant_messages";
        dashboardChatTotal: "chat_messages";
        chartChatActivity: "chat_messages";
    };
    snapshot: AdminDashboardSnapshotDto;
    queues: AdminDashboardQueuesDto;
    timeseries: AdminDashboardTimeseriesPointDto[];
};

export type AdminStatsResponseDto = {
    stats: AdminStatsDto;
    dashboard: AdminDashboardDto;
};

type TimeBucket = { bucketStart: Date; key: string };

class AdminStatsService {
    async getStats(input: {
        range: AdminDashboardRange;
        granularity: AdminDashboardGranularity;
    }): Promise<AdminStatsResponseDto> {
        const prisma = getPrisma();
        const now = new Date();
        const last7dStart = this.startOfUtcDay(this.shiftUtcDays(now, -6));
        const rangeStart = this.getRangeStart(now, input.range);
        const buckets = this.buildBuckets(rangeStart, now, input.granularity);

        const [
            usersTotal,
            usersNew7d,
            usersEmailVerifiedTotal,
            pendingVerifications,
            approvedVerifications,
            hubPostCount,
            hubCommentCount,
            blogPublishedCount,
            blogPublishedUnverifiedCount,
            contributorsActiveTotal,
            legacyAssistantMessagesTotal,
            chatMessagesTotal,
            chatSessionsTotal,
            recentUsers,
            recentHubPosts,
            recentHubComments,
            recentPublishedBlogPosts,
            recentChatMessages,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({
                where: {
                    createdAt: { gte: last7dStart },
                },
            }),
            prisma.user.count({
                where: {
                    emailVerifiedAt: { not: null },
                },
            }),
            prisma.lawyerVerification.count({
                where: {
                    status: LawyerVerificationStatus.PENDING,
                },
            }),
            prisma.lawyerVerification.count({
                where: {
                    status: LawyerVerificationStatus.APPROVED,
                },
            }),
            prisma.hubPost.count(),
            prisma.hubComment.count(),
            prisma.blogPost.count({
                where: { status: BlogPostStatus.PUBLISHED },
            }),
            prisma.blogPost.count({
                where: {
                    status: BlogPostStatus.PUBLISHED,
                    isVerified: false,
                },
            }),
            prisma.userContributionScore.count({
                where: {
                    score: { gt: 0 },
                },
            }),
            prisma.assistantMessage.count(),
            prisma.chatMessage.count(),
            prisma.chatSession.count(),
            prisma.user.findMany({
                where: {
                    createdAt: { gte: rangeStart },
                },
                select: { createdAt: true },
            }),
            prisma.hubPost.findMany({
                where: {
                    createdAt: { gte: rangeStart },
                },
                select: { createdAt: true },
            }),
            prisma.hubComment.findMany({
                where: {
                    createdAt: { gte: rangeStart },
                },
                select: { createdAt: true },
            }),
            prisma.blogPost.findMany({
                where: {
                    status: BlogPostStatus.PUBLISHED,
                    createdAt: { gte: rangeStart },
                },
                select: { createdAt: true },
            }),
            prisma.chatMessage.findMany({
                where: {
                    createdAt: { gte: rangeStart },
                },
                select: { createdAt: true },
            }),
        ]);

        const stats: AdminStatsDto = {
            usersTotal,
            lawyerVerificationsPending: pendingVerifications,
            hubPostsTotal: hubPostCount,
            hubCommentsTotal: hubCommentCount,
            blogPostsPublished: blogPublishedCount,
            assistantMessagesTotal: legacyAssistantMessagesTotal,
        };

        const snapshot: AdminDashboardSnapshotDto = {
            usersTotal,
            usersNew7d,
            usersEmailVerifiedTotal,
            lawyerVerificationsPending: pendingVerifications,
            lawyerVerificationsApproved: approvedVerifications,
            blogPostsPublished: blogPublishedCount,
            blogPostsPublishedUnverified: blogPublishedUnverifiedCount,
            hubPostsTotal: hubPostCount,
            hubCommentsTotal: hubCommentCount,
            contributorsActiveTotal,
            chatMessagesTotal,
            chatSessionsTotal,
            legacyAssistantMessagesTotal,
        };

        const queues: AdminDashboardQueuesDto = {
            lawyerVerificationsPending: pendingVerifications,
            blogPostsPublishedUnverified: blogPublishedUnverifiedCount,
            usersNew7d,
        };

        const timeseries = this.buildTimeseries({
            buckets,
            recentUsers,
            recentHubPosts,
            recentHubComments,
            recentPublishedBlogPosts,
            recentChatMessages,
        });

        return {
            stats,
            dashboard: {
                range: input.range,
                granularity: input.granularity,
                metricSources: {
                    legacyStatsChatTotal: "assistant_messages",
                    dashboardChatTotal: "chat_messages",
                    chartChatActivity: "chat_messages",
                },
                snapshot,
                queues,
                timeseries,
            },
        };
    }

    private buildTimeseries(input: {
        buckets: TimeBucket[];
        recentUsers: Array<{ createdAt: Date }>;
        recentHubPosts: Array<{ createdAt: Date }>;
        recentHubComments: Array<{ createdAt: Date }>;
        recentPublishedBlogPosts: Array<{ createdAt: Date }>;
        recentChatMessages: Array<{ createdAt: Date }>;
    }): AdminDashboardTimeseriesPointDto[] {
        const countsByBucket = new Map<
            string,
            Omit<AdminDashboardTimeseriesPointDto, "bucketStart">
        >();

        for (const bucket of input.buckets) {
            countsByBucket.set(bucket.key, {
                usersNew: 0,
                hubPosts: 0,
                hubComments: 0,
                blogPublished: 0,
                chatMessages: 0,
            });
        }

        this.bumpBuckets(input.recentUsers, countsByBucket, "usersNew");
        this.bumpBuckets(input.recentHubPosts, countsByBucket, "hubPosts");
        this.bumpBuckets(input.recentHubComments, countsByBucket, "hubComments");
        this.bumpBuckets(
            input.recentPublishedBlogPosts,
            countsByBucket,
            "blogPublished",
        );
        this.bumpBuckets(
            input.recentChatMessages,
            countsByBucket,
            "chatMessages",
        );

        return input.buckets.map((bucket) => {
            const counts = countsByBucket.get(bucket.key);
            return {
                bucketStart: bucket.bucketStart.toISOString(),
                usersNew: counts?.usersNew ?? 0,
                hubPosts: counts?.hubPosts ?? 0,
                hubComments: counts?.hubComments ?? 0,
                blogPublished: counts?.blogPublished ?? 0,
                chatMessages: counts?.chatMessages ?? 0,
            };
        });
    }

    private bumpBuckets(
        rows: Array<{ createdAt: Date }>,
        countsByBucket: Map<
            string,
            Omit<AdminDashboardTimeseriesPointDto, "bucketStart">
        >,
        key: keyof Omit<AdminDashboardTimeseriesPointDto, "bucketStart">,
    ) {
        for (const row of rows) {
            const bucketKey = this.toUtcDateKey(row.createdAt);
            const counts = countsByBucket.get(bucketKey);
            if (!counts) continue;
            counts[key] += 1;
        }
    }

    private buildBuckets(
        rangeStart: Date,
        now: Date,
        _granularity: AdminDashboardGranularity,
    ): TimeBucket[] {
        const buckets: TimeBucket[] = [];
        const cursor = new Date(rangeStart);
        const end = this.startOfUtcDay(now);

        while (cursor <= end) {
            buckets.push({
                bucketStart: new Date(cursor),
                key: this.toUtcDateKey(cursor),
            });
            cursor.setUTCDate(cursor.getUTCDate() + 1);
        }

        return buckets;
    }

    private getRangeStart(now: Date, range: AdminDashboardRange): Date {
        switch (range) {
            case "7d":
                return this.startOfUtcDay(this.shiftUtcDays(now, -6));
            case "30d":
                return this.startOfUtcDay(this.shiftUtcDays(now, -29));
            case "3m":
                return this.startOfUtcDay(this.shiftUtcDays(now, -89));
        }
    }

    private shiftUtcDays(date: Date, days: number): Date {
        const next = new Date(date);
        next.setUTCDate(next.getUTCDate() + days);
        return next;
    }

    private startOfUtcDay(date: Date): Date {
        return new Date(
            Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
        );
    }

    private toUtcDateKey(date: Date): string {
        return this.startOfUtcDay(date).toISOString().slice(0, 10);
    }
}

export default new AdminStatsService();
