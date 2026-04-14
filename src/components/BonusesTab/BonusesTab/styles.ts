import type {CSSProperties} from "react";

export const S = {
    tabWrap: {
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        padding: "32px 40px",
    } satisfies CSSProperties,

    title: {
        fontSize: 24, fontWeight: 800, color: "var(--color-text-primary)",
        marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--color-border)",
    } satisfies CSSProperties,

    tabs: {
        display: "flex", gap: 12, marginBottom: 32,
    } satisfies CSSProperties,

    tabBtn: (active: boolean): CSSProperties => ({
        padding: "10px 24px", borderRadius: "10px", fontSize: 13, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: 0.5, border: "none", cursor: "pointer",
        background: active ? "var(--color-bg-tab-active)" : "rgba(255,255,255,0.04)",
        color: active ? "var(--color-text-dark)" : "var(--color-text-secondary)",
        boxShadow: active ? "0 4px 12px rgba(255,206,0,0.3)" : "none",
        transition: "all 0.2s ease", fontFamily: "inherit",
    }),

    tabCount: {
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.15)", borderRadius: "var(--radius-pill)",
        padding: "2px 8px", fontSize: 11, fontWeight: 800, marginLeft: 6,
    } satisfies CSSProperties,

    empty: {
        textAlign: "center", padding: "64px 0", color: "var(--color-text-muted)",
        fontSize: 15, lineHeight: 1.6,
    } satisfies CSSProperties,

    hint: {
        fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 20,
    } satisfies CSSProperties,

    list: {
        display: "flex", flexDirection: "column", gap: 16, marginBottom: 40,
    } satisfies CSSProperties,

    card: {
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)", position: "relative",
    } satisfies CSSProperties,

    timer: {
        position: "absolute", top: 16, left: 16,
        background: "linear-gradient(135deg,#ff4b2b,#ff416c)",
        color: "#fff", padding: "4px 10px", borderRadius: "var(--radius-pill)",
        fontSize: 11, fontWeight: 700, letterSpacing: 0.5, boxShadow: "0 2px 8px rgba(255,75,43,0.4)",
        zIndex: 2,
    } satisfies CSSProperties,

    cardInner: {
        padding: 24, display: "flex", gap: 24,
    } satisfies CSSProperties,

    iconWrap: {
        width: 80, height: 80, borderRadius: "var(--radius-lg)",
        background: "var(--color-bg-input)", border: "1px solid var(--color-border)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
    } satisfies CSSProperties,

    icon: {fontSize: 32, marginBottom: 4} satisfies CSSProperties,
    badgeFs: {
        fontSize: 12, fontWeight: 800, color: "var(--color-gold)",
        letterSpacing: 1,
    } satisfies CSSProperties,

    body: {flex: 1, minWidth: 0} satisfies CSSProperties,

    bodyTop: {display: "flex", alignItems: "center", gap: 12, marginBottom: 8} satisfies CSSProperties,

    tag: {
        fontSize: 11, fontWeight: 700, color: "var(--color-green)",
        background: "rgba(34,197,93,0.1)", padding: "4px 10px", borderRadius: "9999px",
    } satisfies CSSProperties,

    tagActive: {
        fontSize: 11, fontWeight: 700, color: "var(--color-gold)",
        background: "rgba(255,206,0,0.1)", padding: "4px 10px", borderRadius: "9999px",
    } satisfies CSSProperties,

    deposit: {fontSize: 12, color: "var(--color-text-muted)"} satisfies CSSProperties,

    name: {
        fontSize: 18, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 16,
    } satisfies CSSProperties,

    options: {
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
    } satisfies CSSProperties,

    option: (selected: boolean): CSSProperties => ({
        display: "flex", flexDirection: "column", gap: 4, padding: "10px 14px",
        borderRadius: "var(--radius-sm)", border: `1px solid ${selected ? "var(--color-gold)" : "var(--color-border)"}`,
        background: selected ? "rgba(255,206,0,0.05)" : "rgba(255,255,255,0.03)",
        cursor: "pointer", transition: "border-color 0.18s",
    }),

    optionLabel: {fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)"} satisfies CSSProperties,
    optionSub: {fontSize: 12, color: "var(--color-text-muted)"} satisfies CSSProperties,

    actions: {
        display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end", flexShrink: 0,
    } satisfies CSSProperties,

    infoBtn: {
        background: "rgba(255,255,255,0.05)", border: "none", color: "var(--color-text-secondary)",
        width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "color 0.2s",
    } satisfies CSSProperties,

    promoRow: {
        background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)", padding: 24, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap",
    } satisfies CSSProperties,

    promoLabel: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--color-text-primary)",
        display: "flex",
        alignItems: "center",
        gap: 8,
    } satisfies CSSProperties,

    promoWrap: {
        flex: 1, display: "flex", gap: 8, maxWidth: 400, minWidth: 0,
    } satisfies CSSProperties,

    promoInput: {
        flex: 1, height: 44, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)",
        background: "var(--color-bg-input)", color: "var(--color-text-primary)", padding: "0 16px",
        fontSize: 14, outline: "none", fontFamily: "inherit", minWidth: 0,
    } satisfies CSSProperties,

    promoMsg: (ok: boolean): CSSProperties => ({
        width: "100%", fontSize: 13, fontWeight: ok ? 600 : 400,
        color: ok ? "var(--color-green)" : "var(--color-red)", margin: 0,
    }),
};
