import type { CSSProperties } from "react";

export const S = {
    loading: {
        padding: "60px 0", textAlign: "center", color: "var(--color-text-muted)",
    } as CSSProperties,

    title: {
        fontSize: 24, fontWeight: 800,
        color: "var(--color-text-primary)", letterSpacing: -0.5,
        display: "flex", alignItems: "center", gap: 12,
    } satisfies CSSProperties,

    count: {
        fontSize: 18, color: "var(--color-gold)", fontWeight: 600,
        letterSpacing: 0,
    } satisfies CSSProperties,

    grid: (isMobile?: boolean): CSSProperties => ({
        display: "grid", gap: 24, padding: "20px 0",
        gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 1fr)",
        maxWidth: "100%",
    }),

    card: {
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)", overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
    } satisfies CSSProperties,

    header: (theme: string): CSSProperties => {
        let bg = "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))";
        if (theme === "gold") bg = "linear-gradient(135deg, rgba(255,206,0,0.15), rgba(0,0,0,0.2))";
        if (theme === "neon") bg = "linear-gradient(135deg, rgba(0,255,204,0.15), rgba(0,0,0,0.2))";
        if (theme === "fire") bg = "linear-gradient(135deg, rgba(255,51,51,0.15), rgba(0,0,0,0.2))";

        return {
            padding: 20, position: "relative",
            borderBottom: "1px solid var(--color-border)",
            background: bg,
        };
    },

    status: (status: string): CSSProperties => {
        let color = "var(--color-text-secondary)";
        let bg = "rgba(255,255,255,0.1)";
        if (status === "live") {
            color = "#fff";
            bg = "linear-gradient(135deg, #ff3333, #cc0000)";
        } else if (status === "upcoming") {
            color = "var(--color-text-dark)";
            bg = "var(--color-gold)";
        }

        return {
            display: "inline-block", padding: "4px 12px",
            borderRadius: "var(--radius-pill)", fontSize: 11,
            fontWeight: 800, textTransform: "uppercase",
            letterSpacing: 1, marginBottom: 16,
            background: bg, color: color,
        };
    },

    name: {
        fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)",
        marginBottom: 8, lineHeight: 1.2,
    } satisfies CSSProperties,

    prize: {
        fontSize: 16, color: "var(--color-gold)", margin: 0,
        display: "flex", alignItems: "center", gap: 8,
    } satisfies CSSProperties,

    body: {
        padding: 20, display: "flex", flexDirection: "column", gap: 16, flex: 1,
    } satisfies CSSProperties,

    infoRow: {
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
        paddingBottom: 20, borderBottom: "1px solid var(--color-border)",
    } satisfies CSSProperties,

    infoItem: {
        display: "flex", flexDirection: "column", gap: 6,
    } satisfies CSSProperties,

    infoLabel: {
        fontSize: 12, color: "var(--color-text-muted)",
        display: "flex", alignItems: "center", gap: 6,
        textTransform: "uppercase", letterSpacing: 0.5,
    } satisfies CSSProperties,

    infoValue: {
        fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)",
    } satisfies CSSProperties,

    conditions: {
        display: "flex", flexDirection: "column", gap: 8,
    } satisfies CSSProperties,

    conditionsTitle: {
        fontSize: 13, fontWeight: 700, color: "var(--color-text-secondary)", margin: 0,
    } satisfies CSSProperties,

    conditionsList: {
        margin: 0, paddingLeft: 18, fontSize: 13, color: "var(--color-text-muted)",
        lineHeight: 1.6,
    } satisfies CSSProperties,

    btn: (isGhost: boolean): CSSProperties => ({
        marginTop: "auto",
        width: "100%", height: 48, borderRadius: "var(--radius-pill)",
        fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "center", border: "none",
        background: isGhost ? "rgba(255,255,255,0.05)" : "var(--color-gold)",
        color: isGhost ? "var(--color-text-secondary)" : "var(--color-text-dark)",
    }),
};
