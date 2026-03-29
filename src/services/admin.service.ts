import type { Prisma } from "../../generated/prisma/client.js";
import {
  BlogPostStatus,
  LawyerVerificationStatus,
  ReportStatus,
  UserRole,
} from "../../generated/prisma/enums.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { HttpError } from "../lib/httpError.js";
import { getPrisma } from "../lib/prisma.js";
import { contributionTierFromScore } from "./reputation.service.js";

const userWhereActive: Prisma.UserWhereInput = { deletedAt: null };

export type AdminStatsDto = {
  usersTotal: number;
  lawyerVerificationsPending: number;
  reportsOpen: number;
  hubPostsTotal: number;
  hubCommentsTotal: number;
  blogPostsPublished: number;
  assistantMessagesTotal: number;
};

export async function getAdminStats(): Promise<AdminStatsDto> {
  const prisma = getPrisma();

  const [
    userCount,
    pendingVerifications,
    openReports,
    hubPostCount,
    hubCommentCount,
    blogPublishedCount,
    assistantMessageCount,
  ] = await Promise.all([
    prisma.user.count({ where: userWhereActive }),
    prisma.lawyerVerification.count({
      where: {
        status: LawyerVerificationStatus.PENDING,
        deletedAt: null,
      },
    }),
    prisma.report.count({ where: { status: ReportStatus.OPEN } }),
    prisma.hubPost.count({ where: { deletedAt: null } }),
    prisma.hubComment.count({ where: { deletedAt: null } }),
    prisma.blogPost.count({
      where: { deletedAt: null, status: BlogPostStatus.PUBLISHED },
    }),
    prisma.assistantMessage.count(),
  ]);

  return {
    usersTotal: userCount,
    lawyerVerificationsPending: pendingVerifications,
    reportsOpen: openReports,
    hubPostsTotal: hubPostCount,
    hubCommentsTotal: hubCommentCount,
    blogPostsPublished: blogPublishedCount,
    assistantMessagesTotal: assistantMessageCount,
  };
}

export async function adminListUsers(params: {
  page: number;
  pageSize: number;
  q?: string;
  role?: UserRole;
}) {
  const prisma = getPrisma();
  const where: Prisma.UserWhereInput = { ...userWhereActive };
  if (params.role) where.role = params.role;
  if (params.q?.trim()) {
    const q = params.q.trim();
    where.OR = [
      { email: { contains: q } },
      { profile: { is: { username: { contains: q }, deletedAt: null } } },
      { profile: { is: { displayName: { contains: q }, deletedAt: null } } },
    ];
  }

  const skip = (params.page - 1) * params.pageSize;
  const [rows, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: params.pageSize,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        emailVerifiedAt: true,
        profile: {
          select: {
            username: true,
            displayName: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    items: rows.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt.toISOString(),
      emailVerifiedAt: u.emailVerifiedAt?.toISOString() ?? null,
      username: u.profile?.username ?? null,
      displayName: u.profile?.displayName ?? null,
    })),
    total,
    page: params.page,
    pageSize: params.pageSize,
  };
}

export async function adminPatchUserRole(
  actorId: string,
  targetUserId: string,
  newRole: UserRole,
) {
  const prisma = getPrisma();
  const target = await prisma.user.findFirst({
    where: { id: targetUserId, deletedAt: null },
    select: { id: true, role: true },
  });
  if (!target) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "User not found",
      ErrorCode.NOT_FOUND,
    );
  }

  if (target.role === UserRole.ADMIN && newRole !== UserRole.ADMIN) {
    if (actorId === targetUserId) {
      throw new HttpError(
        HttpStatus.FORBIDDEN,
        "Cannot demote yourself",
        ErrorCode.FORBIDDEN,
      );
    }
    const adminCount = await prisma.user.count({
      where: { role: UserRole.ADMIN, deletedAt: null },
    });
    if (adminCount <= 1) {
      throw new HttpError(
        HttpStatus.FORBIDDEN,
        "Cannot remove last admin",
        ErrorCode.FORBIDDEN,
      );
    }
  }

  const updated = await prisma.user.update({
    where: { id: targetUserId },
    data: { role: newRole },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      emailVerifiedAt: true,
      profile: { select: { username: true, displayName: true } },
    },
  });

  return {
    user: {
      id: updated.id,
      email: updated.email,
      role: updated.role,
      createdAt: updated.createdAt.toISOString(),
      emailVerifiedAt: updated.emailVerifiedAt?.toISOString() ?? null,
      username: updated.profile?.username ?? null,
      displayName: updated.profile?.displayName ?? null,
    },
  };
}

