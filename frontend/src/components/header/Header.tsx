import type { FC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../button";
import { NavLink } from "../navLink";
import { Select } from "../select";
import styles from "./Header.module.css";

export const Header: FC = () => {
    const { login: handleLogin, logout: handleLogout, isLoggedIn } = useAuth();

    const languageOptions = [
        { label: "English", value: "en" },
        { label: "Portuguese", value: "pt" },
    ];

    return (
        <div className={styles.container}>
            <span className={styles.title}>
                Tech Challenge - José Rodrigues
            </span>

            {/* Center */}
            <div className={styles.pages}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/revisited" disabled={!isLoggedIn}>
                    Revisited
                </NavLink>
            </div>

            {/* Right */}
            <div className={styles.right}>
                {!isLoggedIn && <Button onClick={handleLogin} label="Login" />}
                {isLoggedIn && <Button onClick={handleLogout} label="Logout" />}
                <Select
                    defaultValue="en"
                    options={languageOptions}
                    style={{ width: 120 }}
                />
            </div>
        </div>
    );
};
