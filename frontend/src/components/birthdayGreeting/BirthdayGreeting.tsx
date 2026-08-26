import dayjs from "dayjs";
import type { FC } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Visitor } from "../../contexts/VisitorsContext";
import { useLanguage } from "../../hooks/useLanguage";
import { getNextBirthdayInfo } from "../../utils/birthday";
import { getFullName } from "../../utils/visitor";
import styles from "./BirthdayGreeting.module.css";

interface BirthdayGreetingProps {
    visitor: Visitor | null;
}

export const BirthdayGreeting: FC<BirthdayGreetingProps> = ({ visitor }) => {
    const { t } = useTranslation(undefined, { keyPrefix: "birthday_greeting" });
    const { locale } = useLanguage();

    useEffect(() => {
        dayjs.locale(locale);
    }, [locale]);

    if (!visitor) {
        return null;
    }

    const { day, month, nextAge } = getNextBirthdayInfo(visitor);

    return (
        <div className={styles.container}>
            {t("message", {
                name: getFullName(visitor),
                country: visitor.country.name,
                day,
                month,
                nextAge,
                count: nextAge,
            })}
        </div>
    );
};
