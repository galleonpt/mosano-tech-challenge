import { useContext } from "react";
import { VisitorsContext } from "../contexts/VisitorsContext";

export const useVisitors = () => {
    const context = useContext(VisitorsContext);
    if (!context) {
        throw new Error("useVisitors must be used within VisitorsProvider");
    }
    return context;
};
