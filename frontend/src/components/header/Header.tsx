import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { SupportedLanguages } from "../../contexts/LanguageContext";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import { Button } from "../button";
import { NavLink } from "../navLink";
import { Select } from "../select";
import styles from "./Header.module.css";

export const Header: FC = () => {
    const { login: handleLogin, logout: handleLogout, isLoggedIn } = useAuth();
    const { locale, changeLocale } = useLanguage();
    const { t } = useTranslation(undefined, { keyPrefix: "header" });

    const languageOptions = [
        {
            label: t("supported_languages.english"),
            value: SupportedLanguages.ENGLISH,
        },
        {
            label: t("supported_languages.portuguese"),
            value: SupportedLanguages.PORTUGUESE,
        },
    ];

    return (
        <div className={styles.container}>
            <span className={styles.title}>{t("title")}</span>

            {/* Center */}
            <div className={styles.pages}>
                <NavLink to="/">{t("home")}</NavLink>
                <NavLink to="/revisited" disabled={!isLoggedIn}>
                    {t("revisited")}
                </NavLink>
            </div>

            {/* Right */}
            <div className={styles.right}>
                {!isLoggedIn && (
                    <Button onClick={handleLogin} label={t("login")} />
                )}
                {isLoggedIn && (
                    <Button onClick={handleLogout} label={t("logout")} />
                )}
                <Select
                    value={locale}
                    options={languageOptions}
                    style={{ width: 120 }}
                    onChange={(event) =>
                        changeLocale(event.currentTarget.value as any)
                    }
                />
            </div>
        </div>
    );
};
