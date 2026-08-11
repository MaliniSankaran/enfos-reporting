export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD" | "CANCELLED";

export interface Project {
    projectId: string;
    projectName: string;
    departmentId: string;
    departmentName: string;
    ownerId: string;
    ownerName: string;
    status: ProjectStatus;
    startDate: string;
    endDate: string | null;
}