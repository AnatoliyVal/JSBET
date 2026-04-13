import {useState} from "react";
import type {ButtonHTMLAttributes, ReactNode} from "react";
import {btnPrimary, btnGhost, btnGhostSm, btnSm} from "./styles.ts";

export type ButtonVariant = "primary" | "ghost" | "ghost-sm";

export type ButtonProps = {
    children: ReactNode;
    variant?: ButtonVariant;
    small?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const Button = ({
                    children,
                    variant = "primary",
                    small = false,
                    type = "button",
                    style: extraStyle,
                    ...rest
                }: ButtonProps) => {
    const [hover, setHover] = useState(false);

    const varStyle = variant === "primary"
        ? btnPrimary(hover)
        : variant === "ghost-sm"
            ? btnGhostSm(hover)
            : btnGhost(hover);

    const combined = small && variant !== "ghost-sm"
        ? {...varStyle, ...btnSm, ...extraStyle}
        : {...varStyle, ...extraStyle};

    return (
        <button
            type={type}
            style={combined}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
