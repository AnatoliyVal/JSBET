import {useForm} from "react-hook-form";
import {useState, useEffect} from "react";
import Button from "../../AllButtons/Button";
import {useAuthStore} from "../../../store/authStore.ts";
import {getProfile} from "../../../lib/profilesService.ts";
import {generateCode, sendVerificationCode} from "../../../lib/emailService.ts";
import VerifyCodeForm from "../VerifyCodeForm";
import {S} from "./styles.ts";

export type RegisterFormValues = { displayName: string; email: string; password: string; confirmPassword: string; };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_TTL_SEC = 300;

const RegisterForm = ({onSuccess}: { onSuccess: () => void }) => {
    const registerUser = useAuthStore((s) => s.register);
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: {errors, isSubmitting}
    } = useForm<RegisterFormValues>({
        defaultValues: {displayName: "", email: "", password: "", confirmPassword: ""},
    });

    const [step, setStep] = useState<"form" | "verify">("form");
    const [pendingCode, setPending] = useState("");
    const [codeError, setCodeError] = useState("");
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [expiry, setExpiry] = useState<number | null>(null);

    useEffect(() => {
        if (!expiry) return;
        const tick = setInterval(() => {
            const left = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
            setCountdown(left);
            if (left === 0) clearInterval(tick);
        }, 1000);
        return () => clearInterval(tick);
    }, [expiry]);

    const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

    const onSubmitForm = async (data: RegisterFormValues) => {
        setSending(true);
        setSendError("");
        try {
            const normalized = data.email.trim().toLowerCase();
            const localExists = useAuthStore.getState().demoUsers[normalized];
            if (localExists || await getProfile(normalized)) {
                setError("email", {type: "server", message: "Користувач з таким email уже існує"});
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

    const handleResend = async () => {
        if (countdown > 0) return;
        const {email, displayName} = getValues();
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
        const {email, password, displayName} = getValues();
        const result = await registerUser(email, password, displayName);
        if (result.ok) onSuccess(); else setCodeError("message" in result ? result.message : "Помилка реєстрації");
    };

    if (step === "verify") {
        return (
            <div style={S.verifyStep}>
                <div style={S.verifyIcon}><i className="fa-solid fa-envelope-open-text"/></div>
                <h3 style={S.verifyTitle}>Підтвердження Email</h3>
                <p style={S.verifyDesc}>Ми надіслали 6-значний код на <strong>{getValues().email}</strong>.<br/>Введи
                    його нижче.</p>
                <VerifyCodeForm onComplete={handleCodeComplete} disabled={sending}/>
                {codeError && <p style={S.errorRoot}>{codeError}</p>}
                <div style={S.verifyFooter}>
                    {countdown > 0 ? (
                        <span style={S.verifyCountdown}>Повторно надіслати через {formatTime(countdown)}</span>
                    ) : (
                        <button className="verify-resend-btn" style={S.verifyResendBtn} onClick={handleResend}
                                disabled={sending}>
                            {sending ? "Надсилання…" : "Надіслати код ще раз"}
                        </button>
                    )}
                    <button className="verify-back-btn" style={S.verifyBackBtn} onClick={() => setStep("form")}>← Назад
                        до форми
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form style={S.form} onSubmit={handleSubmit(onSubmitForm)} noValidate>
            <div style={S.field}>
                <label style={S.label} htmlFor="register-name">Ім&apos;я</label>
                <input id="register-name" type="text" autoComplete="name" style={S.input}
                       {...register("displayName", {
                           required: "Введіть ім'я",
                           minLength: {value: 2, message: "Мінімум 2 символи"}
                       })} />
                {errors.displayName && <p style={S.error}>{errors.displayName.message}</p>}
            </div>
            <div style={S.field}>
                <label style={S.label} htmlFor="register-email">Email</label>
                <input id="register-email" type="email" autoComplete="email" style={S.input}
                       {...register("email", {
                           required: "Введіть email",
                           pattern: {value: emailPattern, message: "Некоректний email"}
                       })} />
                {errors.email && <p style={S.error}>{errors.email.message}</p>}
            </div>
            <div style={S.field}>
                <label style={S.label} htmlFor="register-password">Пароль</label>
                <input id="register-password" type="password" autoComplete="new-password" style={S.input}
                       {...register("password", {
                           required: "Придумайте пароль",
                           minLength: {value: 6, message: "Мінімум 6 символів"}
                       })} />
                {errors.password && <p style={S.error}>{errors.password.message}</p>}
            </div>
            <div style={S.field}>
                <label style={S.label} htmlFor="register-confirm">Підтвердження пароля</label>
                <input id="register-confirm" type="password" autoComplete="new-password" style={S.input}
                       {...register("confirmPassword", {
                           required: "Повторіть пароль",
                           validate: (v) => v === getValues("password") || "Паролі не збігаються"
                       })} />
                {errors.confirmPassword && <p style={S.error}>{errors.confirmPassword.message}</p>}
            </div>
            {errors.root && <p style={S.errorRoot}>{errors.root.message}</p>}
            {sendError && <p style={S.errorRoot}>{sendError}</p>}
            <Button type="submit" variant="primary" style={S.submitBtn} disabled={isSubmitting || sending}>
                {sending ? "Надсилання…" : "Надіслати код підтвердження"}
            </Button>
        </form>
    );
};

export default RegisterForm;
