import { useState, useEffect, useRef } from "react";
import { GAMES_DB } from "../Game/RandomGame/RandomGame";
import type { GameData } from "../Game/RandomGame/RandomGame";

type SortOrder = "none" | "asc" | "desc";

type Props = {
    open: boolean;
    onClose: () => void;
};

const SearchModal = ({ open, onClose }: Props) => {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<SortOrder>("none");
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when modal opens
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery("");
            setSort("none");
        }
    }, [open]);

    // Close on Escape key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const filtered: GameData[] = GAMES_DB
        .filter((g) => g.GameName.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
            if (sort === "none") return 0;
            const rA = parseFloat(a.rating);
            const rB = parseFloat(b.rating);
            return sort === "desc" ? rB - rA : rA - rB;
        });

    const cycleSort = () => {
        setSort((s) => s === "none" ? "desc" : s === "desc" ? "asc" : "none");
    };

    const sortLabel = sort === "desc" ? "↓ Рейтинг" : sort === "asc" ? "↑ Рейтинг" : "Рейтинг";
    const sortActive = sort !== "none";

    if (!open) return null;

    return (
        <div className="search-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Пошук ігор">
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="search-modal-header">
                    <div className="search-modal-field">
                        <i className="fa-solid fa-magnifying-glass search-modal-field-icon" />
                        <input
                            ref={inputRef}
                            className="search-modal-input"
                            type="search"
                            placeholder="Назва гри..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Пошук"
                        />
                        {query && (
                            <button className="search-modal-clear" onClick={() => setQuery("")} aria-label="Очистити">
                                <i className="fa-solid fa-xmark" />
                            </button>
                        )}
                    </div>

                    <button
                        className={`search-modal-sort-btn${sortActive ? " active" : ""}`}
                        onClick={cycleSort}
                        title="Сортувати за рейтингом"
                    >
                        <i className="fa-solid fa-star" />
                        {sortLabel}
                    </button>

                    <button className="search-modal-close" onClick={onClose} aria-label="Закрити пошук">
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                {/* Results */}
                <div className="search-modal-body">
                    {query.length === 0 ? (
                        <p className="search-modal-hint">Почніть вводити назву гри…</p>
                    ) : filtered.length === 0 ? (
                        <p className="search-modal-hint">Нічого не знайдено за запитом «{query}»</p>
                    ) : (
                        <div className="search-modal-results">
                            <p className="search-modal-count">{filtered.length} ігор знайдено</p>
                            {filtered.map((game) => (
                                <div key={game.GameName} className="search-result-item">
                                    <img
                                        className="search-result-img"
                                        src={`index-files/games/${game.GameName}.webp`}
                                        alt={game.GameName}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                    <div className="search-result-info">
                                        <p className="search-result-name">{game.GameName}</p>
                                        <p className="search-result-provider">{game.GameOwner} · {game.CategoryName}</p>
                                    </div>
                                    <div className="search-result-rating">
                                        <i className="fa-solid fa-star" />
                                        {game.rating}
                                    </div>
                                    {game.badge && (
                                        <span className={`badge badge--${game.badge === "Хіт" ? "gold" : game.badge === "Новинка" ? "blue" : "gold"}`}>
                                            {game.badge}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
