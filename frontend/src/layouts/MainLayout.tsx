import type { FC, PropsWithChildren } from "react";
import { Header } from "../components/header";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};
