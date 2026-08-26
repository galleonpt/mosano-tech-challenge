import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/pt";
import {
    createContext,
    type PropsWithChildren,
    useEffect,
    useState,
} from "react";
import { useTranslation } from "react-i18next";

export const APP_LANGUAGE_STORAGE_KEY = "mosano_selected_app_language";

export enum SupportedLanguages {
    ENGLISH = "en",
    PORTUGUESE = "pt",
}

export interface LanguageContextData {
    locale: SupportedLanguages;
    changeLocale: (lang: SupportedLanguages) => Promise<void>;
}

export const LanguageContext = createContext<LanguageContextData | undefined>(
    undefined,
);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
    const savedLang =
        localStorage.getItem(APP_LANGUAGE_STORAGE_KEY) ||
        SupportedLanguages.ENGLISH;
    const [locale, setLocale] = useState<SupportedLanguages>(
        savedLang as SupportedLanguages,
    );
    const { i18n } = useTranslation();

    useEffect(() => {
        setLocale(i18n.language as SupportedLanguages);
        dayjs.locale(i18n.language);
    }, [i18n.language]);

    const handleChangeLocale = async (lang: SupportedLanguages) => {
        localStorage.setItem(APP_LANGUAGE_STORAGE_KEY, lang);
        await i18n.changeLanguage(lang);
        setLocale(lang);
    };

    return (
        <LanguageContext.Provider
            value={{ locale, changeLocale: handleChangeLocale }}
        >
            {children}
        </LanguageContext.Provider>
    );
};
