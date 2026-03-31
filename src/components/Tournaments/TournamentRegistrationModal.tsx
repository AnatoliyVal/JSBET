import React, { useState } from "react";
import Button from "../AllButtons/Button/Button";
import UserDisplay from "../User/UserDisplay";
import { useAuthStore } from "../../store/authStore";

type TournamentRegistrationModalProps = {
    tournamentName: string;
    onConfirm: (emailReminder: boolean) => void;
    onClose: () => void;
    isSubmitting: boolean;
};

const TournamentRegistrationModal: React.FC<TournamentRegistrationModalProps> = ({
    tournamentName,
    onConfirm,
    onClose,
    isSubmitting
}) => {
    const user = useAuthStore(s => s.user);
    const [emailReminder, setEmailReminder] = useState(true);

    if (!user) return null;

    return (
        <div className="gm-overlay" onClick={onClose}>
            <div className="tournament-reg-modal" onClick={e => e.stopPropagation()}>
                <button className="gm-close" onClick={onClose} aria-label="Закрити">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="trm-header">
                    <div className="trm-icon-box">
                        <i className="fa-solid fa-trophy"></i>
                    </div>
                    <h3 className="trm-title">Реєстрація на турнір</h3>
                </div>

                <div className="trm-content">
                    <p className="trm-text">
                        Ви впевнені, що хочете зареєструватись на <br />
                        <span className="trm-tour-name">"{tournamentName}"</span>?
                    </p>

                    <div className="trm-user-section">
                        <span className="trm-label">Реєстрація для:</span>
                        <UserDisplay email={user.email} size="sm" />
                    </div>

                    <div className={`trm-reminder-box ${emailReminder ? 'active' : ''}`} onClick={() => setEmailReminder(!emailReminder)}>
                        <div className="trm-checkbox">
                            {emailReminder && <i className="fa-solid fa-check"></i>}
                        </div>
                        <div className="trm-reminder-info">
                            <span className="trm-reminder-title">Нагадування на пошту</span>
                            <span className="trm-reminder-desc">Ми надішлемо вам деталі турніру</span>
                        </div>
                        <i className="fa-solid fa-envelope trm-mail-icon"></i>
                    </div>
                </div>

                <div className="trm-actions">
                    <Button 
                        variant="primary" 
                        onClick={() => onConfirm(emailReminder)}
                        disabled={isSubmitting}
                        className="trm-btn-confirm"
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
                                Реєстрація...
                            </>
                        ) : "Так, зареєструватись"}
                    </Button>
                    <Button variant="ghost" onClick={onClose} className="trm-btn-cancel">
                        Скасувати
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TournamentRegistrationModal;
