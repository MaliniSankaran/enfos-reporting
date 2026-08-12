import { useEffect, useState } from "react";
import type { Report } from "../types/Report";
import { getReports } from "../services/reportService";
import ReportCard from "./ReportCard";

interface LandingPageProps {
    onSelectReport: (id: string) => void;
}

function LandingPage({ onSelectReport }: LandingPageProps)  {
    const [reports, setReports] = useState<Report[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getReports()
            .then((data) => setReports(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const filteredReports = reports.filter((report) =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Loading reports...</p>;
    }

    if (error) {
        return <p>Unable to load reports. Please try again later.</p>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                {filteredReports.map((report) => (
                    <ReportCard
                        key={report.id}
                        report={report}
                        onClick={() => onSelectReport(report.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default LandingPage;