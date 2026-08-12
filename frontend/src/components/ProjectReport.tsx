import { useEffect, useState } from "react";
import type { Project } from "../types/Project";
import { getProjects } from "../services/projectService";
import ReportTable from "./ReportTable";
import StatusChip from "./StatusChip.tsx";
import type { Column } from "../types/Column";
import { Box, CircularProgress, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

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
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

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

    const filteredProjects = statusFilter === "ALL" ? projects : projects.filter((p) => p.status === statusFilter);

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, ml : 4 }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Status</InputLabel>
                    <Select value={statusFilter} label="Filter by Status" onChange={(e) => setStatusFilter(e.target.value)}>
                        <MenuItem value="ALL">All</MenuItem>
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="COMPLETED">Completed</MenuItem>
                        <MenuItem value="ON_HOLD">On Hold</MenuItem>
                        <MenuItem value="CANCELLED">Cancelled</MenuItem>
                    </Select>
                </FormControl>

                {statusFilter !== "ALL" && (
                    <Button size="small" onClick={() => setStatusFilter("ALL")}>
                        Clear Filters
                    </Button>
                )}
            </Box>
            <ReportTable columns={projectColumns} data={filteredProjects} getRowKey={(p) => p.projectId} />
        </>
    );
}

export default ProjectReport;