import React from "react";
import UserBadge from "./UserBadge";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useAuthStore } from "../../store/authStore";
import type { AuthUser } from "../../store/authStore";

type UserDisplayProps = {
    email?: string;
    displayName?: string;
    avatar?: string;
    badges?: string[];
    rainbowActive?: boolean;
    isNewUntil?: number;
    size?: "sm" | "md" | "lg";
    showAvatar?: boolean;
    className?: string; // class for the name/badges wrapper
    avatarClassName?: string;
};

/**
 * Unified component for showing user identity.
 * Automatically stays in sync with Firestore if 'email' is provided.
 */
const UserDisplay: React.FC<UserDisplayProps> = ({ 
    email, 
    displayName: initialName, 
    avatar: initialAvatar, 
    badges: initialBadges, 
    rainbowActive: initialRainbow,
    isNewUntil: initialNewUntil,
    size = "md",
    showAvatar = true,
    className = "",
    avatarClassName = ""
}) => {
    // Current logged-in user from store (for fast local updates)
    const currentUser = useAuthStore(s => s.user);
    const isSelf = email && currentUser?.email === email;

    // Real-time profile from Firestore (for everyone else and backup for self)
    const { profile } = useUserProfile(email, {
        displayName: initialName,
        avatar: initialAvatar,
        badges: initialBadges,
        rainbowActive: initialRainbow,
        isNewUntil: initialNewUntil
    });

    // Determine which data to use. If it's the current user, store is most reactive.
    // If not, 'profile' from hook is the source of truth.
    const activeUser = isSelf ? currentUser : profile;
    
    if (!activeUser && !initialName) return null;

    const name = activeUser?.displayName || initialName || "Користувач";
    const avatar = activeUser?.avatar || initialAvatar || "index-files/icons/free-icon-profile-711769.png";
    const badges = activeUser?.badges || initialBadges || [];
    const isRainbow = activeUser?.rainbowActive ?? initialRainbow ?? false;
    const isNewTime = activeUser?.isNewUntil ?? initialNewUntil ?? 0;

    const avatarSizeClass = size === "sm" ? "gm-review-avatar" : size === "lg" ? "profile-avatar-img" : "header-avatar-img";
    const nameClass = size === "sm" ? "gm-review-author" : size === "lg" ? "profile-username" : "header-auth-email";
    const isVertical = size === "lg";
    const isSmall = size === "sm";

    return (
        <div 
            className={`user-display-container ${size} ${className}`} 
            style={{ 
                display: "flex", 
                flexDirection: isVertical ? "column" : "row",
                alignItems: "center", 
                gap: isVertical ? "16px" : isSmall ? "8px" : "10px",
                width: isVertical ? "100%" : "auto",
                flex: isSmall ? 1 : "initial"
            }}
        >
            {showAvatar && (
                <div 
                    className={isVertical ? "profile-avatar" : ""} 
                    style={
                        isVertical ? { width: "96px", height: "96px", flexShrink: 0, position: "relative", overflow: "hidden" } 
                        : isSmall ? { width: "28px", height: "28px", flexShrink: 0 } 
                        : { width: "32px", height: "32px", flexShrink: 0 }
                    }
                >
                    <img 
                        src={avatar} 
                        alt={name} 
                        className={`${avatarSizeClass} ${avatarClassName}`} 
                        style={{ 
                            width: "100%", 
                            height: "100%", 
                            borderRadius: "50%", 
                            objectFit: "cover",
                            display: "block",
                            border: isSmall ? "1px solid var(--color-border)" : "none"
                        }}
                    />
                </div>
            )}
            <div className="user-display-info" style={{ 
                display: "flex", 
                flexDirection: isVertical ? "column" : "row",
                alignItems: "center", 
                justifyContent: isVertical ? "center" : "flex-start",
                gap: "8px", 
                flexWrap: "wrap",
                textAlign: isVertical ? "center" : "left",
                flex: isSmall ? 1 : "initial"
            }}>
                <span className={`${nameClass} ${isRainbow ? " rainbow-nickname" : ""}`}>
                    {name}
                </span>
                <UserBadge badges={badges} isNewUntil={isNewTime} />
            </div>
        </div>
    );
};

export default UserDisplay;
