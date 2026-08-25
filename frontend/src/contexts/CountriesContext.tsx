import { message } from "antd";
import {
    createContext,
    type FC,
    type PropsWithChildren,
    useState,
} from "react";
import { API_URL } from "../api/constants.api";

export interface Country {
    _id: string;
    name: string;
}

export interface CountriesContextType {
    countries: Country[];
    loading: boolean;
    fetchCountries: () => Promise<void>;
}

export const CountriesContext = createContext<CountriesContextType | undefined>(
    undefined,
);

export const CountriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCountries = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/countries`);
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            message.error("Failed to fetch countries");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CountriesContext.Provider
            value={{
                countries,
                loading,
                fetchCountries,
            }}
        >
            {children}
        </CountriesContext.Provider>
    );
};
