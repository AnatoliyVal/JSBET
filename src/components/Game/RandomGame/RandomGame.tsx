import {useState, useEffect} from "react";
import Game from "../Game";

export interface GameData {
    GameName: string;
    GameOwner: string;
    CategoryName: string;
    rating: string;
    PlayerNow: string;
    badge?: string;
}

export const GAMES_DB: GameData[] = [
    {
        GameName: "Sweet Bonanza",
        GameOwner: "Pragmatic Play",
        CategoryName: "Фрукти",
        rating: "4.9",
        PlayerNow: "3 241",
        badge: "Хіт"
    },
    {
        GameName: "Big Bass Bonanza",
        GameOwner: "Pragmatic Play",
        CategoryName: "Рибалка",
        rating: "4.8",
        PlayerNow: "2 187",
        badge: "Джекпот"
    },
    {
        GameName: "The Dog House",
        GameOwner: "Pragmatic Play",
        CategoryName: "Тварини",
        rating: "4.7",
        PlayerNow: "1 854",
        badge: "Новинка"
    },
    {
        GameName: "Starlight Princess 1000",
        GameOwner: "Pragmatic Play",
        CategoryName: "Магія",
        rating: "4.9",
        PlayerNow: "4 012"
    },
    {
        GameName: "Madame Destiny Megaways",
        GameOwner: "Pragmatic Play",
        CategoryName: "Містика",
        rating: "4.6",
        PlayerNow: "987"
    },
    {
        GameName: "Zeus vs Hades",
        GameOwner: "Pragmatic Play",
        CategoryName: "Mythologie",
        rating: "4.8",
        PlayerNow: "2 650"
    },
    {
        GameName: "Gates of Olympus SS",
        GameOwner: "Pragmatic Play",
        CategoryName: "Боги",
        rating: "4.7",
        PlayerNow: "3 108"
    },
    {
        GameName: "Snoop Dogg Dollars",
        GameOwner: "Pragmatic Play",
        CategoryName: "Хіп-хоп",
        rating: "4.5",
        PlayerNow: "742"
    },
    {GameName: "Aztec Magic Bonanza", GameOwner: "BGaming", CategoryName: "Ацтеки", rating: "4.6", PlayerNow: "1 230"},
    {GameName: "Sun of Egypt 3", GameOwner: "Booongo", CategoryName: "Єгипет", rating: "4.5", PlayerNow: "895"},
    {GameName: "Wild Cash x9990", GameOwner: "Endorphina", CategoryName: "Класика", rating: "4.4", PlayerNow: "611"},
    {GameName: "Rainbow Reels", GameOwner: "Playson", CategoryName: "Класика", rating: "4.3", PlayerNow: "528"},
    {
        GameName: "Big Bass Splash",
        GameOwner: "Pragmatic Play",
        CategoryName: "Рибалка",
        rating: "4.7",
        PlayerNow: "1 543"
    },
    {GameName: "Coral Island", GameOwner: "Playson", CategoryName: "Природа", rating: "4.5", PlayerNow: "876"},
    {GameName: "Army of Ares", GameOwner: "Relax Gaming", CategoryName: "Воїни", rating: "4.6", PlayerNow: "1 102"},
    {
        GameName: "Fire Coins Hold and Win",
        GameOwner: "Playson",
        CategoryName: "Монети",
        rating: "4.8",
        PlayerNow: "2 310"
    },
    {GameName: "Joker Blaze", GameOwner: "Playson", CategoryName: "Класика", rating: "4.4", PlayerNow: "684"},
    {GameName: "Coin Spin Fever", GameOwner: "3 Oaks", CategoryName: "Монети", rating: "4.3", PlayerNow: "449"},
    {GameName: "Queen of Greece", GameOwner: "Amatic", CategoryName: "Антик", rating: "4.5", PlayerNow: "731"},
    {GameName: "Solar Queen", GameOwner: "Playson", CategoryName: "Єгипет", rating: "4.6", PlayerNow: "918"},
    {GameName: "Poseidon Wild Wrath", GameOwner: "Playson", CategoryName: "Боги", rating: "4.6", PlayerNow: "1 057"},
    {
        GameName: "Supercharged Clovers Hold and Win",
        GameOwner: "Playson",
        CategoryName: "Конюшина",
        rating: "4.4",
        PlayerNow: "592"
    },
    {GameName: "Glowberry Blast", GameOwner: "Booming", CategoryName: "Ягоди", rating: "4.5", PlayerNow: "803"},
    {GameName: "Serengeti Sunrise", GameOwner: "Spribe", CategoryName: "Тварини", rating: "4.3", PlayerNow: "367"},
    {
        GameName: "3 Pots Riches Hold and Win",
        GameOwner: "Playson",
        CategoryName: "Джекпот",
        rating: "4.7",
        PlayerNow: "1 891"
    },
    {
        GameName: "Thunder Coins Hold and Win",
        GameOwner: "Playson",
        CategoryName: "Джекпот",
        rating: "4.6",
        PlayerNow: "1 340"
    },
    {
        GameName: "Book of Egyptian Marvel",
        GameOwner: "Playson",
        CategoryName: "Єгипет",
        rating: "4.5",
        PlayerNow: "1 024"
    },
    {
        GameName: "Sweet Bonanza 1000",
        GameOwner: "Pragmatic Play",
        CategoryName: "Фрукти",
        rating: "4.8",
        PlayerNow: "2 743"
    },
    {GameName: "Amazing Diamonds", GameOwner: "Amatic", CategoryName: "Класика", rating: "4.4", PlayerNow: "816"},
    {
        GameName: "Good Luck Good Fortune",
        GameOwner: "Pragmatic Play",
        CategoryName: "Азія",
        rating: "4.5",
        PlayerNow: "1 178"
    },
    {GameName: "Fishing Club", GameOwner: "Playson", CategoryName: "Рибалка", rating: "4.7", PlayerNow: "1 629"},
    {GameName: "Fishin Reels", GameOwner: "Iron Dog", CategoryName: "Рибалка", rating: "4.4", PlayerNow: "723"},
    {
        GameName: "Marlin Masters The Big Haul",
        GameOwner: "Playson",
        CategoryName: "Рибалка",
        rating: "4.5",
        PlayerNow: "547"
    },
    {GameName: "Fishin Bear", GameOwner: "Playson", CategoryName: "Рибалка", rating: "4.3", PlayerNow: "412"},
    {
        GameName: "Trouts Treasure Payday",
        GameOwner: "Playson",
        CategoryName: "Рибалка",
        rating: "4.4",
        PlayerNow: "389"
    },
    {GameName: "Fish Day", GameOwner: "3 Oaks", CategoryName: "Рибалка", rating: "4.2", PlayerNow: "298"},
];

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