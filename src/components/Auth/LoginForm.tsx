import { useForm } from "react-hook-form";
import Button from "../AllButtons/Button/Button";
import { useAuthStore } from "../../store/authStore";
import { S } from "./AuthStyle";

export type LoginFormValues = { email: string; password: string; };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const login = useAuthStore((s) => s.login);
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: LoginFormValues) => {
        const result = await login(data.email, data.password);
        if (result.ok) onSuccess();
        else setError("root", { type: "server", message: "message" in result ? result.message : "Помилка входу" });
    };

    return (
        <form style={S.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div style={S.field}>
                <label style={S.label} htmlFor="login-email">Email</label>
                <input id="login-email" type="email" autoComplete="email" style={S.input}
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", { required: "Введіть email", pattern: { value: emailPattern, message: "Некоректний email" } })} />
                {errors.email && <p style={S.error}>{errors.email.message}</p>}
            </div>

            <div style={S.field}>
                <label style={S.label} htmlFor="login-password">Пароль</label>
                <input id="login-password" type="password" autoComplete="current-password" style={S.input}
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", { required: "Введіть пароль", minLength: { value: 6, message: "Мінімум 6 символів" } })} />
                {errors.password && <p style={S.error}>{errors.password.message}</p>}
            </div>

            {errors.root && <p style={S.errorRoot}>{errors.root.message}</p>}

            <Button type="submit" variant="primary" style={S.submitBtn} disabled={isSubmitting}>Увійти</Button>
        </form>
    );
};

export default LoginForm;
