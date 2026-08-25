import { message } from "antd";
import { type FC, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        message.error("You must be logged in to access this page");
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
