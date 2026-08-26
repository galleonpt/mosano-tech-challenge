import {
    createContext,
    type FC,
    type PropsWithChildren,
    useEffect,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const STORAGE_AUTH_KEY = "isLoggedIn";

export type AuthContextType = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { t } = useTranslation(undefined, { keyPrefix: "toasts" });
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return localStorage.getItem(STORAGE_AUTH_KEY) === "true";
    });

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_AUTH_KEY) {
                setIsLoggedIn(e.newValue === "true");
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const login = () => {
        localStorage.setItem(STORAGE_AUTH_KEY, "true");
        setIsLoggedIn(true);
        toast.success(t("login"));
    };

    const logout = () => {
        localStorage.setItem(STORAGE_AUTH_KEY, "false");
        setIsLoggedIn(false);
        toast.success(t("logout"));
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
