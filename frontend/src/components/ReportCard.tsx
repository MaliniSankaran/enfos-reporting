import { Card, CardContent, CardActionArea, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FolderIcon from "@mui/icons-material/Folder";
import type { Report } from "../types/Report";

interface ReportCardProps {
    report: Report;
    onClick: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
    users: <PeopleIcon fontSize="large" color="primary" />,
    departments: <ApartmentIcon fontSize="large" color="primary" />,
    projects: <FolderIcon fontSize="large" color="primary" />,
};

function ReportCard({ report, onClick }: ReportCardProps) {
    return (
        <Card
            className="clickable"
            sx={{
                width: 320,
                transition: "transform 0.15s, box-shadow 0.15s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                },
            }}
        >
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Box sx={{ mb: 1 }}>{iconMap[report.id]}</Box>
                    <Typography variant="h6">{report.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {report.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                        Last updated: {new Date(report.lastUpdated).toLocaleDateString(undefined, { timeZone: "UTC" })}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        {report.recordCount} {report.recordCount === 1 ? "record" : "records"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ReportCard;