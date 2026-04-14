import {useState} from "react";
import GameBadge from "../GameBadge";
import GameModal from "../GameModal";
import {S} from "./styles.ts";
import {GameData} from "../../../interfaces/game";

const Game = ({GameName, GameOwner, CategoryName, rating, PlayerNow, badge}: GameData) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <article
                style={{
                    ...S.card,
                    transform: hovered ? "translateY(-4px)" : "none",
                    boxShadow: hovered
                        ? "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,206,0,0.25)"
                        : "none",
                }}
                role="listitem"
                aria-label={GameName}
                onClick={() => setModalOpen(true)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div style={S.thumb}>
                    <img
                        style={{...S.img, transform: hovered ? "scale(1.05)" : "scale(1)"}}
                        src={`index-files/games/${GameName}.webp`}
                        alt={GameName}
                        loading="lazy"
                    />
                    <GameBadge badge={badge}/>
                    <div style={{...S.overlay, opacity: hovered ? 1 : 0}} aria-hidden="true">
                        <div style={S.playBtn}>▶</div>
                    </div>
                </div>
                <div style={S.info}>
                    <p style={S.name}>{GameName}</p>
                    <p style={S.provider}>{GameOwner}</p>
                </div>
            </article>

            {modalOpen && (
                <GameModal
                    game={{GameName, GameOwner, CategoryName, rating, PlayerNow, badge}}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
};

export default Game;