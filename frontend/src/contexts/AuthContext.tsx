import { message } from "antd";
import {
    createContext,
    type FC,
    type PropsWithChildren,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return localStorage.getItem(STORAGE_AUTH_KEY) === "true";
    });

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "isLoggedIn") {
                setIsLoggedIn(e.newValue === "true");
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const login = () => {
        localStorage.setItem(STORAGE_AUTH_KEY, "true");
        setIsLoggedIn(true);
        message.success("You have successfully logged in.");
    };

    const logout = () => {
        localStorage.setItem(STORAGE_AUTH_KEY, "false");
        setIsLoggedIn(false);
        message.success("You have successfully logged out.");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
