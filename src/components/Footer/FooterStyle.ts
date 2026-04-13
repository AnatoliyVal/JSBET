import type {CSSProperties} from "react";

export const S = {
    footer: {
        marginTop: 60,
        borderTop: "1px solid var(--color-border)",
        padding: "40px 0",
    } satisfies CSSProperties,

    container: {
        width: "100%",
        maxWidth: "var(--container-max)",
        marginInline: "auto",
        paddingInline: "max(12px, 3vw)",
    } satisfies CSSProperties,

    inner: {
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
        gap: 48,
    } satisfies CSSProperties,

    logo: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
        textDecoration: "none",
    } satisfies CSSProperties,

    logoImg: {
        height: 32,
        maxWidth: 100,
        objectFit: "contain",
    } satisfies CSSProperties,

    description: {
        fontSize: 13,
        color: "var(--color-text-muted)",
        lineHeight: 1.7,
        maxWidth: 300,
    } satisfies CSSProperties,

    heading: {
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "var(--color-text-muted)",
        marginBottom: 14,
    } satisfies CSSProperties,

    links: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    } satisfies CSSProperties,

    link: {
        fontSize: 13,
        color: "var(--color-text-secondary)",
        textDecoration: "none",
        transition: "color var(--transition-fast)",
    } satisfies CSSProperties,

    payments: {
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
        paddingTop: 32,
        borderTop: "1px solid var(--color-border)",
        marginTop: 32,
    } satisfies CSSProperties,

    paymentIcon: {
        height: 24,
        opacity: 0.6,
        filter: "grayscale(1) brightness(2)",
    } satisfies CSSProperties,

    bottom: {
        paddingTop: 24,
        fontSize: 12,
        color: "var(--color-text-muted)",
        textAlign: "center",
        lineHeight: 1.7,
    } satisfies CSSProperties,
};
