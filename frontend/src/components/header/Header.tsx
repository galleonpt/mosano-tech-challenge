import { Button, Flex, Select } from "antd";
import type { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header: FC = () => {
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
                <Link to="/" className={styles.navLink}>
                    Home
                </Link>
                <Link to="/revisited" className={styles.navLink}>
                    Revisited
                </Link>
            </Flex>

            {/* Right */}
            <Flex gap="middle" align="center">
                <Button type="primary">Login</Button>
                <Select
                    defaultValue="en"
                    options={languageOptions}
                    style={{ width: 120 }}
                />
            </Flex>
        </Flex>
    );
};
