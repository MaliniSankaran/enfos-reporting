import { useState } from "react";
import LandingPage from "./components/LandingPage";
import UserReport from "./components/UserReport.tsx";
import DepartmentReport from "./components/DepartmentReport.tsx";
import ProjectReport from "./components/ProjectReport.tsx";
import Header from "./components/Header.tsx";

function App() {
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

    return (
        <div>
            <Header onGoHome={() => setSelectedReportId(null)} showBackButton={selectedReportId !== null} />
            {selectedReportId === null && <LandingPage onSelectReport={setSelectedReportId} />}
            {selectedReportId === "users" && <UserReport />}
            {selectedReportId === "departments" && <DepartmentReport />}
            {selectedReportId === "projects" && <ProjectReport />}
        </div>
    );
}

export default App;