import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export type AuthModalTab = "login" | "register";

type Props = {
    open: boolean;
    initialTab: AuthModalTab;
    onClose: () => void;
};

const AuthModal = ({ open, initialTab, onClose }: Props) => {
    const [tab, setTab] = useState<AuthModalTab>(initialTab);

    useEffect(() => {
        if (open) {
            setTab(initialTab);
        }
    }, [open, initialTab]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="auth-modal-backdrop"
            role="presentation"
            onClick={onClose}
            aria-hidden={!open}
        >
            <div
                className="auth-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="auth-modal-close"
                    aria-label="Закрити"
                    onClick={onClose}
                >
                    <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>

                <div className="auth-modal-tabs" role="tablist" aria-label="Вхід або реєстрація">
                    <button
                        type="button"
                        role="tab"
                        id="tab-login"
                        aria-selected={tab === "login"}
                        className={`auth-modal-tab ${tab === "login" ? "is-active" : ""}`}
                        onClick={() => setTab("login")}
                    >
                        Вхід
                    </button>
                    <button
                        type="button"
                        role="tab"
                        id="tab-register"
                        aria-selected={tab === "register"}
                        className={`auth-modal-tab ${tab === "register" ? "is-active" : ""}`}
                        onClick={() => setTab("register")}
                    >
                        Реєстрація
                    </button>
                </div>

                <h2 id="auth-modal-title" className="auth-modal-title">
                    {tab === "login" ? "Вхід до акаунта" : "Створити акаунт"}
                </h2>

                {tab === "login" ? (
                    <LoginForm onSuccess={onClose} />
                ) : (
                    <RegisterForm onSuccess={onClose} />
                )}
            </div>
        </div>
    );
};

export default AuthModal;
