import {useState, useEffect, useRef, useCallback} from "react";
import {createPortal} from "react-dom";
import type {GameData} from "../RandomGame";
import {useAuthStore} from "../../../store/authStore";
import {S, KEYFRAMES} from "./styles.ts";

type Props = {
    game: GameData;
    onClose: () => void;
};

const SYMBOLS = [
    {id: "lollipop", emoji: "🍭", value: 50, color: "#ff6eb4"},
    {id: "heart", emoji: "❤️", value: 30, color: "#ff4466"},
    {id: "gem", emoji: "💎", value: 20, color: "#64d8ff"},
    {id: "bear", emoji: "🐻", value: 15, color: "#ffaa44"},
    {id: "grapes", emoji: "🍇", value: 10, color: "#cc77ff"},
    {id: "apple", emoji: "🍎", value: 8, color: "#ff4444"},
    {id: "banana", emoji: "🍌", value: 5, color: "#ffdd00"},
    {id: "candy", emoji: "🍬", value: 3, color: "#ff88cc"},
];

const COLS = 6;
const ROWS = 5;
const CELL_PX = 78;

function weightedPick() {
    const weights = [5, 8, 10, 15, 20, 25, 30, 40];
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < SYMBOLS.length; i++) {
        r -= weights[i];
        if (r <= 0) return SYMBOLS[i];
    }
    return SYMBOLS[SYMBOLS.length - 1];
}

function makeReel(length = 40) {
    return Array.from({length}, weightedPick);
}

function checkClusters(grid: typeof SYMBOLS[number][][]) {
    const visited = Array.from({length: COLS}, () => Array(ROWS).fill(false));
    const clusters: { sym: string; cells: [number, number][] }[] = [];

    function flood(c: number, r: number, id: string, cells: [number, number][]) {
        if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return;
        if (visited[c][r]) return;
        if (grid[c][r].id !== id) return;
        visited[c][r] = true;
        cells.push([c, r]);
        flood(c + 1, r, id, cells);
        flood(c - 1, r, id, cells);
        flood(c, r + 1, id, cells);
        flood(c, r - 1, id, cells);
    }

    for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
            if (!visited[c][r]) {
                const cells: [number, number][] = [];
                flood(c, r, grid[c][r].id, cells);
                if (cells.length >= 8) clusters.push({sym: grid[c][r].id, cells});
            }
        }
    }
    return clusters;
}

