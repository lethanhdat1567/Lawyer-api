/**
 * Collapses whitespace/newlines between HTML tags only (e.g. `</h2>\\n<p>` → `</h2><p>`).
 * Does not touch spaces inside text nodes. Avoids extra vertical gaps when the rendered
 * container uses `white-space: pre-wrap` (Tiptap / ProseMirror).
 */
export function normalizeBlogBodyHtml(html: string): string {
    if (typeof html !== "string" || html.length === 0) {
        return html;
    }
    return html.replace(/>\s+</g, "><");
}
