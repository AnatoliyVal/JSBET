import type {CSSProperties} from "react";

export const S = {
    header: {
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: "var(--header-height)",
        background: "var(--color-bg-header)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
    } satisfies CSSProperties,

    container: {
        width: "100%",
        maxWidth: "var(--container-max)",
        marginInline: "auto",
        paddingInline: "max(12px, 3vw)",
    } satisfies CSSProperties,

    headerInner: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    } satisfies CSSProperties,

    topHeader: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "10px 0 8px",
    } satisfies CSSProperties,

    logo: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
        textDecoration: "none",
    } satisfies CSSProperties,

    logoImg: {
        height: 38,
        maxWidth: 120,
        width: "auto",
        display: "block",
        objectFit: "contain",
    } satisfies CSSProperties,

    searchWrap: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-pill)",
        padding: "0 16px",
        gap: 10,
        height: 40,
        cursor: "pointer",
        transition: "border-color var(--transition-fast)",
        maxWidth: 420,
    } satisfies CSSProperties,

    searchIcon: {
        color: "var(--color-text-muted)",
        fontSize: 14,
        flexShrink: 0,
    } satisfies CSSProperties,

    searchInput: {
        flex: 1,
        background: "none",
        border: "none",
        outline: "none",
        color: "var(--color-text-secondary)",
        fontSize: 14,
        cursor: "pointer",
        pointerEvents: "none",
    } satisfies CSSProperties,

    headerRight: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexShrink: 0,
    } satisfies CSSProperties,

    headerAuthUser: {
        display: "flex",
        alignItems: "center",
        gap: 10,
    } satisfies CSSProperties,

    bottomHeader: {
        borderTop: "1px solid var(--color-border)",
        padding: "4px 0",
    } satisfies CSSProperties,

    nav: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        overflowX: "auto",
        justifyContent: "center",
        flexShrink: 0,
        scrollbarWidth: "none",
    } satisfies CSSProperties,

    navItem: (active: boolean): CSSProperties => ({
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 16px",
        borderRadius: "var(--radius-pill)",
        fontSize: 14,
        fontWeight: active ? 700 : 500,
        color: active ? "var(--color-text-dark)" : "var(--color-text-secondary)",
        background: active ? "var(--color-bg-tab-active)" : "none",
        whiteSpace: "nowrap",
        cursor: "pointer",
        border: "none",
        textDecoration: "none",
        transition: "color var(--transition-fast), background var(--transition-fast)",
    }),

    navIcon: {
        fontSize: 13,
        lineHeight: 1,
    } satisfies CSSProperties,
};
