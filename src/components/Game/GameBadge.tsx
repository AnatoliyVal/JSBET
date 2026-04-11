import type { CSSProperties } from "react";

const S = {
    badge: {
        position: "absolute", top: 10, right: 10,
        fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
        textTransform: "uppercase", letterSpacing: 0.5,
        display: "inline-flex", alignItems: "center", gap: 5, zIndex: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
    } satisfies CSSProperties,

    hot: {
        background: "linear-gradient(135deg,#ff3333,#cc0000)", color: "#fff",
    } satisfies CSSProperties,

    new: {
        background: "linear-gradient(135deg,#3b82f6,#2563eb)", color: "#fff",
    } satisfies CSSProperties,

    gold: {
        background: "linear-gradient(135deg,#ffce00,#b59200)", color: "#050508",
    } satisfies CSSProperties,
};

const GameBadge = ({ badge }: { badge?: string }) => {
    if (badge === 'Хіт') return <span style={{ ...S.badge, ...S.hot }}><i className="fa-solid fa-fire" /> Хіт</span>;
    if (badge === 'Новинка') return <span style={{ ...S.badge, ...S.new }}><i className="fa-solid fa-star" /> Новинка</span>;
    if (badge === 'Джекпот') return <span style={{ ...S.badge, ...S.gold }}><i className="fa-solid fa-coins" /> Джекпот</span>;
    return null;
};

export default GameBadge;