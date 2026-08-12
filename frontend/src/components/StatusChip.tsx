import { Chip } from "@mui/material";

type ChipColor = "success" | "default" | "warning" | "info" | "error";

const colorMap: Record<string, ChipColor> = {
    ACTIVE: "success",
    INACTIVE: "default",
    PENDING: "warning",
    COMPLETED: "info",
    ON_HOLD: "warning",
    CANCELLED: "error",
};

interface StatusChipProps {
    value: string;
}

function StatusChip({ value }: StatusChipProps) {
    return <Chip label={value} color={colorMap[value] ?? "default"} size="small" variant="outlined" />;
}

export default StatusChip;