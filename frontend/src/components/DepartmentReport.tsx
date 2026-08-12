import { useEffect, useState } from "react";
import type { Department } from "../types/Department";
import { getDepartments } from "../services/departmentService";
import ReportTable from "./ReportTable";

interface Column<T> {
    header: string;
    render: (row: T) => React.ReactNode;
}

const departmentColumns: Column<Department>[] = [
    { header: "Department ID", render: (d) => d.departmentId },
    { header: "Department Name", render: (d) => d.departmentName },
    { header: "Manager", render: (d) => d.managerName },
    { header: "Employee Count", render: (d) => d.employeeCount },
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

    if (loading) return <p>Loading departments...</p>;
    if (error) return <p>Something went wrong: {error}</p>;

    return <ReportTable columns={departmentColumns} data={departments} getRowKey={(d) => d.departmentId} />;
}

export default DepartmentReport;