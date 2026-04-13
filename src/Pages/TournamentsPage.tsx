import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {fetchTournamentsFromDB} from "../lib/seedService";
import {useAuthStore} from "../store/authStore";
import {registerForTournament, getUserRegistrations} from "../lib/tournamentService";
import {sendTournamentReminder} from "../lib/emailService";
import TournamentRegistrationModal from "../components/Tournaments";
import {S} from "./TournamentsStyle";
import {Tournament} from "../interfaces/tournament";

const statusLabel: Record<string, string> = {live: "LIVE", upcoming: "Незабаром", finished: "Завершено"};

const TournamentsPage = () => {
    const user = useAuthStore((s) => s.user);
    const openAuthModal = useAuthStore((s) => s.openAuthModal);

    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);
    const [registrations, setRegistrations] = useState<string[]>([]);
    const [regId, setRegId] = useState<string | null>(null);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1000);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchTournamentsFromDB().then((data) => setTournaments(data)).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (user) getUserRegistrations(user.email).then(setRegistrations);
    }, [user]);

    const handleRegister = async (t: Tournament, emailReminder: boolean) => {
        if (!user) {
            openAuthModal("login");
            return;
        }
        try {
            setSendingEmail(true);
            await registerForTournament(user.email, t.id);
            setRegistrations(prev => [...prev, t.id]);
            if (emailReminder) {
                await sendTournamentReminder(user.email, user.displayName, t.name, t.dateRange);
                alert("Ви успішно зареєстровані! Нагадування надіслано на пошту.");
            } else {
                alert("Ви успішно зареєстровані!");
            }
            setRegId(null);
        } catch (err) {
            console.error(err);
            alert("Помилка при реєстрації.");
        } finally {
            setSendingEmail(false);
        }
    };

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (loading) {
        return (
            <main>
                <div style={{display: "block"}}>
                    <div className="container" style={S.loading}>
                        <i className="fa-solid fa-spinner fa-spin" style={{fontSize: 32}}/>
                        <p style={{marginTop: 16}}>Завантаження турнірів…</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div style={{display: "block"}}>
                <section style={{padding: "40px 0"}}>
                    <div className="container">
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            marginBottom: 32
                        }}>
                            <h2 style={S.title}>
                                Турніри <span
                                style={S.count}>· {tournaments.filter(t => t.status === "live").length} активних</span>
                            </h2>
                        </div>

                        <div style={S.grid(isMobile)}>
                            {tournaments.map((t) => {
                                const isRegistered = registrations.includes(t.id);
                                const isFinished = t.status === "finished";
                                return (
                                    <article style={S.card} key={t.id}>
                                        <div style={S.header(t.theme)}>
                                            <div style={S.status(t.status)}>{statusLabel[t.status] ?? t.status}</div>
                                            <h3 style={S.name}>{t.name}</h3>
                                            <p style={S.prize}><i className="fa-solid fa-coins"/> Призовий
                                                фонд: <strong>{t.prize}</strong></p>
                                        </div>
                                        <div style={S.body}>
                                            <div style={S.infoRow}>
                                                <div style={S.infoItem}>
                                                    <span style={S.infoLabel}><i className="fa-solid fa-calendar"/> Дата</span>
                                                    <span style={S.infoValue}>{t.dateRange}</span>
                                                </div>
                                                <div style={S.infoItem}>
                                                    <span style={S.infoLabel}><i className="fa-solid fa-users"/> Учасники</span>
                                                    <span
                                                        style={S.infoValue}>{t.participants} / {t.maxParticipants}</span>
                                                </div>
                                            </div>
                                            <div style={S.conditions}>
                                                <p style={S.conditionsTitle}>Умови участі:</p>
                                                <ul style={S.conditionsList}>
                                                    <li>Мінімальна ставка: {t.minBet}</li>
                                                    <li>Ігри: {t.games}</li>
                                                    <li>{t.condition}</li>
                                                </ul>
                                            </div>
                                            <button
                                                style={S.btn(isFinished || isRegistered)}
                                                disabled={isRegistered || isFinished}
                                                onClick={() => {
                                                    if (!isFinished) setRegId(t.id);
                                                }}
                                            >
                                                {isFinished ? "Результати" : isRegistered ? "Ви зареєстровані ✓" : t.status === "upcoming" ? "Нагадати мені" : "Зареєструватись"}
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>

            {regId && (
                <TournamentRegistrationModal
                    tournamentName={tournaments.find(t => t.id === regId)?.name || ""}
                    onClose={() => setRegId(null)}
                    isSubmitting={sendingEmail}
                    onConfirm={(emailReminder) => {
                        const t = tournaments.find(x => x.id === regId);
                        if (t) handleRegister(t, emailReminder);
                    }}
                />
            )}
        </main>
    );
};

export default TournamentsPage;
