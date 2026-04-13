import type {CSSProperties} from "react";

export const S = {
    group: {
        display: "inline-flex",
        gap: 6,
        alignItems: "center",
        marginLeft: 8,
    } satisfies CSSProperties,

    vipBadge: {
        display: "inline-flex",
        alignItems: "center",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 1,
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: "9999px",
        color: "#050508",
        background: "linear-gradient(90deg,#ffce00,#ffd833,#b59200,#ffce00)",
        backgroundSize: "200% auto",
        animation: "vip-shimmer 2.4s linear infinite",
        boxShadow: "0 0 8px rgba(255,206,0,0.4)",
    } satisfies CSSProperties,

    newBadge: {
        display: "inline-flex",
        alignItems: "center",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 1,
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: "9999px",
        color: "#fff",
        background: "linear-gradient(90deg,rgba(34,197,93,0.9),rgba(16,185,129,0.85))",
        boxShadow: "0 0 4px rgba(34,197,93,.3)",
        animation: "new-glow 2.4s ease-in-out infinite",
    } satisfies CSSProperties,

    clownBadge: {
        display: "inline-flex",
        alignItems: "center",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 1,
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: "9999px",
        color: "#fff",
        background: "linear-gradient(135deg,#ff4b2b,#ff416c)",
        boxShadow: "0 0 10px rgba(255,75,43,.4)",
        animation: "clown-bounce 2s ease-in-out infinite",
    } satisfies CSSProperties,

    fallbackBadge: {
        display: "inline-flex",
        alignItems: "center",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 1,
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: "9999px",
        color: "var(--color-text-secondary)",
        background: "var(--color-border)",
    } satisfies CSSProperties,

    avatarSm: {
        width: 28, height: 28, flexShrink: 0,
    } satisfies CSSProperties,

    avatarMd: {
        width: 32, height: 32, flexShrink: 0,
    } satisfies CSSProperties,

    avatarLg: {
        width: 96, height: 96, flexShrink: 0, position: "relative", overflow: "hidden",
    } satisfies CSSProperties,

    avatarImg: (small: boolean): CSSProperties => ({
        width: "100%", height: "100%",
        borderRadius: "50%", objectFit: "cover", display: "block",
        border: small ? "1px solid var(--color-border)" : "none",
    }),

    nameSm: {
        fontSize: 13, fontWeight: 600,
        color: "var(--color-text-primary)",
    } satisfies CSSProperties,

    nameMd: {
        fontSize: 14, fontWeight: 600,
        color: "var(--color-text-primary)",
    } satisfies CSSProperties,

    nameLg: {
        fontSize: 18, fontWeight: 700,
        color: "var(--color-text-primary)",
        margin: 0,
    } satisfies CSSProperties,
};
