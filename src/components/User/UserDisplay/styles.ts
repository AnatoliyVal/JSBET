import type {CSSProperties} from "react";

export const S = {
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
