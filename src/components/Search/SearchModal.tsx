import {useState, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {GAMES_DB} from "../Game/RandomGame/RandomGame";
import type {GameData} from "../Game/RandomGame/RandomGame";
import GameModal from "../Game/GameModal";
import {S} from "./SearchStyle";

type SortOrder = "none" | "asc" | "desc";
type Props = { open: boolean; onClose: () => void };

const SearchModal = ({open, onClose}: Props) => {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<SortOrder>("none");
    const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery("");
            setSort("none");
        }
    }, [open]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = open || selectedGame ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open, selectedGame]);

    const handleGameClick = (game: GameData) => {
        setSelectedGame(game);
        onClose();
    };

    const filtered: GameData[] = GAMES_DB
        .filter((g) => g.GameName.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
            if (sort === "none") return 0;
            const rA = parseFloat(a.rating), rB = parseFloat(b.rating);
            return sort === "desc" ? rB - rA : rA - rB;
        });

    const cycleSort = () => setSort((s) => s === "none" ? "desc" : s === "desc" ? "asc" : "none");
    const sortLabel = sort === "desc" ? "↓ Рейтинг" : sort === "asc" ? "↑ Рейтинг" : "Рейтинг";

    return (
        <>
            {open && (
                <div style={S.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Пошук ігор">
                    <div style={S.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={S.header}>
                            <div style={S.fieldWrap}>
                                <i className="fa-solid fa-magnifying-glass" style={S.icon}/>
                                <input
                                    ref={inputRef}
                                    style={S.input}
                                    type="search"
                                    placeholder="Назва гри..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    aria-label="Пошук"
                                />
                                {query && (
                                    <button style={S.clearBtn} onClick={() => setQuery("")} aria-label="Очистити">
                                        <i className="fa-solid fa-xmark"/>
                                    </button>
                                )}
                            </div>
                            <button style={S.sortBtn(sort !== "none")} onClick={cycleSort}>
                                <i className="fa-solid fa-star"/> {sortLabel}
                            </button>
                            <button style={S.closeBtn} onClick={onClose} aria-label="Закрити пошук">
                                <i className="fa-solid fa-xmark"/>
                            </button>
                        </div>

                        <div style={S.body}>
                            {query.length === 0 ? (
                                <p style={S.hint}>Почніть вводити назву гри…</p>
                            ) : filtered.length === 0 ? (
                                <p style={S.hint}>Нічого не знайдено за запитом «{query}»</p>
                            ) : (
                                <>
                                    <p style={S.count}>{filtered.length} ігор знайдено</p>
                                    <div style={S.results}>
                                        {filtered.map((game) => (
                                            <div
                                                key={game.GameName}
                                                style={{
                                                    ...S.resultItem,
                                                    background: hovered === game.GameName ? "rgba(255,255,255,0.06)" : "transparent",
                                                }}
                                                onClick={() => handleGameClick(game)}
                                                onMouseEnter={() => setHovered(game.GameName)}
                                                onMouseLeave={() => setHovered(null)}
                                            >
                                                <img style={S.resultImg} src={`index-files/games/${game.GameName}.webp`}
                                                     alt={game.GameName}
                                                     onError={(e) => {
                                                         (e.currentTarget as HTMLImageElement).style.display = "none";
                                                     }}/>
                                                <div style={S.resultInfo}>
                                                    <p style={S.resultName}>{game.GameName}</p>
                                                    <p style={S.resultProvider}>{game.GameOwner} · {game.CategoryName}</p>
                                                </div>
                                                <div style={S.resultRating}>
                                                    <i className="fa-solid fa-star"/> {game.rating}
                                                </div>
                                                {game.badge && (
                                                    <span style={game.badge === "Новинка" ? S.badgeNew : S.badgeGold}>
                                                        {game.badge}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {selectedGame && createPortal(
                <GameModal game={selectedGame} onClose={() => setSelectedGame(null)}/>,
                document.body
            )}
        </>
    );
};

export default SearchModal;
