import { useForm } from "react-hook-form";
import Button from "../AllButtons/Button/Button";
import { useAuthStore } from "../../store/authStore";

export type RegisterFormValues = {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type Props = {
    onSuccess: () => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterForm = ({ onSuccess }: Props) => {
    const registerUser = useAuthStore((s) => s.register);

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: RegisterFormValues) => {
        const result = registerUser(data.email, data.password, data.displayName);
        if (result.ok) {
            onSuccess();
        } else {
            setError("root", { type: "server", message: "message" in result ? result.message : "Помилка реєстрації" });
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="register-name">
                    Ім&apos;я
                </label>
                <input
                    id="register-name"
                    type="text"
                    autoComplete="name"
                    className="auth-form-input"
                    {...register("displayName", {
                        required: "Введіть ім'я",
                        minLength: { value: 2, message: "Мінімум 2 символи" },
                    })}
                />
                {errors.displayName && (
                    <p className="auth-form-error">{errors.displayName.message}</p>
                )}
            </div>

            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="register-email">
                    Email
                </label>
                <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    className="auth-form-input"
                    {...register("email", {
                        required: "Введіть email",
                        pattern: { value: emailPattern, message: "Некоректний email" },
                    })}
                />
                {errors.email && <p className="auth-form-error">{errors.email.message}</p>}
            </div>

            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="register-password">
                    Пароль
                </label>
                <input
                    id="register-password"
                    type="password"
                    autoComplete="new-password"
                    className="auth-form-input"
                    {...register("password", {
                        required: "Придумайте пароль",
                        minLength: { value: 6, message: "Мінімум 6 символів" },
                    })}
                />
                {errors.password && <p className="auth-form-error">{errors.password.message}</p>}
            </div>

            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="register-confirm">
                    Підтвердження пароля
                </label>
                <input
                    id="register-confirm"
                    type="password"
                    autoComplete="new-password"
                    className="auth-form-input"
                    {...register("confirmPassword", {
                        required: "Повторіть пароль",
                        validate: (value) =>
                            value === getValues("password") || "Паролі не збігаються",
                    })}
                />
                {errors.confirmPassword && (
                    <p className="auth-form-error">{errors.confirmPassword.message}</p>
                )}
            </div>

            {errors.root && <p className="auth-form-error auth-form-error--root">{errors.root.message}</p>}

            <Button type="submit" variant="primary" className="auth-form-submit" disabled={isSubmitting}>
                Зареєструватись
            </Button>
        </form>
    );
};

export default RegisterForm;
