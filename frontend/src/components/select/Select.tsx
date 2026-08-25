import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";
import { RequiredSymbol } from "../requiredSymbol";
import styles from "./Select.module.css";

interface SelectOption {
    label: ReactNode;
    value: string | number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: ReactNode;
    error?: ReactNode;
    options: SelectOption[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        { label, error, className, options, placeholder, required, ...props },
        ref,
    ) => {
        return (
            <div className={styles.wrapper}>
                {label && (
                    <label className={styles.label}>
                        {label}
                        {required && <RequiredSymbol />}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`${styles.select} ${error ? styles.error : ""} ${className || ""}`}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        );
    },
);

Select.displayName = "Select";