export async function adminListLawyerVerifications(params: {
  page: number;
  pageSize: number;
  status?: LawyerVerificationStatus;
}) {
  const prisma = getPrisma();
  const where: Prisma.LawyerVerificationWhereInput = { deletedAt: null };
  if (params.status) where.status = params.status;

  const skip = (params.page - 1) * params.pageSize;
  const [rows, total] = await Promise.all([
    prisma.lawyerVerification.findMany({
      where,
      skip,
      take: params.pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            profile: {
              select: { username: true, displayName: true },
            },
          },
        },
        reviewedBy: {
          select: {
            email: true,
            profile: { select: { username: true } },
          },
        },
      },
    }),
    prisma.lawyerVerification.count({ where }),
  ]);

  return {
    items: rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      status: r.status,
      jurisdiction: r.jurisdiction,
      barNumber: r.barNumber,
      firmName: r.firmName,
      evidenceJson: r.evidenceJson,
      note: r.note,
      reviewedAt: r.reviewedAt?.toISOString() ?? null,
      reviewedByUserId: r.reviewedByUserId,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      user: {
        id: r.user.id,
        email: r.user.email,
        role: r.user.role,
        username: r.user.profile?.username ?? null,
        displayName: r.user.profile?.displayName ?? null,
      },
      reviewedBy: r.reviewedBy
        ? {
            email: r.reviewedBy.email,
            username: r.reviewedBy.profile?.username ?? null,
          }
        : null,
    })),
    total,
    page: params.page,
    pageSize: params.pageSize,
  };
}

export async function adminPatchLawyerVerification(
  actorId: string,
  verificationId: string,
  input: {
    status: "APPROVED" | "REJECTED" | "REVOKED";
    note?: string;
  },
) {
  const prisma = getPrisma();
  const row = await prisma.lawyerVerification.findFirst({
    where: { id: verificationId, deletedAt: null },
  });
  if (!row) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Verification not found",
      ErrorCode.NOT_FOUND,
    );
  }

  const now = new Date();

  if (input.status === LawyerVerificationStatus.APPROVED) {
    if (row.status !== LawyerVerificationStatus.PENDING) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Only PENDING verifications can be approved",
        ErrorCode.VALIDATION_ERROR,
      );
    }
    await prisma.$transaction([
      prisma.lawyerVerification.update({
        where: { id: verificationId },
        data: {
          status: LawyerVerificationStatus.APPROVED,
          reviewedByUserId: actorId,
          reviewedAt: now,
          ...(input.note !== undefined ? { note: input.note } : {}),
        },
      }),
      prisma.user.update({
        where: { id: row.userId },
        data: { role: UserRole.VERIFIED_LAWYER },
      }),
    ]);
  } else if (input.status === LawyerVerificationStatus.REJECTED) {
    if (row.status !== LawyerVerificationStatus.PENDING) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Only PENDING verifications can be rejected",
        ErrorCode.VALIDATION_ERROR,
      );
    }
    await prisma.lawyerVerification.update({
      where: { id: verificationId },
      data: {
        status: LawyerVerificationStatus.REJECTED,
        reviewedByUserId: actorId,
        reviewedAt: now,
        ...(input.note !== undefined ? { note: input.note } : {}),
      },
    });
  } else {
    if (row.status !== LawyerVerificationStatus.APPROVED) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Only APPROVED verifications can be revoked",
        ErrorCode.VALIDATION_ERROR,
      );
    }
    await prisma.$transaction([
      prisma.lawyerVerification.update({
        where: { id: verificationId },
        data: {
          status: LawyerVerificationStatus.REVOKED,
          reviewedByUserId: actorId,
          reviewedAt: now,
          ...(input.note !== undefined ? { note: input.note } : {}),
        },
      }),
      prisma.user.update({
        where: { id: row.userId },
        data: { role: UserRole.USER },
      }),
    ]);
  }

  const updated = await prisma.lawyerVerification.findFirst({
    where: { id: verificationId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          profile: {
            select: { username: true, displayName: true },
          },
        },
      },
    },
  });
  if (!updated) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Verification not found",
      ErrorCode.NOT_FOUND,
    );
  }

  return {
    verification: {
      id: updated.id,
      userId: updated.userId,
      status: updated.status,
      note: updated.note,
      reviewedAt: updated.reviewedAt?.toISOString() ?? null,
      user: {
        id: updated.user.id,
        email: updated.user.email,
        role: updated.user.role,
        username: updated.user.profile?.username ?? null,
        displayName: updated.user.profile?.displayName ?? null,
      },
    },
  };
}

