import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./NavLink.module.css";

interface NavLinkProps {
    to: string;
    disabled?: boolean;
    children: ReactNode;
}

export const NavLink: FC<NavLinkProps> = ({ to, disabled, children }) => {
    if (disabled) {
        return (
            <span className={`${styles.navLink} ${styles.disabled}`}>
                {children}
            </span>
        );
    }
    return (
        <Link to={to} className={styles.navLink}>
            {children}
        </Link>
    );
};
