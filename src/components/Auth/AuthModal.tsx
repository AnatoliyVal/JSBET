import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { S } from "./AuthStyle";

export type AuthModalTab = "login" | "register";

type Props = { open: boolean; initialTab: AuthModalTab; onClose: () => void; };

const AuthModal = ({ open, initialTab, onClose }: Props) => {
    const [tab, setTab] = useState<AuthModalTab>(initialTab);

    useEffect(() => { if (open) setTab(initialTab); }, [open, initialTab]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
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
        <div style={S.backdrop} role="presentation" onClick={onClose} aria-hidden={!open}>
            <div style={S.modal} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onClick={(e) => e.stopPropagation()}>
                <button type="button" style={S.closeBtn} aria-label="Закрити" onClick={onClose}>
                    <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>

                <div style={S.tabs} role="tablist" aria-label="Вхід або реєстрація">
                    <button type="button" role="tab" id="tab-login" aria-selected={tab === "login"}
                        style={S.tab(tab === "login")} onClick={() => setTab("login")}>
                        Вхід
                    </button>
                    <button type="button" role="tab" id="tab-register" aria-selected={tab === "register"}
                        style={S.tab(tab === "register")} onClick={() => setTab("register")}>
                        Реєстрація
                    </button>
                </div>

                <h2 id="auth-modal-title" style={S.title}>
                    {tab === "login" ? "Вхід до акаунта" : "Створити акаунт"}
                </h2>

                {tab === "login" ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}
            </div>
        </div>
    );
};

export default AuthModal;