export async function adminListReports(params: {
  page: number;
  pageSize: number;
  status?: ReportStatus;
}) {
  const prisma = getPrisma();
  const where: Prisma.ReportWhereInput = {};
  if (params.status) where.status = params.status;

  const skip = (params.page - 1) * params.pageSize;
  const [rows, total] = await Promise.all([
    prisma.report.findMany({
      where,
      skip,
      take: params.pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        reporter: {
          select: {
            id: true,
            email: true,
            profile: {
              select: { username: true, displayName: true },
            },
          },
        },
        handledBy: {
          select: {
            id: true,
            email: true,
            profile: { select: { username: true } },
          },
        },
      },
    }),
    prisma.report.count({ where }),
  ]);

  return {
    items: rows.map((r) => ({
      id: r.id,
      reporterId: r.reporterId,
      targetType: r.targetType,
      targetId: r.targetId,
      reason: r.reason,
      status: r.status,
      handledByUserId: r.handledByUserId,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      reporter: {
        id: r.reporter.id,
        email: r.reporter.email,
        username: r.reporter.profile?.username ?? null,
        displayName: r.reporter.profile?.displayName ?? null,
      },
      handledBy: r.handledBy
        ? {
            id: r.handledBy.id,
            email: r.handledBy.email,
            username: r.handledBy.profile?.username ?? null,
          }
        : null,
    })),
    total,
    page: params.page,
    pageSize: params.pageSize,
  };
}

export async function adminPatchReport(
  actorId: string,
  reportId: string,
  status: "ACTIONED" | "DISMISSED",
) {
  const prisma = getPrisma();
  const row = await prisma.report.findUnique({ where: { id: reportId } });
  if (!row) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Report not found",
      ErrorCode.NOT_FOUND,
    );
  }
  if (row.status !== ReportStatus.OPEN) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Only OPEN reports can be updated",
      ErrorCode.VALIDATION_ERROR,
    );
  }

  const updated = await prisma.report.update({
    where: { id: reportId },
    data: {
      status,
      handledByUserId: actorId,
    },
    include: {
      reporter: {
        select: {
          id: true,
          email: true,
          profile: { select: { username: true } },
        },
      },
    },
  });

  return {
    report: {
      id: updated.id,
      status: updated.status,
      handledByUserId: updated.handledByUserId,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    },
  };
}

export type AdminLeaderboardItemDto = {
  rank: number;
  userId: string;
  email: string;
  score: number;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  userRole: UserRole;
  tierCode: string;
  tierLabelVi: string;
};

