const CATEGORY_COLORS = [
    "#818cf8",
    "#c084fc",
    "#34d399",
    "#fbbf24",
    "#fb7185",
    "#38bdf8",
    "#2dd4bf",
    "#f472b6",
] as const;

export function categoryColor(id: string): string {
    let hash = 0;
    for (const char of id) {
        hash += char.charCodeAt(0);
    }
    return CATEGORY_COLORS[hash % CATEGORY_COLORS.length];
}
