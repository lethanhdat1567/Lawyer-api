import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

const RESET_TTL_MIN = Number(process.env.PASSWORD_RESET_TTL_MINUTES) || 30;

let transporter: Transporter | null = null;

function isSmtpConfigured(): boolean {
    const host = process.env.SMTP_HOST?.trim();
    const port = process.env.SMTP_PORT?.trim();
    const from = process.env.EMAIL_FROM?.trim();
    return Boolean(host && port && from);
}

function assertProductionSmtp(): void {
    if (process.env.NODE_ENV === "production" && !isSmtpConfigured()) {
        throw new Error(
            "SMTP is not configured: set SMTP_HOST, SMTP_PORT, and EMAIL_FROM",
        );
    }
}

function getTransporter(): Transporter {
    if (transporter) return transporter;
    const host = process.env.SMTP_HOST!.trim();
    const portRaw = process.env.SMTP_PORT!.trim();
    const port = Number.parseInt(portRaw, 10);
    if (!Number.isFinite(port) || port < 1 || port > 65535) {
        throw new Error("Invalid SMTP_PORT");
    }
    const secure = process.env.SMTP_SECURE === "true";
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS;
    const hasAuth = Boolean(user && pass !== undefined && pass !== "");
    transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: hasAuth ? { user: user!, pass: pass! } : undefined,
    });
    return transporter;
}

export async function sendEmailVerification(
    email: string,
    rawToken: string,
): Promise<void> {
    const verifyUrl = `${FRONTEND_URL.replace(/\/$/, "")}/verify-email?token=${encodeURIComponent(rawToken)}`;

    if (!isSmtpConfigured()) {
        assertProductionSmtp();
        console.info("[email:verify]", { to: email, verifyUrl });
        return;
    }

    const from = process.env.EMAIL_FROM!.trim();
    await getTransporter().sendMail({
        from,
        to: email,
        subject: "Xác minh email LawyerAI",
        text: `Mở liên kết sau để xác minh email:\n${verifyUrl}\n`,
        html: `<p>Xin chào,</p><p>Vui lòng <a href="${verifyUrl}">nhấn vào đây để xác minh email</a>.</p><p>Hoặc copy liên kết: ${verifyUrl}</p>`,
    });
}

export async function sendPasswordResetCode(
    email: string,
    code: string,
): Promise<void> {
    if (!isSmtpConfigured()) {
        assertProductionSmtp();
        console.info("[email:password-reset]", { to: email, code });
        return;
    }

    const from = process.env.EMAIL_FROM!.trim();
    const ttl = RESET_TTL_MIN;
    await getTransporter().sendMail({
        from,
        to: email,
        subject: "Mã đặt lại mật khẩu LawyerAI",
        text: `Mã đặt lại mật khẩu của bạn: ${code}\nMã có hiệu lực trong ${ttl} phút.\n`,
        html: `<p>Mã đặt lại mật khẩu của bạn:</p><p style="font-size:1.25rem;font-weight:bold;letter-spacing:0.15em">${code}</p><p>Mã có hiệu lực trong ${ttl} phút.</p>`,
    });
}
