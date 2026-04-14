import type {CSSProperties} from "react";

export const WithdrawStyle = {
    overlay: {
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(5,5,8,0.82)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 16px",
        overflowY: "auto",
    } satisfies CSSProperties,

    modal: {
        background: "var(--color-bg-card)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        width: "100%",
        maxWidth: 520,
        animation: "slideDown 0.2s ease",
        position: "relative",
    } satisfies CSSProperties,

    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 24px 16px",
        borderBottom: "1px solid var(--color-border)",
    } satisfies CSSProperties,

    title: {
        fontSize: 20,
        fontWeight: 800,
        color: "var(--color-text-primary)",
        margin: 0,
    } satisfies CSSProperties,

    closeBtn: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        border: "1px solid var(--color-border)",
        background: "rgba(255,255,255,0.05)",
        color: "var(--color-text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        cursor: "pointer",
        flexShrink: 0,
    } satisfies CSSProperties,

    body: {
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
    } satisfies CSSProperties,

    amountsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
    } satisfies CSSProperties,

    amountBtn: (selected: boolean): CSSProperties => ({
        padding: "12px 8px",
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${selected ? "var(--color-gold)" : "var(--color-border)"}`,
        background: selected ? "rgba(255,206,0,0.1)" : "rgba(255,255,255,0.03)",
        color: selected ? "var(--color-gold)" : "var(--color-text-primary)",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.18s ease",
        textAlign: "center",
    }),

    label: {
        fontSize: 12,
        fontWeight: 600,
        color: "var(--color-text-muted)",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 6,
    } satisfies CSSProperties,

    inputWrap: {
        display: "flex",
        alignItems: "center",
        gap: 0,
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-bg-input)",
        overflow: "hidden",
    } satisfies CSSProperties,

    currencyTag: {
        padding: "0 14px",
        fontSize: 14,
        fontWeight: 700,
        color: "var(--color-text-muted)",
        background: "rgba(255,255,255,0.03)",
        borderRight: "1px solid var(--color-border)",
        height: 48,
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
    } satisfies CSSProperties,

    input: {
        flex: 1,
        minWidth: 0,
        height: 48,
        border: "none",
        background: "none",
        color: "var(--color-text-primary)",
        fontSize: 16,
        fontFamily: "inherit",
        padding: "0 14px",
        outline: "none",
    } satisfies CSSProperties,

    methodsRow: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
    } satisfies CSSProperties,

    methodBtn: (selected: boolean): CSSProperties => ({
        flex: "1 1 80px",
        padding: "10px 12px",
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${selected ? "var(--color-gold)" : "var(--color-border)"}`,
        background: selected ? "rgba(255,206,0,0.08)" : "rgba(255,255,255,0.03)",
        color: selected ? "var(--color-gold)" : "var(--color-text-secondary)",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        textAlign: "center",
        transition: "all 0.18s ease",
    }),

    notice: {
        fontSize: 12,
        color: "var(--color-text-muted)",
        lineHeight: 1.5,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 14px",
    } satisfies CSSProperties,

    errorNotice: {
        fontSize: 13,
        color: "var(--color-red)",
        background: "rgba(255, 51, 51, 0.1)",
        border: "1px solid rgba(255, 51, 51, 0.3)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 14px",
        marginTop: 10,
        textAlign: "center",
        fontWeight: 600,
    } satisfies CSSProperties,

    footer: {
        padding: "0 24px 24px",
    } satisfies CSSProperties,

    submitBtn: {
        width: "100%",
        height: 50,
        borderRadius: "var(--radius-pill)",
        border: "none",
        background: "var(--color-gold)",
        color: "#050508",
        fontSize: 15,
        fontWeight: 800,
        cursor: "pointer",
        fontFamily: "inherit",
        letterSpacing: 0.3,
        transition: "background 0.18s ease",
        boxShadow: "0 4px 16px rgba(255,206,0,0.35)",
    } satisfies CSSProperties,
};
