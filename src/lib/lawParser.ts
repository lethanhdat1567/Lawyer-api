// utils/law-parser.helper.ts
export const LawParserHelper = {
    isEnglish: (text: string): boolean => {
        const englishMarkers = [
            /^(Article|Section|Chapter|Sub-section|Part|Clause)\s+\d+/i,
            /^(The|Pursuant to|Hanoi,|CIVIL CODE)/i,
            /Socialist Republic of Vietnam/i,
            /National Assembly/i,
            /Independence - Freedom - Happiness/i,
        ];
        return englishMarkers.some((regex) => regex.test(text));
    },

    hasVietnamese: (text: string): boolean => {
        return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(
            text,
        );
    },

    extractArticleNumber: (text: string): number | null => {
        const match = text.match(/Điều\s+(\d+)/i);
        return match ? parseInt(match[1], 10) : null;
    },
};
