import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ label, disabled, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`${styles.button} ${className || ""}`}
                disabled={disabled}
                {...props}
            >
                {label}
            </button>
        );
    },
);

Button.displayName = "Button";
