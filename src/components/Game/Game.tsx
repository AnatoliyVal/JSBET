import { useState } from "react";
import GameBadge from "./GameBadge";
import GameModal from "./GameModal";
import type { GameData } from "./RandomGame/RandomGame";

const Game = ({ GameName, GameOwner, CategoryName, rating, PlayerNow, badge }: GameData) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <article
                className="game-card"
                role="listitem"
                aria-label={GameName}
                onClick={() => setModalOpen(true)}
                style={{ cursor: "pointer" }}
            >
                <div className="game-card-thumb">
                    <img
                        className="game-card-img"
                        src={`index-files/games/${GameName}.webp`}
                        alt={GameName}
                        loading="lazy"
                    />
                    <GameBadge badge={badge} />
                    <div className="game-card-overlay" aria-hidden="true">
                        <div className="game-card-play-btn">▶</div>
                    </div>
                </div>
                <div className="game-card-info">
                    <p className="game-card-name">{GameName}</p>
                    <p className="game-card-provider">{GameOwner}</p>
                </div>
            </article>

            {modalOpen && (
                <GameModal
                    game={{ GameName, GameOwner, CategoryName, rating, PlayerNow, badge }}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
};

export default Game;