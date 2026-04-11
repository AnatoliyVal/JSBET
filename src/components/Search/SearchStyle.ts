import type { CSSProperties } from "react";

export const S = {
    overlay: {
        position: "fixed", inset: 0, zIndex: 600,
        background: "rgba(5,5,8,0.75)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: 60,
    } satisfies CSSProperties,

    modal: {
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        width: "100%", maxWidth: 600,
        maxHeight: "80vh", display: "flex",
        flexDirection: "column", overflow: "hidden",
        animation: "slideDown 0.2s ease",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
    } satisfies CSSProperties,

    header: {
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 16px",
        borderBottom: "1px solid var(--color-border)",
        flexShrink: 0,
    } satisfies CSSProperties,

    fieldWrap: {
        flex: 1, display: "flex", alignItems: "center", gap: 10,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-pill)",
        padding: "0 14px", height: 42,
    } satisfies CSSProperties,

    icon: {
        color: "var(--color-text-muted)", fontSize: 14, flexShrink: 0,
    } satisfies CSSProperties,

    input: {
        flex: 1, background: "none", border: "none", outline: "none",
        color: "var(--color-text-primary)", fontSize: 15, fontFamily: "inherit",
    } satisfies CSSProperties,

    clearBtn: {
        background: "none", border: "none", padding: 4,
        color: "var(--color-text-muted)", cursor: "pointer", fontSize: 13,
        display: "flex", alignItems: "center",
    } satisfies CSSProperties,

    sortBtn: (active: boolean): CSSProperties => ({
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: "var(--radius-pill)", fontSize: 13,
        border: `1px solid ${active ? "rgba(255,206,0,0.35)" : "var(--color-border)"}`,
        background: active ? "rgba(255,206,0,0.12)" : "rgba(255,255,255,0.04)",
        color: active ? "var(--color-gold)" : "var(--color-text-secondary)",
        cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
    }),

    closeBtn: {
        width: 36, height: 36, borderRadius: "50%",
        border: "1px solid var(--color-border)",
        background: "rgba(255,255,255,0.05)",
        color: "var(--color-text-secondary)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, flexShrink: 0,
    } satisfies CSSProperties,

    body: {
        flex: 1, overflowY: "auto", padding: "12px 16px",
    } satisfies CSSProperties,

    hint: {
        textAlign: "center", padding: "40px 0",
        fontSize: 14, color: "var(--color-text-muted)",
    } satisfies CSSProperties,

    count: {
        fontSize: 12, color: "var(--color-text-muted)",
        marginBottom: 10,
    } satisfies CSSProperties,

    results: {
        display: "flex", flexDirection: "column", gap: 2,
    } satisfies CSSProperties,

    resultItem: {
        display: "flex", alignItems: "center", gap: 12,
        padding: "8px 10px", borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        transition: "background 0.15s",
    } satisfies CSSProperties,

    resultImg: {
        width: 44, height: 58,
        borderRadius: 6, objectFit: "cover", flexShrink: 0,
    } satisfies CSSProperties,

    resultInfo: { flex: 1, minWidth: 0 } satisfies CSSProperties,

    resultName: {
        fontSize: 14, fontWeight: 600,
        color: "var(--color-text-primary)", margin: 0,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
    } satisfies CSSProperties,

    resultProvider: {
        fontSize: 12, color: "var(--color-text-muted)", margin: 0,
    } satisfies CSSProperties,

    resultRating: {
        display: "flex", alignItems: "center", gap: 4,
        fontSize: 13, fontWeight: 600, color: "var(--color-gold)",
        flexShrink: 0,
    } satisfies CSSProperties,

    badgeNew: {
        fontSize: 10, fontWeight: 700, padding: "2px 7px",
        borderRadius: "9999px", background: "rgba(59,130,246,0.2)",
        color: "#60a5fa", flexShrink: 0,
    } satisfies CSSProperties,

    badgeGold: {
        fontSize: 10, fontWeight: 700, padding: "2px 7px",
        borderRadius: "9999px", background: "rgba(255,206,0,0.2)",
        color: "var(--color-gold)", flexShrink: 0,
    } satisfies CSSProperties,
};
