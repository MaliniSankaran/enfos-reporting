import { useEffect, useState } from "react";
import type { Project } from "../types/Project";
import { getProjects } from "../services/projectService";
import ReportTable from "./ReportTable";
import StatusChip from "./StatusChip.tsx";
import type { Column } from "../types/Column";
import {Box, CircularProgress} from "@mui/material";

const projectColumns: Column<Project>[] = [
    { header: "Project ID", render: (p) => p.projectId },
    { header: "Project Name", render: (p) => p.projectName },
    { header: "Department", render: (p) => p.departmentName },
    { header: "Owner", render: (p) => p.ownerName },
    { header: "Status", render: (p) => <StatusChip value={p.status} /> },
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

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }
    if (error) return <p>Unable to load projects. Please try again later.</p>;

    return <ReportTable columns={projectColumns} data={projects} getRowKey={(p) => p.projectId} />;
}

export default ProjectReport;