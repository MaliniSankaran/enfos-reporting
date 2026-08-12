import { useState } from "react";
import LandingPage from "./components/LandingPage";
import UserReport from "./components/UserReport.tsx";
import DepartmentReport from "./components/DepartmentReport.tsx";
import ProjectReport from "./components/ProjectReport.tsx";
import Header from "./components/Header.tsx";
import {Box, Typography} from "@mui/material";

const reportTitles: Record<string, string> = {
    users: "Users",
    departments: "Departments",
    projects: "Projects",
};

function App() {
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

    return (
        <div>
            <Header onGoHome={() => setSelectedReportId(null)} showBackButton={selectedReportId !== null} />
            <Box sx={{ p: 3 }}>
                {selectedReportId === null && <LandingPage onSelectReport={setSelectedReportId} />}
                {selectedReportId !== null && (
                    <Typography variant="h5" className="clickable" sx={{ mb: 2, maxWidth: 1300, mx: "auto" }}>
                        {reportTitles[selectedReportId]}
                    </Typography>
                )}
                {selectedReportId === "users" && <UserReport />}
                {selectedReportId === "departments" && <DepartmentReport />}
                {selectedReportId === "projects" && <ProjectReport />}
            </Box>
        </div>
    );
}

export default App;