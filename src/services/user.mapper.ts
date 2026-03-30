import type { Profile, User } from "../../generated/prisma/client.js";

export type PublicProfile = {
    displayName: string | null;
    avatarUrl: string | null;
    bio: string | null;
    contributorOptOut: boolean;
};

export type PublicUser = {
    id: string;
    email: string;
    role: string;
    emailVerifiedAt: Date | null;
    username: string | null;
    profile: PublicProfile;
};

export function profileFromRow(p: Profile | null | undefined): PublicProfile {
    if (!p) {
        return {
            displayName: null,
            avatarUrl: null,
            bio: null,
            contributorOptOut: false,
        };
    }
    return {
        displayName: p.displayName,
        avatarUrl: p.avatarUrl,
        bio: p.bio,
        contributorOptOut: p.contributorOptOut,
    };
}

export function toPublicUser(
    user: User & { profile?: Profile | null },
): PublicUser {
    return {
        id: user.id,
        email: user.email,
        role: user.role,
        emailVerifiedAt: user.emailVerifiedAt,
        username: user.profile?.username ?? null,
        profile: profileFromRow(user.profile ?? null),
    };
}