const SlotGame = ({game, onClose}: Props) => {
    const user = useAuthStore(s => s.user);
    const updateProfile = useAuthStore(s => s.updateProfile);
    const storeBalance = user?.balance ?? 0;

    const [localBalance, setLocalBalance] = useState(5000);
    const balance = user ? storeBalance : localBalance;

    const setBalance = useCallback((updater: number | ((prev: number) => number)) => {
        const next = typeof updater === "function" ? updater(balance) : updater;
        if (user) {
            updateProfile({balance: next});
        } else {
            setLocalBalance(next);
        }
    }, [balance, user, updateProfile]);

    const [bet, setBet] = useState(20);
    const [spinning, setSpinning] = useState(false);
    const [reels, setReels] = useState(() =>
        Array.from({length: COLS}, () => makeReel())
    );
    const [offsets, setOffsets] = useState<number[]>(Array(COLS).fill(0));
    const [grid, setGrid] = useState<typeof SYMBOLS[number][][]>(() =>
        Array.from({length: COLS}, () => Array.from({length: ROWS}, weightedPick))
    );
    const [winCells, setWinCells] = useState<[number, number][]>([]);
    const [winAmount, setWinAmount] = useState<number | null>(null);
    const [showWin, setShowWin] = useState(false);
    const [autoSpin, setAutoSpin] = useState(false);
    const [spinHover, setSpinHover] = useState(false);
    const autoRef = useRef(false);
    const totalBet = bet * COLS;

    const spin = useCallback(() => {
        if (spinning || balance < totalBet) return;
        setBalance(b => b - totalBet);
        setWinCells([]);
        setWinAmount(null);
        setShowWin(false);
        setSpinning(true);

        const newReels = Array.from({length: COLS}, () => makeReel());
        setReels(newReels);
        setOffsets(Array(COLS).fill(0));

        const maxOffset = (newReels[0].length - ROWS) * CELL_PX;
        const finalOffsets = Array(COLS).fill(0);
        newReels.forEach((_, ci) => {
            setTimeout(() => {
                finalOffsets[ci] = maxOffset;
                setOffsets([...finalOffsets]);
            }, ci * 80);
        });

        setTimeout(() => {
            const newGrid = newReels.map(reel => reel.slice(reel.length - ROWS));
            setGrid(newGrid);
            const clusters = checkClusters(newGrid);
            if (clusters.length > 0) {
                const allCells = clusters.flatMap(cl => cl.cells) as [number, number][];
                setWinCells(allCells);
                let totalWin = 0;
                clusters.forEach(cl => {
                    const sym = SYMBOLS.find(s => s.id === cl.sym)!;
                    totalWin += bet * sym.value * (cl.cells.length / 8);
                });
                const rounded = Math.floor(totalWin);
                setWinAmount(rounded);
                setShowWin(true);
                setBalance(b => b + rounded);
            }
            setSpinning(false);
        }, 1400 + (COLS - 1) * 80 + 600);
    }, [spinning, balance, totalBet, bet]);

    useEffect(() => {
        autoRef.current = autoSpin;
    }, [autoSpin]);
    useEffect(() => {
        if (!spinning && autoRef.current && balance >= totalBet) {
            const t = setTimeout(() => {
                if (autoRef.current) spin();
            }, 700);
            return () => clearTimeout(t);
        }
    }, [spinning, spin, balance, totalBet]);
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === " " && !spinning) {
                e.preventDefault();
                spin();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose, spinning, spin]);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const betOptions = [5, 10, 20, 50, 100];
    const gridW = COLS * CELL_PX;
    const gridH = ROWS * CELL_PX;
    const spinDisabled = spinning || balance < totalBet;

    return createPortal(
        <div style={S.overlay}>
            <style>{KEYFRAMES}</style>

            {/* Decorative blur circles */}
            <div style={S.decor(500, 500, "radial-gradient(circle, #ff6eb4, transparent)", 0.32, {
                top: -150,
                left: -100
            })}/>
            <div style={S.decor(400, 400, "radial-gradient(circle, #cc44ff, transparent)", 0.32, {
                bottom: -100,
                right: -80
            })}/>
            <div style={S.decor(280, 280, "radial-gradient(circle, #ffdd00, transparent)", 0.18, {
                top: "35%",
                left: "42%"
            })}/>

            {/* Close */}
            <button onClick={onClose} aria-label="Закрити" style={S.closeBtn}>
                <i className="fa-solid fa-xmark"/>
            </button>

            {/* Layout */}
            <div style={S.layout}>

                {/* ── LEFT PANEL ── */}
                <div style={S.leftPanel}>
                    <div style={S.infoBox}>
                        <p style={S.infoLabel}>Баланс</p>
                        <p style={S.infoValue}>₴{balance.toLocaleString()}</p>
                    </div>

                    <div style={S.infoBox}>
                        <p style={S.infoLabel}>Загальна ставка</p>
                        <p style={S.infoValueGold}>₴{totalBet}</p>
                    </div>

                    <div>
                        <p style={{...S.infoLabel, marginBottom: 8}}>Ставка / лінія</p>
                        <div style={S.betGrid}>
                            {betOptions.map(b => (
                                <button
                                    key={b}
                                    onClick={() => setBet(b)}
                                    disabled={spinning}
                                    style={S.betBtn(bet === b, spinning)}
                                >
                                    ₴{b}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => setBalance(b => b + 1000)} style={S.refillBtn}>
                        <i className="fa-solid fa-coins"/> +₴1000
                    </button>
                </div>

                {/* ── CENTER ── */}
                <div style={S.center}>
                    <div style={S.titleRow}>
                        <span style={S.gameTitle}>{game.GameName}</span>
                        <span style={S.provider}>{game.GameOwner}</span>
                    </div>

                    <div style={S.frame}>
                        <div style={S.frameInner}>
                            <div style={{...S.gridRow, width: gridW}}>
                                {Array.from({length: COLS}, (_, ci) => (
                                    <div key={ci} style={S.colWrap(CELL_PX, gridH, ci === COLS - 1)}>
                                        <div style={S.col(offsets[ci], spinning, ci)}>
                                            {reels[ci].map((sym, ri) => (
                                                <div key={ri} style={S.cell(CELL_PX)}>
                                                    {sym.emoji}
                                                </div>
                                            ))}
                                        </div>
                                        <div style={S.shade("top")}/>
                                        <div style={S.shade("bot")}/>
                                    </div>
                                ))}
                            </div>

                            {winCells.length > 0 && (
                                <div style={S.winOverlay}>
                                    {winCells.map(([c, r], i) => (
                                        <div key={i} style={S.winCell(c, r, CELL_PX)}/>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {showWin && winAmount! > 0 && (
                        <div style={S.winBar}>
                            <span style={S.winLabel}>🎉 ВИГРАШ!</span>
                            <span style={S.winAmount}>+₴{winAmount!.toLocaleString()}</span>
                        </div>
                    )}
                </div>

                {/* ── RIGHT PANEL ── */}
                <div style={S.rightPanel}>
                    <button
                        onClick={spin}
                        disabled={spinDisabled}
                        onMouseEnter={() => setSpinHover(true)}
                        onMouseLeave={() => setSpinHover(false)}
                        aria-label="Крутити"
                        style={S.spinBtn(spinning, autoSpin, spinHover, spinDisabled)}
                    >
                        <i className={`fa-solid ${spinning ? "fa-circle-notch fa-spin" : "fa-rotate-right"}`}/>
                    </button>

                    <button
                        onClick={() => setAutoSpin(a => !a)}
                        disabled={balance < totalBet}
                        style={S.autoBtn(autoSpin, balance < totalBet)}
                    >
                        <i className={`fa-solid ${autoSpin ? "fa-stop" : "fa-infinity"}`}/>
                        {autoSpin ? "Стоп" : "Авто"}
                    </button>

                    <div style={S.legend}>
                        {SYMBOLS.slice(0, 5).map(s => (
                            <div key={s.id} style={S.legendItem}>
                                <span style={S.legendSym}>{s.emoji}</span>
                                <span style={S.legendVal(s.color)}>×{s.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <p style={S.hint}>Пробіл — крутити · Esc — закрити</p>
        </div>,
        document.body
    );
};

export default SlotGame;
