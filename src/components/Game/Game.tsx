import GameBadge from "./GameBadge";

const Game = ({ GameName, GameOwner, CategoryName, rating, PlayerNow, badge, url }: {
    GameName: string, GameOwner: string, CategoryName: string, rating: string, PlayerNow: string, badge?: string , url? : string
}) => {


    return (
        <>
            <article className="game-card" role="listitem" aria-label={GameName}>
                <a href={url}>
                <div className="game-card-thumb">
                    <img className="game-card-img" src={`index-files/games/${GameName}.webp`}
                        alt={GameName} loading="lazy" />

                    <GameBadge badge={badge} />

                    <div className="game-card-overlay" aria-hidden="true">
                        <div className="game-card-play-btn">▶</div>
                    </div>
                </div>
                <div className="game-card-info">
                    <p className="game-card-name">{GameName}</p>
                    <p className="game-card-provider">{GameOwner}</p>
                    <p className="game-card-genre"><i className="fa-solid fa-tag"></i> Слот · {CategoryName}</p>
                    <div className="game-card-meta">
                        <span className="game-card-rating"><i className="fa-solid fa-star"></i> {rating}</span>
                        <span className="game-card-players"><i className="fa-solid fa-users"></i> {PlayerNow}</span>
                    </div>
                </div>
                </a>
            </article>
        </>
    );
};


export default Game;