export async function adminListLeaderboard(params: {
  limit: number;
  offset: number;
}): Promise<{ items: AdminLeaderboardItemDto[]; total: number }> {
  const prisma = getPrisma();
  const where: Prisma.UserContributionScoreWhereInput = {
    user: { deletedAt: null },
  };

  const total = await prisma.userContributionScore.count({ where });

  const rows = await prisma.userContributionScore.findMany({
    where,
    orderBy: { score: "desc" },
    skip: params.offset,
    take: params.limit,
    include: {
      user: {
        include: { profile: true },
      },
    },
  });

  const items: AdminLeaderboardItemDto[] = rows.map((row, index) => {
    const p = row.user.profile;
    const tier = contributionTierFromScore(row.score);
    return {
      rank: params.offset + index + 1,
      userId: row.userId,
      email: row.user.email,
      score: row.score,
      username: p?.username ?? null,
      displayName: p?.displayName ?? null,
      avatarUrl: p?.avatarUrl ?? null,
      userRole: row.user.role,
      tierCode: tier.code,
      tierLabelVi: tier.labelVi,
    };
  });

  return { items, total };
}

export async function adminListLegalSources(params: {
  page: number;
  pageSize: number;
  q?: string;
}) {
  const prisma = getPrisma();
  const where: Prisma.LegalSourceWhereInput = { deletedAt: null };
  if (params.q?.trim()) {
    const q = params.q.trim();
    where.OR = [
      { title: { contains: q } },
      { jurisdiction: { contains: q } },
    ];
  }

  const skip = (params.page - 1) * params.pageSize;
  const [rows, total] = await Promise.all([
    prisma.legalSource.findMany({
      where,
      skip,
      take: params.pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.legalSource.count({ where }),
  ]);

  return {
    items: rows.map((r) => ({
      id: r.id,
      title: r.title,
      sourceUrl: r.sourceUrl,
      jurisdiction: r.jurisdiction,
      effectiveFrom: r.effectiveFrom?.toISOString() ?? null,
      effectiveTo: r.effectiveTo?.toISOString() ?? null,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
    total,
    page: params.page,
    pageSize: params.pageSize,
  };
}

export async function adminCreateLegalSource(data: {
  title: string;
  sourceUrl?: string | null;
  jurisdiction?: string | null;
  effectiveFrom?: Date | null;
  effectiveTo?: Date | null;
}) {
  const prisma = getPrisma();
  const row = await prisma.legalSource.create({
    data: {
      title: data.title,
      sourceUrl: data.sourceUrl ?? null,
      jurisdiction: data.jurisdiction ?? null,
      effectiveFrom: data.effectiveFrom ?? null,
      effectiveTo: data.effectiveTo ?? null,
    },
  });
  return {
    source: {
      id: row.id,
      title: row.title,
      sourceUrl: row.sourceUrl,
      jurisdiction: row.jurisdiction,
      effectiveFrom: row.effectiveFrom?.toISOString() ?? null,
      effectiveTo: row.effectiveTo?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    },
  };
}

export async function adminPatchLegalSource(
  id: string,
  data: {
    title?: string;
    sourceUrl?: string | null;
    jurisdiction?: string | null;
    effectiveFrom?: Date | null;
    effectiveTo?: Date | null;
  },
) {
  const prisma = getPrisma();
  const existing = await prisma.legalSource.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Legal source not found",
      ErrorCode.NOT_FOUND,
    );
  }
  const row = await prisma.legalSource.update({
    where: { id },
    data,
  });
  return {
    source: {
      id: row.id,
      title: row.title,
      sourceUrl: row.sourceUrl,
      jurisdiction: row.jurisdiction,
      effectiveFrom: row.effectiveFrom?.toISOString() ?? null,
      effectiveTo: row.effectiveTo?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    },
  };
}

export async function adminSoftDeleteLegalSource(id: string) {
  const prisma = getPrisma();
  const existing = await prisma.legalSource.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Legal source not found",
      ErrorCode.NOT_FOUND,
    );
  }
  await prisma.legalSource.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return { ok: true as const };
}
