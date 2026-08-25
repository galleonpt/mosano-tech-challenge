import { type FC } from "react";
import styles from "./RequiredSymbol.module.css";

export const RequiredSymbol: FC = () => (
    <span className={styles.required}>*</span>
);
