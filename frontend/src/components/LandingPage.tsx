import { useEffect, useState } from "react";
import type { Report } from "../types/Report";
import { getReports } from "../services/reportService";
import ReportCard from "./ReportCard";
import {Box, TextField, InputAdornment, Typography, CircularProgress} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <p>Unable to load reports. Please try again later.</p>;
    }

    return (
        <Box sx={{ maxWidth: 1300, mx: "auto" }}>
            <TextField
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 400, mb: 5 }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            {filteredReports.length === 0 ? (
                <Typography color="text.secondary">No reports match your search.</Typography>
            ) : (
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {filteredReports.map((report) => (
                        <ReportCard
                            key={report.id}
                            report={report}
                            onClick={() => onSelectReport(report.id)}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default LandingPage;