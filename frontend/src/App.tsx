import { useState } from "react";
import LandingPage from "./components/LandingPage";
import UserReport from "./components/UserReport.tsx";

function App() {
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

    if (selectedReportId === null) {
        return <LandingPage onSelectReport={setSelectedReportId} />;
    }

    return (
        <div>
            <p>You selected: {selectedReportId}</p>
            <button onClick={() => setSelectedReportId(null)}>Back to reports</button>
            {selectedReportId === "users" && <UserReport />}
        </div>
    );
}

export default App;