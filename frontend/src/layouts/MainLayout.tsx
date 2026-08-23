import { Layout } from "antd";
import type { FC, PropsWithChildren } from "react";
import { Header } from "../components/header/Header";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Layout>
            <Layout.Header style={{ padding: 0 }}>
                <Header />
            </Layout.Header>
            <Layout.Content>{children}</Layout.Content>
        </Layout>
    );
};
