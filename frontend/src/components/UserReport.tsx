import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getUsers } from "../services/userService";
import ReportTable from "./ReportTable";
import StatusChip from "./StatusChip.tsx";
import type { Column } from "../types/Column";
import {Box, CircularProgress} from "@mui/material";

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

    return <ReportTable columns={userColumns} data={users} getRowKey={(u) => u.userId} />;
}

export default UserReport;