import type {CSSProperties} from "react";

export const S = {
    loginHint: {
        textAlign: "center", padding: "60px 0",
        color: "var(--color-text-muted)", fontSize: 16,
    } satisfies CSSProperties,

    layout: (isDesktop: boolean): CSSProperties => ({
        display: "grid",
        gridTemplateColumns: isDesktop ? "320px minmax(0, 1fr)" : "minmax(0, 1fr)",
        gap: 24,
        alignItems: "flex-start",
        maxWidth: "100%",
    }),

    sidebar: {
        display: "flex", flexDirection: "column", gap: 16,
    } satisfies CSSProperties,

    userCard: {
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "24px 20px", display: "flex", flexDirection: "column",
        alignItems: "center", position: "relative",
    } satisfies CSSProperties,

    userId: {
        fontSize: 13, color: "var(--color-text-muted)",
        marginTop: 12, fontWeight: 500, letterSpacing: 0.5,
    } satisfies CSSProperties,

    balanceCard: {
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
    } satisfies CSSProperties,

    balanceLabel: {
        fontSize: 13, color: "var(--color-text-muted)",
        marginBottom: 8, textTransform: "uppercase", letterSpacing: 1,
        fontWeight: 600,
    } satisfies CSSProperties,

    balanceValue: {
        fontSize: 32, fontWeight: 800, color: "var(--color-text-primary)",
        marginBottom: 20, fontFamily: "var(--font-mono)",
        letterSpacing: -1,
    } satisfies CSSProperties,

    balanceActions: {
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
    } satisfies CSSProperties,

    progressCard: {
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
    } satisfies CSSProperties,

    progressLabel: {
        fontSize: 13, color: "var(--color-text-primary)",
        fontWeight: 600, marginBottom: 12, display: "flex", gap: 8,
    } satisfies CSSProperties,

    progressBar: {
        height: 12, background: "rgba(255,255,255,0.05)",
        borderRadius: "var(--radius-pill)", overflow: "hidden",
        position: "relative", marginBottom: 12,
    } satisfies CSSProperties,

    progressFill: (width: string): CSSProperties => ({
        height: "100%", background: "linear-gradient(90deg, #ffce00, #ffd833)",
        width, transition: "width 1s ease",
        borderRadius: "var(--radius-pill)",
        boxShadow: "0 0 10px rgba(255,206,0,0.4)",
    }),

    progressText: {
        position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
        fontSize: 9, fontWeight: 800, color: "var(--color-bg-base)",
    } satisfies CSSProperties,

    progressDesc: {
        fontSize: 12, color: "var(--color-text-muted)",
        textAlign: "center", margin: 0,
    } satisfies CSSProperties,

    nav: {
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: 8, display: "flex", flexDirection: "column", gap: 2,
    } satisfies CSSProperties,

    navLink: (active: boolean, danger: boolean): CSSProperties => ({
        display: "flex", alignItems: "center", gap: 12,
        padding: "10px 16px", borderRadius: "8px",
        fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer",
        background: active ? "rgba(255,255,255,0.05)" : "transparent",
        color: danger ? "var(--color-red)" : (active ? "var(--color-text-primary)" : "var(--color-text-secondary)"),
        transition: "all 0.2s ease", fontFamily: "inherit", textAlign: "left",
    }),

    content: {
        display: "flex", flexDirection: "column", gap: 24,
        minWidth: 0,
        maxWidth: "100%",
    } satisfies CSSProperties,

    block: {
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "32px", // on mobile it might be tight but we constrain width
        maxWidth: "100%",
        overflowX: "hidden",
    } satisfies CSSProperties,

    title: {
        fontSize: 18, fontWeight: 700, color: "var(--color-text-primary)",
        marginBottom: 8,
    } satisfies CSSProperties,

    desc: {
        fontSize: 14, color: "var(--color-text-secondary)",
        marginBottom: 32, lineHeight: 1.6,
    } satisfies CSSProperties,

    formRow: (isMobile?: boolean): CSSProperties => ({
        display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 1fr)", gap: 24,
        marginBottom: 24,
        maxWidth: "100%",
    }),

    group: {
        display: "flex", flexDirection: "column", gap: 8,
    } satisfies CSSProperties,

    label: {
        fontSize: 11, fontWeight: 700, color: "var(--color-text-secondary)",
        textTransform: "uppercase", letterSpacing: 0.5, opacity: 0.8,
    } satisfies CSSProperties,

    input: {
        height: 44, background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "0 16px", color: "var(--color-text-primary)",
        fontSize: 14, transition: "all 0.2s ease",
        fontFamily: "inherit", outline: "none",
    } satisfies CSSProperties,

    select: {
        height: 44, background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "0 16px", color: "var(--color-text-primary)",
        fontSize: 14, cursor: "pointer", appearance: "none",
        fontFamily: "inherit", outline: "none",
    } satisfies CSSProperties,

    actions: {
        display: "flex", gap: 16, marginTop: 32,
        paddingTop: 24, borderTop: "1px solid var(--color-border)",
    } satisfies CSSProperties,

    paymentSubmit: {
        width: "100%", height: 52, borderRadius: "var(--radius-lg)",
        background: "linear-gradient(135deg, var(--color-gold), #ffd833)",
        border: "none", color: "var(--color-bg-base)",
        fontSize: 16, fontWeight: 700, cursor: "pointer",
        marginTop: 16, boxShadow: "0 4px 16px rgba(255,206,0,0.3)",
        fontFamily: "inherit", transition: "transform 0.2s, box-shadow 0.2s",
    } satisfies CSSProperties,

    visualBlock: {
        background: "rgba(255,255,255,0.03)", padding: 20,
        borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)",
    } satisfies CSSProperties,

    visualTitle: {
        fontSize: 16, marginBottom: 8, display: "flex", alignItems: "center", gap: 8,
    } satisfies CSSProperties,

    visualDesc: {
        fontSize: 13, color: "var(--color-text-muted)", marginBottom: 16,
    } satisfies CSSProperties,

    visualBtn: (hidden: boolean): CSSProperties => ({
        padding: "8px 16px", borderRadius: "8px", fontSize: 13,
        border: "1px solid var(--color-border)",
        background: hidden ? "transparent" : "rgba(255,255,255,0.1)",
        color: hidden ? "var(--color-text-muted)" : "white",
        cursor: "pointer", transition: "all 0.2s ease", fontFamily: "inherit",
    }),
};
