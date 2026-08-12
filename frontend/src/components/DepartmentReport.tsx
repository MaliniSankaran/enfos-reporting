import { useEffect, useState } from "react";
import type { Department } from "../types/Department";
import { getDepartments } from "../services/departmentService";
import type { Column } from "../types/Column";
import ReportTable from "./ReportTable";
import {Box, CircularProgress} from "@mui/material";

const departmentColumns: Column<Department>[] = [
    { header: "Department ID", render: (d) => d.departmentId },
    { header: "Department Name", render: (d) => d.departmentName },
    { header: "Manager", render: (d) => d.managerName },
    { header: "Employee Count", render: (d) => d.employeeCount, align: "right"},
    { header: "Location", render: (d) => d.location },
];

function DepartmentReport() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getDepartments()
            .then((data) => setDepartments(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }
    if (error) return <p>Unable to load departments. Please try again later.</p>;

    return <ReportTable columns={departmentColumns} data={departments} getRowKey={(d) => d.departmentId} />;
}

export default DepartmentReport;