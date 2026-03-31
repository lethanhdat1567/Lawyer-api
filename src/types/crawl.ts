export interface LawArticle {
    id: string;
    law_title: string;
    chapter: string | null;
    article_title: string;
    article_number: number | null;
    content: string;
    embedding: number[] | null;
    source_url: string | null;
    created_at: string;
    updated_at: string;
}

export type LawArticleInsert = Omit<
    LawArticle,
    "id" | "created_at" | "updated_at"
>;
