/**
 * Helpers to parse JSON from LLM output (markdown fences, leading prose, etc.).
 */

const FENCE_OPEN = /^```(?:json)?\s*\n?/i;
const FENCE_CLOSE = /\n?```\s*$/;

export function stripAiMarkdownFences(text: string): string {
    let s = text.trim();
    s = s.replace(FENCE_OPEN, "").replace(FENCE_CLOSE, "").trim();
    // Sometimes a closing fence appears without opening (rare)
    if (s.endsWith("```")) {
        s = s.replace(/\n?```\s*$/, "").trim();
    }
    return s;
}

/**
 * Extract first balanced `{...}` or `[...]` from `start`, respecting double-quoted strings.
 */
export function extractJsonSlice(text: string, kind: "object" | "array"): string | null {
    const open = kind === "object" ? "{" : "[";
    const close = kind === "object" ? "}" : "]";
    const startIdx = text.indexOf(open);
    if (startIdx === -1) {
        return null;
    }

    let depth = 0;
    let inString = false;
    let escape = false;

    for (let i = startIdx; i < text.length; i++) {
        const c = text[i];
        if (escape) {
            escape = false;
            continue;
        }
        if (inString) {
            if (c === "\\") {
                escape = true;
            } else if (c === '"') {
                inString = false;
            }
            continue;
        }
        if (c === '"') {
            inString = true;
            continue;
        }
        if (c === open) {
            depth++;
        } else if (c === close) {
            depth--;
            if (depth === 0) {
                return text.slice(startIdx, i + 1);
            }
        }
    }

    return null;
}

function tryParseJson(text: string): unknown | undefined {
    try {
        return JSON.parse(text) as unknown;
    } catch {
        return undefined;
    }
}

export type ParseJsonOk<T> = { ok: true; value: T };
export type ParseJsonErr = { ok: false; error: string };

export function parseJsonObject<T = unknown>(raw: string): ParseJsonOk<T> | ParseJsonErr {
    const clean = stripAiMarkdownFences(raw);

    let parsed = tryParseJson(clean);
    if (parsed !== undefined && typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
        return { ok: true, value: parsed as T };
    }

    const slice = extractJsonSlice(clean, "object");
    if (slice) {
        parsed = tryParseJson(slice);
        if (parsed !== undefined && typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
            return { ok: true, value: parsed as T };
        }
    }

    return { ok: false, error: "Không parse được JSON object từ phản hồi AI." };
}

export function parseJsonArray<T = unknown>(raw: string): ParseJsonOk<T[]> | ParseJsonErr {
    const clean = stripAiMarkdownFences(raw);

    let parsed = tryParseJson(clean);
    if (Array.isArray(parsed)) {
        return { ok: true, value: parsed as T[] };
    }

    const slice = extractJsonSlice(clean, "array");
    if (slice) {
        parsed = tryParseJson(slice);
        if (Array.isArray(parsed)) {
            return { ok: true, value: parsed as T[] };
        }
    }

    // Optional wrapper: { "ideas": [...] } or { "data": [...] }
    const objParsed = parseJsonObject<Record<string, unknown>>(clean);
    if (objParsed.ok) {
        const ideas = objParsed.value.ideas ?? objParsed.value.data;
        if (Array.isArray(ideas)) {
            return { ok: true, value: ideas as T[] };
        }
    }

    return { ok: false, error: "Không parse được JSON array từ phản hồi AI." };
}

/** Slug for tags: lowercase, hyphenated, safe chars only. */
export function normalizeTagSlug(input: string): string {
    const s = input
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return s.slice(0, 128);
}

const URL_PROTOCOL = /^https?:\/\//i;

export function sanitizeOptionalUrl(raw: unknown, maxLen: number): string | null {
    if (raw === null || raw === undefined) {
        return null;
    }
    if (typeof raw !== "string") {
        return null;
    }
    const t = raw.trim();
    if (!t || t.length > maxLen) {
        return null;
    }
    if (!URL_PROTOCOL.test(t)) {
        return null;
    }
    if (typeof URL !== "undefined" && typeof URL.canParse === "function" && URL.canParse(t)) {
        return t;
    }
    return null;
}
