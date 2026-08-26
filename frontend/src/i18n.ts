import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import {
    APP_LANGUAGE_STORAGE_KEY,
    SupportedLanguages,
} from "./contexts/LanguageContext";

i18next
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        react: {
            useSuspense: true,
        },
        backend: {
            loadPath: `/locales/translations.{{lng}}.json`,
        },
        debug: false,
        lng:
            localStorage.getItem(APP_LANGUAGE_STORAGE_KEY) ||
            SupportedLanguages.ENGLISH,
        fallbackLng: SupportedLanguages.ENGLISH,
        returnEmptyString: false,
        returnNull: false,
        ns: ["common"],
        defaultNS: "common",
        detection: {
            // order and from where user language should be detected
            order: ["localStorage", "cookie"],
            // keys or params to lookup language from
            lookupCookie: "i18nextLng",
            lookupQuerystring: "i18nextLng",
            // cache user language on
            caches: ["localStorage", "cookie"],
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });
