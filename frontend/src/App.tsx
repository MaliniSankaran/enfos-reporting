import { useState } from "react";
import LandingPage from "./components/LandingPage";

function App() {
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

    if (selectedReportId === null) {
        return <LandingPage onSelectReport={setSelectedReportId} />;
    }

    return (
        <div>
            <p>You selected: {selectedReportId}</p>
            <button onClick={() => setSelectedReportId(null)}>Back to reports</button>
        </div>
    );
}

export default App;