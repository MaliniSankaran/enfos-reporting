interface Column<T> {
    header: string;
    render: (row: T) => React.ReactNode;
}

interface ReportTableProps<T> {
    columns: Column<T>[];
    data: T[];
    getRowKey: (row: T) => string;
}

function ReportTable<T>({ columns, data, getRowKey }: ReportTableProps<T>) {
    if (data.length === 0) {
        return <p>No data available.</p>;
    }

    return (
        <table>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.header}>{col.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row) => (
                <tr key={getRowKey(row)}>
                    {columns.map((col) => (
                        <td key={col.header}>{col.render(row)}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ReportTable;