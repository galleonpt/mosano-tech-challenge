import { Flex, Spin } from "antd";
import { type FC, useEffect } from "react";
import { BirthdayGreeting } from "../components/BirthdayGreeting";
import { VisitorsTable } from "../components/VisitorsTable";
import { type Visitor } from "../contexts/VisitorsContext";
import { useVisitors } from "../hooks/useVisitors";

export const Revisited: FC = () => {
    const {
        selectedVisitor,
        setSelectedVisitor,
        visitors,
        fetchVisitors,
        loading,
    } = useVisitors();

    useEffect(() => {
        fetchVisitors();
    }, []);

    const handleRowClick = (visitor: Visitor) => {
        setSelectedVisitor(visitor);
    };

    if (loading) {
        return <Spin />;
    }

    return (
        <Flex vertical gap="large" style={{ padding: "24px" }}>
            <div>
                <h2 style={{ margin: "0 0 16px 0" }}>Visitors History</h2>
                <VisitorsTable
                    visitors={visitors}
                    onRowClick={handleRowClick}
                    showCreatedAt
                />
            </div>

            <BirthdayGreeting visitor={selectedVisitor} />
        </Flex>
    );
};
