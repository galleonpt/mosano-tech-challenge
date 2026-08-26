import type { FC, ReactNode } from "react";
import styles from "./Table.module.css";

export interface TableColumn<T> {
    key: keyof T;
    title: string;
    render?: (value: any, record: T, index: number) => ReactNode;
    width?: string | number;
}

interface TableProps<T extends Record<string, any>> {
    columns: TableColumn<T>[];
    data: T[];
    rowKey: keyof T;
    onRowClick?: (record: T, index: number) => void;
    loading?: boolean;
    emptyMessage?: string;
}

export const Table: FC<TableProps<any>> = ({
    columns,
    data,
    rowKey,
    onRowClick,
    loading = false,
    emptyMessage = "No data available",
}) => {
    if (loading) {
        return <div className={styles.loadingContainer}>Loading...</div>;
    }

    if (data.length === 0) {
        return <div className={styles.emptyContainer}>{emptyMessage}</div>;
    }

    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={String(column.key)}
                            className={styles.th}
                            style={{ width: column.width }}
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {data.map((row, index) => (
                    <tr
                        key={row[rowKey]}
                        onClick={() => onRowClick?.(row, index)}
                        data-clickable={Boolean(onRowClick)}
                    >
                        {columns.map((column) => (
                            <td
                                key={`${String(row[rowKey])}-${String(column.key)}`}
                                className={styles.td}
                            >
                                {column.render
                                    ? column.render(row[column.key], row, index)
                                    : row[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
