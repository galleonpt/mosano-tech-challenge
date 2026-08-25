import { message } from "antd";
import type { Dayjs } from "dayjs";
import {
    createContext,
    type FC,
    type PropsWithChildren,
    useState,
} from "react";
import { API_KEY, API_URL } from "../api/constants.api";
import { useAuth } from "../hooks/useAuth";

export interface Visitor {
    _id: string;
    name: string;
    surname: string;
    country: {
        name: string;
    };
    birthday: Dayjs;
    created_at: string;
}

export interface VisitorsContextType {
    visitors: Visitor[];
    loading: boolean;
    selectedVisitor: Visitor | null;
    setSelectedVisitor: React.Dispatch<React.SetStateAction<Visitor | null>>;
    addVisitor: (
        visitor: Omit<Visitor, "_id" | "created_at">,
        countryId: string,
    ) => Promise<void>;
    fetchVisitors: () => Promise<void>;
}

export const VisitorsContext = createContext<VisitorsContextType | undefined>(
    undefined,
);

export const VisitorsProvider: FC<PropsWithChildren> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(
        null,
    );

    const fetchVisitors = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/visitors`);
            const data = await response.json();
            setVisitors(data);
        } catch (error) {
            message.error("Failed to fetch visitors");
        } finally {
            setLoading(false);
        }
    };

    const addVisitor = async (
        visitor: Omit<Visitor, "_id" | "created_at">,
        countryId: string,
    ) => {
        try {
            const payload = {
                name: visitor.name,
                surname: visitor.surname,
                country_id: countryId,
                birthday: visitor.birthday,
            };

            const response = await fetch(`${API_URL}/visitors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": isLoggedIn ? API_KEY : undefined,
                },
                body: JSON.stringify(payload),
            });

            const newVisitor = await response.json();
            setVisitors((prev) => [...prev, newVisitor]);
        } catch (err) {
            throw err;
        }
    };

    return (
        <VisitorsContext.Provider
            value={{
                visitors,
                loading,
                addVisitor,
                selectedVisitor,
                setSelectedVisitor,
                fetchVisitors,
            }}
        >
            {children}
        </VisitorsContext.Provider>
    );
};
