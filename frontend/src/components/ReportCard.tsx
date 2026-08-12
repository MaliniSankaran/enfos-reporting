import type { Report } from "../types/Report";

interface ReportCardProps {
    report: Report;
    onClick: () => void;
}

function ReportCard({ report, onClick }: ReportCardProps) {
    return (
        <div onClick={onClick} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", cursor: "pointer" }}>
            <h3>{report.name}</h3>
            <p>{report.description}</p>
            <small>Last updated: {new Date(report.lastUpdated).toLocaleDateString(undefined, { timeZone: "UTC" })}</small>
        </div>
    );
}

export default ReportCard;