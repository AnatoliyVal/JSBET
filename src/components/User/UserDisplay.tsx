import React from "react";
import UserBadge from "./UserBadge";
import {useUserProfile} from "../../hooks/useUserProfile";
import {useAuthStore} from "../../store/authStore";
import {S} from "./UserStyle";

type UserDisplayProps = {
    email?: string;
    displayName?: string;
    avatar?: string;
    badges?: string[];
    rainbowActive?: boolean;
    isNewUntil?: number;
    size?: "sm" | "md" | "lg";
    showAvatar?: boolean;
};

const UserDisplay: React.FC<UserDisplayProps> = ({
                                                     email, displayName: initialName, avatar: initialAvatar,
                                                     badges: initialBadges, rainbowActive: initialRainbow,
                                                     isNewUntil: initialNewUntil, size = "md", showAvatar = true,
                                                 }) => {
    const currentUser = useAuthStore(s => s.user);
    const isSelf = email && currentUser?.email === email;
    const {profile} = useUserProfile(email, {
        displayName: initialName, avatar: initialAvatar,
        badges: initialBadges, rainbowActive: initialRainbow, isNewUntil: initialNewUntil,
    });
    const activeUser = isSelf ? currentUser : profile;
    if (!activeUser && !initialName) return null;

    const name = activeUser?.displayName || initialName || "Користувач";
    const avatar = activeUser?.avatar || initialAvatar || "index-files/icons/free-icon-profile-711769.png";
    const badges = activeUser?.badges || initialBadges || [];
    const isRainbow = activeUser?.rainbowActive ?? initialRainbow ?? false;
    const isNewTime = activeUser?.isNewUntil ?? initialNewUntil ?? 0;

    const isVertical = size === "lg";
    const isSmall = size === "sm";
    const avatarSize = isVertical ? S.avatarLg : isSmall ? S.avatarSm : S.avatarMd;
    const nameStyle = isVertical ? S.nameLg : isSmall ? S.nameSm : S.nameMd;

    return (
        <div style={{
            display: "flex",
            flexDirection: isVertical ? "column" : "row",
            alignItems: "center",
            gap: isVertical ? 16 : isSmall ? 8 : 10,
            width: isVertical ? "100%" : "auto",
            flex: isSmall ? 1 : "initial" as const,
        }}>
            {showAvatar && (
                <div style={avatarSize}>
                    <img src={avatar} alt={name} style={S.avatarImg(isSmall)}/>
                </div>
            )}
            <div style={{
                display: "flex",
                flexDirection: isVertical ? "column" : "row",
                alignItems: "center",
                justifyContent: isVertical ? "center" : "flex-start",
                gap: 8, flexWrap: "wrap",
                textAlign: isVertical ? "center" : "left",
                flex: isSmall ? 1 : "initial" as const,
            }}>
                <span style={{
                    ...nameStyle,
                    animation: isRainbow ? "rainbow-text 3s linear infinite" : undefined,
                    fontWeight: isRainbow ? 800 : undefined,
                }}>
                    {name}
                </span>
                <UserBadge badges={badges} isNewUntil={isNewTime}/>
            </div>
        </div>
    );
};

export default UserDisplay;
