import React, {useState, useEffect} from "react";
import Button from "../AllButtons/Button";
import UserDisplay from "../User/UserDisplay";
import {useAuthStore} from "../../store/authStore";
import {S} from "./styles.ts";

type Props = {
    tournamentName: string;
    onConfirm: (emailReminder: boolean) => void;
    onClose: () => void;
    isSubmitting: boolean;
};

const TournamentRegistrationModal: React.FC<Props> = ({tournamentName, onConfirm, onClose, isSubmitting}) => {
    const user = useAuthStore(s => s.user);
    const [emailReminder, setEmailReminder] = useState(true);

    useEffect(() => {
        const prevBody = document.body.style.overflow;
        const prevHtml = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevBody;
            document.documentElement.style.overflow = prevHtml;
        };
    }, []);

    if (!user) return null;

    return (
        <div style={S.overlay} onClick={onClose}>
            <div style={S.modal} onClick={e => e.stopPropagation()}>
                <button style={S.close} onClick={onClose} aria-label="Закрити"><i className="fa-solid fa-xmark"/>
                </button>

                <div style={S.header}>
                    <div style={S.iconBox}><i className="fa-solid fa-trophy"/></div>
                    <h3 style={S.title}>Реєстрація на турнір</h3>
                </div>

                <div style={S.content}>
                    <p style={S.text}>Ви впевнені, що хочете зареєструватись на <br/><span
                        style={S.tourName}>"{tournamentName}"</span>?</p>
                    <div style={S.userSection}>
                        <span style={S.label}>Реєстрація для:</span>
                        <UserDisplay email={user.email} size="sm"/>
                    </div>
                    <div style={S.reminderBox(emailReminder)} onClick={() => setEmailReminder(!emailReminder)}>
                        <div style={S.checkbox(emailReminder)}>{emailReminder &&
                            <i className="fa-solid fa-check"/>}</div>
                        <div style={S.reminderInfo}>
                            <span style={S.reminderTitle}>Нагадування на пошту</span>
                            <span style={S.reminderDesc}>Ми надішлемо вам деталі турніру</span>
                        </div>
                        <i className="fa-solid fa-envelope" style={S.mailIcon}/>
                    </div>
                </div>

                <div style={S.actions}>
                    <Button variant="primary" onClick={() => onConfirm(emailReminder)} disabled={isSubmitting}>
                        {isSubmitting ? <><i className="fa-solid fa-spinner fa-spin"
                                             style={{marginRight: 8}}/>Реєстрація...</> : "Так, зареєструватись"}
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Скасувати</Button>
                </div>
            </div>
        </div>
    );
};

export default TournamentRegistrationModal;
