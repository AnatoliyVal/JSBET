import React from "react";
import { useAuthStore } from "../../store/authStore";
import { S } from "./UserStyle";

type UserBadgeProps = { badges?: string[]; isNewUntil?: number; };

const UserBadge: React.FC<UserBadgeProps> = ({ badges = [], isNewUntil }) => {
    const user = useAuthStore((s) => s.user);
    const hiddenBadges = user?.hiddenBadges || [];
    const isNew = isNewUntil && Date.now() < isNewUntil;
    const normalizedHidden = hiddenBadges.map(b => b.toUpperCase());
    const visibleBadges = badges.filter(b => !normalizedHidden.includes(b.toUpperCase()));
    const showNew = isNew && !normalizedHidden.includes("NEW");

    if (visibleBadges.length === 0 && !showNew) return null;

    return (
        <div style={S.group}>
            {visibleBadges.map((b) => {
                const badge = b.toUpperCase();
                if (badge === "VIP") return <span key={b} style={S.vipBadge} aria-label="VIP статус">VIP</span>;
                if (badge === "CLOWN") return (
                    <span key={b} style={S.clownBadge} aria-label="CLOWN статус">
                        <span style={{ marginRight: 4 }}>🤡</span> CLOWN
                    </span>
                );
                if (badge === "NEW") return <span key={b} style={S.newBadge} aria-label="NEW статус">NEW</span>;
                return <span key={b} style={S.fallbackBadge}>{badge}</span>;
            })}
            {showNew && !visibleBadges.map(b => b.toUpperCase()).includes("NEW") && (
                <span style={S.newBadge} aria-label="NEW статус">NEW</span>
            )}
        </div>
    );
};

export default UserBadge;
