import {useState, useEffect} from "react";
import Game from "../GameTotal";
import {GAMES_DB, GameData} from "../../../interfaces/game";


function pickUniqueGames(count: number): GameData[] {
    const shuffled = [...GAMES_DB];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

export const RandomGameList = ({count = 6}: { count?: number }) => {
    const [games, setGames] = useState<GameData[]>([]);

    useEffect(() => {
        setGames(pickUniqueGames(count));
    }, [count]);

    return (
        <>
            {games.map((game) => (
                <Game key={game.GameName} {...game} />
            ))}
        </>
    );
};

const RandomGame = () => {
    const [randomGame, setRandomGame] = useState<GameData | null>(null);

    useEffect(() => {
        const [picked] = pickUniqueGames(1);
        setRandomGame(picked);
    }, []);

    if (!randomGame) {
        return <div className="game-card" style={{visibility: "hidden"}}></div>;
    }

    return <Game {...randomGame} />;
};

export default RandomGame;