import admin from "firebase-admin";
import type { DecodedIdToken } from "firebase-admin/auth";

let initialized = false;

function initializeFirebaseAdmin(): void {
    if (initialized || admin.apps.length > 0) {
        initialized = true;
        return;
    }
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (!projectId || !clientEmail || !privateKey) {
        throw new Error(
            "Firebase Admin env missing: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY",
        );
    }
    privateKey = privateKey.replace(/\\n/g, "\n");
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
        }),
    });
    initialized = true;
}

export async function verifyFirebaseIdToken(
    idToken: string,
): Promise<DecodedIdToken> {
    initializeFirebaseAdmin();
    return admin.auth().verifyIdToken(idToken);
}
