import type { CSSProperties } from "react";

export const AccauntTopUpStyle = {
    module: {
        position: "fixed",
        inset: "0px",
        zIndex: 500,
        background: "rgba(5, 5, 8, 0.82)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 16px",
        overflowY: "auto",
    } satisfies CSSProperties,

    modalContent: {
        backgroundColor: "#var(--color-bg-card)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        padding: "24px",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
        maxWidth: "600px",
        maxHeight: "500px",
        height: "100%",
        width: "100%",
    } satisfies CSSProperties,

    button: {
            position: "absolute",
    top: "12px",
    right: "12px",
    zIndex: "10",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "1px solid var(--color-border)",
    background: "rgba(255, 255, 255, 0.06)",
    color: "var(--color-text-secondary)",
    display: "flex",
    alignItems:"center",
    justifyContent: "center",
    fontSize: "14px",
    cursor: "pointer",
    } satisfies CSSProperties,
};