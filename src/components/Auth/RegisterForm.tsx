import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "../AllButtons/Button/Button";
import { useAuthStore } from "../../store/authStore";
import { getProfile } from "../../lib/profilesService";
import { generateCode, sendVerificationCode } from "../../lib/emailService";
import VerifyCodeForm from "./VerifyCodeForm";

export type RegisterFormValues = {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type Props = { onSuccess: () => void };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_TTL_SEC = 300; // 5 minutes

const RegisterForm = ({ onSuccess }: Props) => {
    const registerUser = useAuthStore((s) => s.register);

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        defaultValues: { displayName: "", email: "", password: "", confirmPassword: "" },
    });

    // Step: "form" | "verify"
    const [step, setStep]           = useState<"form" | "verify">("form");
    const [pendingCode, setPending] = useState("");
    const [codeError, setCodeError] = useState("");
    const [sending, setSending]     = useState(false);
    const [sendError, setSendError] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [expiry, setExpiry]       = useState<number | null>(null);

    // Countdown timer
    useEffect(() => {
        if (!expiry) return;
        const tick = setInterval(() => {
            const left = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
            setCountdown(left);
            if (left === 0) clearInterval(tick);
        }, 1000);
        return () => clearInterval(tick);
    }, [expiry]);

    const formatTime = (s: number) =>
        `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

    // Step 1 → send code
    const onSubmitForm = async (data: RegisterFormValues) => {
        setSending(true);
        setSendError("");
        try {
            // Check if user already exists
            const normalized = data.email.trim().toLowerCase();
            const localExists = useAuthStore.getState().demoUsers[normalized];
            if (localExists || await getProfile(normalized)) {
                setError("email", { type: "server", message: "Користувач з таким email уже існує" });
                setSending(false);
                return;
            }

            const code = generateCode();
            await sendVerificationCode(data.email, data.displayName, code);
            setPending(code);
            setExpiry(Date.now() + CODE_TTL_SEC * 1000);
            setCountdown(CODE_TTL_SEC);
            setStep("verify");
        } catch {
            setSendError("Не вдалося надіслати лист. Перевірте email та спробуйте ще раз.");
        } finally {
            setSending(false);
        }
    };

    // Resend code
    const handleResend = async () => {
        if (countdown > 0) return;
        const { email, displayName } = getValues();
        setSending(true);
        try {
            const code = generateCode();
            await sendVerificationCode(email, displayName, code);
            setPending(code);
            setExpiry(Date.now() + CODE_TTL_SEC * 1000);
            setCountdown(CODE_TTL_SEC);
            setCodeError("");
        } catch {
            setCodeError("Помилка повторного надсилання. Спробуйте ще раз.");
        } finally {
            setSending(false);
        }
    };

    // Step 2 → verify code and register
    const handleCodeComplete = async (entered: string) => {
        setCodeError("");
        if (!expiry || Date.now() > expiry) {
            setCodeError("Код протермінований. Надішліть новий.");
            return;
        }
        if (entered !== pendingCode) {
            setCodeError("Невірний код. Спробуйте ще раз.");
            return;
        }
        const { email, password, displayName } = getValues();
        const result = await registerUser(email, password, displayName);
        if (result.ok) {
            onSuccess();
        } else {
            setCodeError("message" in result ? result.message : "Помилка реєстрації");
        }
    };

    if (step === "verify") {
        const { email } = getValues();
        return (
            <div className="verify-step">
                <div className="verify-step-icon">
                    <i className="fa-solid fa-envelope-open-text"></i>
                </div>
                <h3 className="verify-step-title">Підтвердження Email</h3>
                <p className="verify-step-desc">
                    Ми надіслали 6-значний код на <strong>{email}</strong>.<br />
                    Введи його нижче.
                </p>

                <VerifyCodeForm onComplete={handleCodeComplete} disabled={sending} />

                {codeError && <p className="auth-form-error auth-form-error--root">{codeError}</p>}

                <div className="verify-step-footer">
                    {countdown > 0 ? (
                        <span className="verify-countdown">
                            Повторно надіслати через {formatTime(countdown)}
                        </span>
                    ) : (
                        <button
                            className="verify-resend-btn"
                            onClick={handleResend}
                            disabled={sending}
                        >
                            {sending ? "Надсилання…" : "Надіслати код ще раз"}
                        </button>
                    )}
                    <button className="verify-back-btn" onClick={() => setStep("form")}>
                        ← Назад до форми
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmitForm)} noValidate>
            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="register-name">Ім&apos;я</label>
                <input id="register-name" type="text" autoComplete="name" className="auth-form-input"
                    {...register("displayName", {
                        required: "Введіть ім'я",
                        minLength: { value: 2, message: "Мінімум 2 символи" },
                    })} />
                {errors.displayName && <p className="auth-form-error">{errors.displayName.message}</p>}
            </div>

            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="register-email">Email</label>
                <input id="register-email" type="email" autoComplete="email" className="auth-form-input"
                    {...register("email", {
                        required: "Введіть email",
                        pattern: { value: emailPattern, message: "Некоректний email" },
                    })} />
                {errors.email && <p className="auth-form-error">{errors.email.message}</p>}
            </div>

            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="register-password">Пароль</label>
                <input id="register-password" type="password" autoComplete="new-password" className="auth-form-input"
                    {...register("password", {
                        required: "Придумайте пароль",
                        minLength: { value: 6, message: "Мінімум 6 символів" },
                    })} />
                {errors.password && <p className="auth-form-error">{errors.password.message}</p>}
            </div>

            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="register-confirm">Підтвердження пароля</label>
                <input id="register-confirm" type="password" autoComplete="new-password" className="auth-form-input"
                    {...register("confirmPassword", {
                        required: "Повторіть пароль",
                        validate: (v) => v === getValues("password") || "Паролі не збігаються",
                    })} />
                {errors.confirmPassword && <p className="auth-form-error">{errors.confirmPassword.message}</p>}
            </div>

            {errors.root   && <p className="auth-form-error auth-form-error--root">{errors.root.message}</p>}
            {sendError     && <p className="auth-form-error auth-form-error--root">{sendError}</p>}

            <Button type="submit" variant="primary" className="auth-form-submit" disabled={isSubmitting || sending}>
                {sending ? "Надсилання…" : "Надіслати код підтвердження"}
            </Button>
        </form>
    );
};

export default RegisterForm;
