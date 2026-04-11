import type { CSSProperties } from "react";

export const S = {
    overlay: {
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(5,5,8,0.82)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px 16px",
        overflowY: "auto",
    } satisfies CSSProperties,

    modal: (isMobile?: boolean): CSSProperties => ({
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        width: "100%", maxWidth: 880,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        position: "relative",
        maxHeight: "90vh",
        overflowY: isMobile ? "auto" : "hidden",
        overflowX: "hidden",
    }),

    closeBtn: {
        position: "absolute", top: 12, right: 12, zIndex: 10,
        width: 32, height: 32, borderRadius: "50%",
        border: "1px solid var(--color-border)",
        background: "rgba(255,255,255,0.06)",
        color: "var(--color-text-secondary)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, cursor: "pointer",
    } satisfies CSSProperties,

    left: (isMobile?: boolean): CSSProperties => ({
        display: "flex", flexDirection: "column", gap: 0,
        borderRight: isMobile ? "none" : "1px solid var(--color-border)",
        borderBottom: isMobile ? "1px solid var(--color-border)" : "none",
        width: isMobile ? "100%" : 340,
        flexShrink: 0,
        overflowY: isMobile ? "visible" : "auto",
    }),

    top: {
        display: "flex", gap: 16, padding: "20px 20px 0",
    } satisfies CSSProperties,

    thumb: {
        width: 100, height: 130, borderRadius: "var(--radius-sm)",
        objectFit: "cover", flexShrink: 0,
    } satisfies CSSProperties,

    playArea: {
        display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0,
    } satisfies CSSProperties,

    title: {
        fontSize: 18, fontWeight: 800,
        color: "var(--color-text-primary)", margin: 0,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
    } satisfies CSSProperties,

    provider: {
        fontSize: 13, color: "var(--color-text-muted)",
        display: "flex", alignItems: "center", gap: 6,
    } satisfies CSSProperties,

    metaRow: {
        display: "flex", gap: 8, flexWrap: "wrap",
    } satisfies CSSProperties,

    chip: {
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "3px 10px", borderRadius: "var(--radius-pill)",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid var(--color-border)",
        fontSize: 12, color: "var(--color-text-secondary)",
    } satisfies CSSProperties,

    chipGold: {
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "3px 10px", borderRadius: "var(--radius-pill)",
        background: "rgba(255,206,0,0.12)",
        border: "1px solid rgba(255,206,0,0.3)",
        fontSize: 12, color: "var(--color-gold)",
    } satisfies CSSProperties,

    playBtn: {
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "10px 20px", borderRadius: "var(--radius-pill)",
        background: "var(--color-gold)", color: "var(--color-text-dark)",
        fontSize: 14, fontWeight: 700, cursor: "pointer",
        border: "none", fontFamily: "inherit",
        alignSelf: "flex-start",
        transition: "background 0.18s",
    } satisfies CSSProperties,

    infoSection: {
        padding: "16px 20px",
        display: "flex", flexDirection: "column", gap: 14,
    } satisfies CSSProperties,

    infoBlock: {
        display: "flex", flexDirection: "column", gap: 6,
    } satisfies CSSProperties,

    infoTitle: {
        fontSize: 13, fontWeight: 700,
        color: "var(--color-text-secondary)",
        display: "flex", alignItems: "center", gap: 7,
        textTransform: "uppercase", letterSpacing: 0.5,
    } satisfies CSSProperties,

    infoText: {
        fontSize: 13, color: "var(--color-text-muted)",
        lineHeight: 1.6, margin: 0,
    } satisfies CSSProperties,

    ratingRow: {
        display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
    } satisfies CSSProperties,

    stars: { display: "flex", gap: 3 } satisfies CSSProperties,

    star: (filled: boolean, disabled: boolean): CSSProperties => ({
        background: "none", border: "none", padding: 0,
        fontSize: 20, lineHeight: 1,
        color: filled ? "var(--color-gold)" : "rgba(255,255,255,0.15)",
        cursor: disabled ? "default" : "pointer",
        transition: "color 0.18s, transform 0.18s",
    }),

    avgLabel: {
        fontSize: 13, fontWeight: 700, color: "var(--color-gold)",
    } satisfies CSSProperties,

    avgCount: {
        fontSize: 12, color: "var(--color-text-muted)", fontWeight: 400,
    } satisfies CSSProperties,

    loginHint: {
        background: "none", border: "none", padding: 0,
        fontSize: 12, color: "var(--color-text-muted)",
        cursor: "pointer", textDecoration: "underline",
        textDecorationColor: "transparent",
        transition: "text-decoration-color 0.18s",
        fontFamily: "inherit",
    } satisfies CSSProperties,

    reviewsCol: (isMobile?: boolean): CSSProperties => ({
        display: "flex", flexDirection: "column",
        overflowY: isMobile ? "visible" : "auto", padding: "20px",
        flex: 1, minWidth: 0,
    }),

    reviewsHeading: {
        fontSize: 15, fontWeight: 700,
        color: "var(--color-text-primary)",
        display: "flex", alignItems: "center", gap: 8,
        marginBottom: 14,
    } satisfies CSSProperties,

    reviewForm: {
        display: "flex", flexDirection: "column", gap: 8,
        marginBottom: 16,
    } satisfies CSSProperties,

    reviewInput: {
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        color: "var(--color-text-primary)",
        fontSize: 13, fontFamily: "inherit",
        padding: "10px 12px", resize: "vertical",
        outline: "none",
    } satisfies CSSProperties,

    reviewSubmit: (disabled: boolean): CSSProperties => ({
        alignSelf: "flex-end",
        padding: "8px 18px", borderRadius: "var(--radius-pill)",
        background: disabled ? "rgba(255,206,0,0.3)" : "var(--color-gold)",
        color: "var(--color-text-dark)",
        fontSize: 13, fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none", fontFamily: "inherit",
    }),

    reviewsEmpty: {
        fontSize: 13, color: "var(--color-text-muted)",
        textAlign: "center", padding: "20px 0",
    } satisfies CSSProperties,

    reviewsList: {
        display: "flex", flexDirection: "column", gap: 12,
        listStyle: "none",
    } satisfies CSSProperties,

    reviewItem: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "12px 14px",
        display: "flex", flexDirection: "column", gap: 8,
    } satisfies CSSProperties,

    reviewHeader: {
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 8,
    } satisfies CSSProperties,

    reviewDate: {
        fontSize: 11, color: "var(--color-text-muted)",
        flexShrink: 0,
    } satisfies CSSProperties,

    reviewText: {
        fontSize: 13, color: "var(--color-text-secondary)",
        lineHeight: 1.5, margin: 0,
    } satisfies CSSProperties,
};
