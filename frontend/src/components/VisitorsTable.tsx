import type { TableColumnsType } from "antd";
import { Table } from "antd";
import type { FC } from "react";
import type { Visitor } from "../contexts/VisitorsContext";

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
    const columns: TableColumnsType<Visitor> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "25%",
        },
        {
            title: "Surname",
            dataIndex: "surname",
            key: "surname",
            width: "25%",
        },
        {
            title: "Country",
            dataIndex: ["country", "name"],
            key: "country",
            width: "25%",
        },
        {
            title: "Birthday",
            dataIndex: "birthday",
            key: "birthday",
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
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            width: "20%",
            render: (date: string) => {
                const d = new Date(date);
                return d.toLocaleString("pt-pt");
            },
        });
    }

    return (
        <Table<Visitor>
            columns={columns}
            dataSource={visitors}
            rowKey="_id"
            pagination={false}
            onRow={(record) => ({
                onClick: () => onRowClick?.(record),
                style: { cursor: onRowClick ? "pointer" : "default" },
            })}
        />
    );
};
