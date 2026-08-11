import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getUsers } from "../services/userService";
import ReportTable from "./ReportTable";

interface Column<T> {
    header: string;
    render: (row: T) => React.ReactNode;
}

const userColumns: Column<User>[] = [
    { header: "User ID", render: (u) => u.userId },
    { header: "Name", render: (u) => u.name },
    { header: "Email", render: (u) => u.email },
    { header: "Role", render: (u) => u.role },
    { header: "Status", render: (u) => u.status },
    { header: "Created Date", render: (u) => new Date(u.createdDate).toLocaleDateString() },
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

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Something went wrong: {error}</p>;

    return <ReportTable columns={userColumns} data={users} getRowKey={(u) => u.userId} />;
}

export default UserReport;