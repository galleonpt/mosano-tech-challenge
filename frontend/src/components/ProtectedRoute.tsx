import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (!isLoggedIn) {
            setShowError(true);
            navigate("/");
        }

        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (showError) {
        return (
            <div style={{ padding: "20px", color: "red" }}>
                <p>You must be logged in to access this page</p>
            </div>
        );
    }

    return <>{children}</>;
};
