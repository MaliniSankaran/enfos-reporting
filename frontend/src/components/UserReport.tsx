import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getUsers } from "../services/userService";
import ReportTable from "./ReportTable";
import StatusChip from "./StatusChip.tsx";
import type { Column } from "../types/Column";
import { Box, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const userColumns: Column<User>[] = [
    { header: "User ID", render: (u) => u.userId },
    { header: "Name", render: (u) => u.name },
    { header: "Email", render: (u) => u.email },
    { header: "Role", render: (u) => u.role },
    { header: "Status", render: (u) => <StatusChip value={u.status} /> },
    { header: "Created Date", render: (u) => new Date(u.createdDate).toLocaleDateString(undefined, { timeZone: "UTC" }) },
];

function UserReport() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [roleFilter, setRoleFilter] = useState<string>("ALL");

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
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
    if (error) return <p>Unable to load reports. Please try again later.</p>;
    const filteredUsers = users.filter((u) => {
        const statusMatch = statusFilter === "ALL" || u.status === statusFilter;
        const roleMatch = roleFilter === "ALL" || u.role === roleFilter;
        return statusMatch && roleMatch;
    });

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 , ml:4}}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Status</InputLabel>
                    <Select value={statusFilter} label="Filter by Status" onChange={(e) => setStatusFilter(e.target.value)}>
                        <MenuItem value="ALL">All</MenuItem>
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                        <MenuItem value="PENDING">Pending</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Role</InputLabel>
                    <Select value={roleFilter} label="Filter by Role" onChange={(e) => setRoleFilter(e.target.value)}>
                        <MenuItem value="ALL">All</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="MANAGER">Manager</MenuItem>
                        <MenuItem value="USER">User</MenuItem>
                    </Select>
                </FormControl>

                {(statusFilter !== "ALL" || roleFilter !== "ALL") && (
                    <Button size="small" onClick={() => { setStatusFilter("ALL"); setRoleFilter("ALL"); }}>
                        Clear Filters
                    </Button>
                )}
            </Box>
            <ReportTable columns={userColumns} data={filteredUsers} getRowKey={(u) => u.userId} />
        </>
    );
}

export default UserReport;