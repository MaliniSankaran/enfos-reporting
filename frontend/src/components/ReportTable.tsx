import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Typography, TablePagination,
} from "@mui/material";

import type { Column } from "../types/Column";

interface ReportTableProps<T> {
    columns: Column<T>[];
    data: T[];
    getRowKey: (row: T) => string;
    highlightKey?: string;
}

function ReportTable<T>({ columns, data, getRowKey, highlightKey }: ReportTableProps<T>) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    if (data.length === 0) {
        return <Typography>No data available.</Typography>;
    }

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper} className="clickable" sx={{ maxWidth: 1300, mx: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "grey.100" }}>
                        {columns.map((col) => (
                            <TableCell key={col.header} align={col.align} sx={{ fontWeight: "bold", borderRight: "1px solid", borderColor: "grey.300" }}>
                                {col.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData.map((row) => (
                        <TableRow key={getRowKey(row)} hover sx={getRowKey(row) === highlightKey ? { backgroundColor: "#e3f2fd" } : undefined}>
                            {columns.map((col) => (
                                <TableCell key={col.header} align={col.align} sx={{ borderRight: "1px solid", borderColor: "grey.200" }}>
                                    {col.render(row)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </TableContainer>
    );
}

export default ReportTable;