import type { FC, ReactNode } from "react";

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
        return <div>Loading...</div>;
    }

    if (data.length === 0) {
        return <div>{emptyMessage}</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={String(column.key)}
                            style={{ width: column.width }}
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr
                        key={String(row[rowKey])}
                        onClick={() => onRowClick?.(row, index)}
                        style={{ cursor: onRowClick ? "pointer" : "default" }}
                    >
                        {columns.map((column) => (
                            <td
                                key={`${String(row[rowKey])}-${String(column.key)}`}
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
