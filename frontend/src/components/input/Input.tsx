import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { RequiredSymbol } from "../requiredSymbol";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
    error?: ReactNode;
    helperText?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className, required, ...props }, ref) => {
        return (
            <div className={styles.wrapper}>
                {label && (
                    <label className={styles.label}>
                        {label}
                        {required && <RequiredSymbol />}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`${styles.input} ${error ? styles.error : ""} ${className || ""}`}
                    {...props}
                />
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        );
    },
);

Input.displayName = "Input";
