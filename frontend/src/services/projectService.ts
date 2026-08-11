import type { Project } from "../types/Project";
import { API_BASE_URL } from "./apiConfig";

export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/reports/projects`);
    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
    }
    return response.json();
}