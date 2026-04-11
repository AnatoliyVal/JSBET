import type { CSSProperties } from "react";

export const S = {
    overlay: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #1a0530 0%, #2d0b55 50%, #1a0530 100%)",
        overflow: "hidden",
    } satisfies CSSProperties,

    decor: (w: number, h: number, bg: string, opacity: number, pos: CSSProperties): CSSProperties => ({
        position: "absolute",
        borderRadius: "50%",
        width: w,
        height: h,
        background: bg,
        filter: "blur(60px)",
        opacity,
        pointerEvents: "none",
        ...pos,
    }),

    closeBtn: {
        position: "absolute",
        top: 14,
        right: 14,
        zIndex: 10,
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.8)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
    } satisfies CSSProperties,

    layout: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: 1060,
        padding: "0 16px",
        display: "grid",
        gridTemplateColumns: "170px 1fr 155px",
        gap: 16,
        alignItems: "center",
    } satisfies CSSProperties,

    leftPanel: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    } satisfies CSSProperties,

    infoBox: {
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        padding: "10px 14px",
    } satisfies CSSProperties,

    infoLabel: {
        fontSize: 10,
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        letterSpacing: ".08em",
        margin: "0 0 4px",
    } satisfies CSSProperties,

    infoValue: {
        fontSize: 20,
        fontWeight: 800,
        color: "white",
        margin: 0,
        fontVariantNumeric: "tabular-nums",
    } satisfies CSSProperties,

    infoValueGold: {
        fontSize: 20,
        fontWeight: 800,
        color: "#ffce00",
        margin: 0,
    } satisfies CSSProperties,

    betGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 6,
    } satisfies CSSProperties,

    betBtn: (active: boolean, disabled: boolean): CSSProperties => ({
        padding: "8px 4px",
        borderRadius: 8,
        border: active ? "1px solid #ff6eb4" : "1px solid rgba(255,255,255,0.15)",
        background: active ? "rgba(255,110,180,0.22)" : "rgba(255,255,255,0.05)",
        color: active ? "#ff6eb4" : "rgba(255,255,255,0.65)",
        fontSize: 13,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "all .2s",
    }),

    refillBtn: {
        padding: "9px 12px",
        borderRadius: 10,
        border: "1px solid rgba(100,255,150,0.3)",
        background: "rgba(100,255,150,0.08)",
        color: "#88ffaa",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
    } satisfies CSSProperties,

    center: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
    } satisfies CSSProperties,

    titleRow: {
        display: "flex",
        gap: 10,
        alignItems: "baseline",
    } satisfies CSSProperties,

    gameTitle: {
        fontSize: 18,
        fontWeight: 800,
        color: "white",
        textShadow: "0 0 20px rgba(255,110,180,.6)",
    } satisfies CSSProperties,

    provider: {
        fontSize: 12,
        color: "rgba(255,255,255,0.4)",
    } satisfies CSSProperties,

    frame: {
        borderRadius: 14,
        padding: 5,
        background: "linear-gradient(135deg, #f5a623, #ff6eb4, #cc44ff, #f5a623)",
        backgroundSize: "300% 300%",
        animation: "sgFrame 4s ease infinite",
        boxShadow: "0 0 40px rgba(255,110,180,.4), 0 0 80px rgba(204,68,255,.2)",
    } satisfies CSSProperties,

    frameInner: {
        borderRadius: 10,
        overflow: "hidden",
        background: "linear-gradient(160deg, #2d0b55 0%, #4a0e80 50%, #2d0b55 100%)",
        position: "relative",
    } satisfies CSSProperties,

    gridRow: {
        display: "flex",
    } satisfies CSSProperties,

    colWrap: (w: number, h: number, isLast: boolean): CSSProperties => ({
        position: "relative",
        width: w,
        height: h,
        overflow: "hidden",
        borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.06)",
    }),

    col: (offset: number, spinning: boolean, col: number): CSSProperties => ({
        display: "flex",
        flexDirection: "column",
        transform: `translateY(-${offset}px)`,
        transition: spinning && offset > 0
            ? `transform ${1.1 + col * 0.12}s cubic-bezier(0.2, 0.8, 0.2, 1)`
            : "none",
        willChange: "transform",
    }),

    cell: (size: number): CSSProperties => ({
        width: size,
        height: size,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        userSelect: "none",
    }),

    shade: (dir: "top" | "bot"): CSSProperties => ({
        position: "absolute",
        [dir === "top" ? "top" : "bottom"]: 0,
        left: 0,
        right: 0,
        height: 44,
        pointerEvents: "none",
        background: dir === "top"
            ? "linear-gradient(to bottom, rgba(45,11,85,.85), transparent)"
            : "linear-gradient(to top, rgba(45,11,85,.85), transparent)",
        zIndex: 3,
    }),

    winOverlay: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 4,
    } satisfies CSSProperties,

    winCell: (c: number, r: number, size: number): CSSProperties => ({
        position: "absolute",
        left: c * size,
        top: r * size,
        width: size,
        height: size,
        border: "2px solid rgba(255,220,0,.8)",
        borderRadius: 8,
        animation: "sgWinPulse .7s ease infinite",
    }),

    winBar: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "linear-gradient(90deg, rgba(255,180,0,.15), rgba(255,100,0,.1))",
        border: "1px solid rgba(255,180,0,.4)",
        borderRadius: 10,
        padding: "10px 24px",
        animation: "sgWinAppear .4s cubic-bezier(.34,1.56,.64,1)",
    } satisfies CSSProperties,

    winLabel: {
        fontSize: 16,
        fontWeight: 700,
        color: "#ffce00",
    } satisfies CSSProperties,

    winAmount: {
        fontSize: 26,
        fontWeight: 900,
        color: "#ffce00",
        textShadow: "0 0 20px rgba(255,200,0,.7)",
    } satisfies CSSProperties,

    rightPanel: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
    } satisfies CSSProperties,

    spinBtn: (spinning: boolean, auto: boolean, hover: boolean, disabled: boolean): CSSProperties => ({
        width: 82,
        height: 82,
        borderRadius: "50%",
        border: auto ? "3px solid #ff4444" : "3px solid #ffce00",
        background: spinning
            ? "radial-gradient(circle, #888, #555)"
            : auto
                ? "radial-gradient(circle, #ff8888, #cc2222)"
                : "radial-gradient(circle, #ffdd44 0%, #f59400 100%)",
        color: "#1a0000",
        fontSize: 30,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .2s",
        opacity: disabled ? 0.55 : 1,
        transform: hover && !disabled ? "scale(1.09)" : "scale(1)",
        boxShadow: auto
            ? "0 4px 20px rgba(255,50,50,.55), 0 0 0 6px rgba(255,50,50,.15)"
            : spinning
                ? "none"
                : "0 4px 20px rgba(245,148,0,.55), 0 0 0 6px rgba(255,200,0,.15)",
    }),

    autoBtn: (active: boolean, disabled: boolean): CSSProperties => ({
        padding: "9px 18px",
        borderRadius: 20,
        border: active ? "1px solid rgba(255,68,68,.5)" : "1px solid rgba(255,255,255,.2)",
        background: active ? "rgba(255,68,68,.2)" : "rgba(255,255,255,.08)",
        color: active ? "#ff8888" : "rgba(255,255,255,.75)",
        fontSize: 13,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        opacity: disabled ? 0.4 : 1,
    }),

    legend: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: "100%",
        marginTop: 6,
    } satisfies CSSProperties,

    legendItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 8,
        padding: "4px 10px",
    } satisfies CSSProperties,

    legendSym: {
        fontSize: 18,
    } satisfies CSSProperties,

    legendVal: (color: string): CSSProperties => ({
        fontSize: 11,
        fontWeight: 700,
        color,
    }),

    hint: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 11,
        color: "rgba(255,255,255,.22)",
        margin: 0,
        zIndex: 1,
    } satisfies CSSProperties,
} as const;

export const KEYFRAMES = `
    @keyframes sgFrame {
        0%,100% { background-position: 0% 50%; }
        50%      { background-position: 100% 50%; }
    }
    @keyframes sgWinPulse {
        0%,100% { background: rgba(255,220,0,.2); box-shadow: 0 0 8px rgba(255,220,0,.5); }
        50%     { background: rgba(255,220,0,.45); box-shadow: 0 0 22px rgba(255,220,0,.9); }
    }
    @keyframes sgWinAppear {
        from { transform: scale(.8); opacity: 0; }
        to   { transform: scale(1);  opacity: 1; }
    }
`;
