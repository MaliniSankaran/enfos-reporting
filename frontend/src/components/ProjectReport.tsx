import { useEffect, useState } from "react";
import type { Project } from "../types/Project";
import { getProjects } from "../services/projectService";
import ReportTable from "./ReportTable";

interface Column<T> {
    header: string;
    render: (row: T) => React.ReactNode;
}

const projectColumns: Column<Project>[] = [
    { header: "Project ID", render: (p) => p.projectId },
    { header: "Project Name", render: (p) => p.projectName },
    { header: "Department", render: (p) => p.departmentName },
    { header: "Owner", render: (p) => p.ownerName },
    { header: "Status", render: (p) => p.status },
    { header: "Start Date", render: (p) => new Date(p.startDate).toLocaleDateString(undefined, { timeZone: "UTC" }) },
    { header: "End Date", render: (p) => (p.endDate ? new Date(p.endDate).toLocaleDateString(undefined, { timeZone: "UTC" }) : "In Progress") },
];

function ProjectReport() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProjects()
            .then((data) => setProjects(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>Something went wrong: {error}</p>;

    return <ReportTable columns={projectColumns} data={projects} getRowKey={(p) => p.projectId} />;
}

export default ProjectReport;