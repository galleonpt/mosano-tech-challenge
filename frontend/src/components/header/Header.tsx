import { Button, Flex, Select } from "antd";
import type { FC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "../navLink";
import styles from "./Header.module.css";

export const Header: FC = () => {
    const { login: handleLogin, logout: handleLogout, isLoggedIn } = useAuth();

    const languageOptions = [
        { label: "English", value: "en" },
        { label: "Portuguese", value: "pt" },
    ];

    return (
        <Flex
            align="center"
            justify="space-between"
            className={styles.container}
        >
            {/* Left */}
            <div className={styles.left}>
                <span className={styles.title}>Mosano tech challenge</span>
            </div>

            {/* Center */}
            <Flex gap="large" className={styles.center}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/revisited" disabled={!isLoggedIn}>
                    Revisited
                </NavLink>
            </Flex>

            {/* Right */}
            <Flex gap="middle" align="center">
                {!isLoggedIn && (
                    <Button onClick={handleLogin} type="primary">
                        Login
                    </Button>
                )}
                {isLoggedIn && (
                    <Button onClick={handleLogout} type="primary">
                        Logout
                    </Button>
                )}
                <Select
                    defaultValue="en"
                    options={languageOptions}
                    style={{ width: 120 }}
                />
            </Flex>
        </Flex>
    );
};
