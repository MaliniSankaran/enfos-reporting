export interface Column<T> {
    header: string;
    render: (row: T) => React.ReactNode;
    align?: "left" | "right" | "center";
}