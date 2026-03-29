import { useForm } from "react-hook-form";
import Button from "../AllButtons/Button/Button";
import { useAuthStore } from "../../store/authStore";

export type LoginFormValues = {
    email: string;
    password: string;
};

type Props = {
    onSuccess: () => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = ({ onSuccess }: Props) => {
    const login = useAuthStore((s) => s.login);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = (data: LoginFormValues) => {
        const result = login(data.email, data.password);
        if (result.ok) {
            onSuccess();
        } else {
            setError("root", { type: "server", message: result.message });
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="login-email">
                    Email
                </label>
                <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    className="auth-form-input"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                        required: "Введіть email",
                        pattern: { value: emailPattern, message: "Некоректний email" },
                    })}
                />
                {errors.email && <p className="auth-form-error">{errors.email.message}</p>}
            </div>

            <div className="auth-form-field">
                <label className="auth-form-label" htmlFor="login-password">
                    Пароль
                </label>
                <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    className="auth-form-input"
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", {
                        required: "Введіть пароль",
                        minLength: { value: 6, message: "Мінімум 6 символів" },
                    })}
                />
                {errors.password && <p className="auth-form-error">{errors.password.message}</p>}
            </div>

            {errors.root && <p className="auth-form-error auth-form-error--root">{errors.root.message}</p>}

            <Button type="submit" variant="primary" className="auth-form-submit" disabled={isSubmitting}>
                Увійти
            </Button>
        </form>
    );
};

export default LoginForm;
