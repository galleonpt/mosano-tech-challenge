import type { FC } from "react";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation(undefined, { keyPrefix: "content" });
    const columns: TableColumn<Visitor>[] = [
        {
            key: "name",
            title: t("name"),
            width: "25%",
        },
        {
            key: "surname",
            title: t("surname"),
            width: "25%",
        },
        {
            key: "country",
            title: t("country"),
            width: "25%",
            render: (value: any) => value?.name || "-",
        },
        {
            key: "birthday",
            title: t("birthday"),
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
            title: t("created_at"),
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
