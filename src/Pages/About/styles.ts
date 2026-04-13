import type {CSSProperties} from "react";

export const S = {
    hero: {
        position: "relative", padding: "64px 0",
        background: "var(--color-bg-card)",
        borderBottom: "1px solid var(--color-border)",
    } satisfies CSSProperties,

    heroInner: {
        textAlign: "center", display: "flex", flexDirection: "column",
        alignItems: "center",
    } satisfies CSSProperties,

    eyebrow: {
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "var(--color-gold-dim)",
        border: "1px solid var(--color-border-gold)",
        borderRadius: "var(--radius-pill)", padding: "6px 16px",
        fontSize: 12, fontWeight: 600, letterSpacing: 1,
        textTransform: "uppercase", color: "var(--color-gold)",
        marginBottom: 20,
    } satisfies CSSProperties,

    title: {
        fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800,
        letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16,
    } satisfies CSSProperties,

    accent: {
        background: "linear-gradient(90deg, #ffce00, #ffd833)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    } satisfies CSSProperties,

    subtitle: {
        fontSize: 17, color: "var(--color-text-secondary)",
        maxWidth: 800, margin: "0 auto 30px", lineHeight: 1.6,
    } satisfies CSSProperties,

    section: {padding: "40px 0"} satisfies CSSProperties,

    content: {
        display: "flex", flexDirection: "column", gap: 40,
        maxWidth: 900, margin: "0 auto",
    } satisfies CSSProperties,

    block: {
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "32px 40px",
    } satisfies CSSProperties,

    heading: {
        fontSize: 22, fontWeight: 700,
        color: "var(--color-text-primary)",
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 16,
    } satisfies CSSProperties,

    icon: {color: "var(--color-gold)", fontSize: 20} satisfies CSSProperties,

    text: {
        fontSize: 15, color: "var(--color-text-secondary)",
        lineHeight: 1.7, marginBottom: 16,
    } satisfies CSSProperties,

    actions: {
        display: "flex", gap: 16, justifyContent: "center",
        marginTop: 20, flexWrap: "wrap",
    } satisfies CSSProperties,
};
