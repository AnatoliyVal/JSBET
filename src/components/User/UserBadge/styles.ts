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
};
