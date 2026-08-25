import type { FC } from "react";
import type { Visitor } from "../contexts/VisitorsContext";
import type { TableColumn } from "./table";
import { Table } from "./table";

interface VisitorsTableProps {
    visitors: Visitor[];
    onRowClick?: (visitor: Visitor) => void;
    showCreatedAt?: boolean;
}

export const VisitorsTable: FC<VisitorsTableProps> = ({
    visitors,
    onRowClick,
    showCreatedAt = false,
}) => {
    const columns: TableColumn<Visitor>[] = [
        {
            key: "name",
            title: "Name",
            width: "25%",
        },
        {
            key: "surname",
            title: "Surname",
            width: "25%",
        },
        {
            key: "country",
            title: "Country",
            width: "25%",
            render: (value: any) => value?.name || "-",
        },
        {
            key: "birthday",
            title: "Birthday",
            width: "25%",
            render: (date: string) => {
                const d = new Date(date);
                return d.toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
            },
        },
    ];

    if (showCreatedAt) {
        columns.push({
            key: "created_at",
            title: "Created At",
            width: "20%",
            render: (date: string) => {
                const d = new Date(date);
                return d.toLocaleString("pt-pt");
            },
        });
    }

    return (
        <Table
            columns={columns}
            data={visitors}
            rowKey="_id"
            onRowClick={onRowClick}
        />
    );
};
