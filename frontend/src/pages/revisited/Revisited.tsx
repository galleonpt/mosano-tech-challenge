import { type FC, useEffect } from "react";
import { BirthdayGreeting } from "../../components/birthdayGreeting";
import { Spinner } from "../../components/spinner";
import { VisitorsTable } from "../../components/VisitorsTable";
import { type Visitor } from "../../contexts/VisitorsContext";
import { useVisitors } from "../../hooks/useVisitors";
import styles from "./Revisited.module.css";

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
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <VisitorsTable
                visitors={visitors}
                onRowClick={handleRowClick}
                showCreatedAt
            />

            <BirthdayGreeting visitor={selectedVisitor} />
        </div>
    );
};
