import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { RequiredSymbol } from "../requiredSymbol";
import styles from "./DatePicker.module.css";

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
    error?: ReactNode;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
    ({ label, error, className, required, ...props }, ref) => {
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
                    type="date"
                    className={`${styles.input} ${error ? styles.error : ""} ${className || ""}`}
                    {...props}
                />
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        );
    },
);

DatePicker.displayName = "DatePicker";
