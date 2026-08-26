import { type FC, type PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const { t } = useTranslation();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        toast.error(t("errors.must_be_logged_id"));
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
