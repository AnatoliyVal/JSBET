import { useState, useEffect } from "react";
import GameBadge from "./GameBadge";
import GameModal from "./GameModal";
import type { GameData } from "./RandomGame/RandomGame";
import { getAverageRating } from "../../lib/ratingsService";

const Game = ({ GameName, GameOwner, CategoryName, rating, PlayerNow, badge }: GameData) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [liveRating, setLiveRating] = useState<{ avg: number; count: number } | null>(null);

    // Fetch live average rating from the Express API
    useEffect(() => {
        getAverageRating(GameName).then(setLiveRating);
    }, [GameName]);

    const displayRating = liveRating && liveRating.count > 0
        ? liveRating.avg.toFixed(1)
        : rating;

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
                    <p className="game-card-rating" title={liveRating && liveRating.count > 0 ? `${liveRating.count} оцінок` : "Статичний рейтинг"}>
                        ★ {displayRating}
                        {liveRating && liveRating.count > 0 && (
                            <span className="game-card-rating-count"> ({liveRating.count})</span>
                        )}
                    </p>
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