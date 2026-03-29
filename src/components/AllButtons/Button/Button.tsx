import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "ghost" | "ghost-sm";

export type ButtonProps = {
    children: ReactNode;
    variant?: ButtonVariant;
    /** Додаткові класи: tournament-btn, section-link тощо */
    className?: string;
    /** Менша кнопка (профіль тощо) */
    small?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const variantClass: Record<ButtonVariant, string> = {
    primary: "btn btn--primary",
    ghost: "btn btn--ghost",
    "ghost-sm": "btn btn--ghost-sm",
};

const Button = ({
    children,
    variant = "primary",
    className = "",
    small = false,
    type = "button",
    ...rest
}: ButtonProps) => {
    const sizeClass = small && variant !== "ghost-sm" ? "btn--sm" : "";
    const combined = [variantClass[variant], sizeClass, className].filter(Boolean).join(" ");

    return (
        <button type={type} className={combined} {...rest}>
            {children}
        </button>
    );
};

export default Button;
